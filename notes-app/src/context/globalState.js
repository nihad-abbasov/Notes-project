import React, { createContext, useReducer } from "react";
import Reducer from "./reducer";
import Axios from "axios";

const domain = "http://localhost:3000";

const initialState = {
  notes: [],
  loading: true,
  note: {}
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  async function removeNote(id) {
    try {
      await Axios.delete(`${domain}/notes/${id}`);
      dispatch({
        type: "REMOVE_NOTE",
        payload: id
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function addNote(note) {
    console.log(note)
    try {
      const res = await Axios.post(`${domain}/notes/`, note);
      dispatch({
        type: "ADD_NOTE",
        payload: res.data
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function editNote(id, note) {
    try {
      const res = await Axios.put(`${domain}/notes/${id}`, note);
      dispatch({
        type: "EDIT_NOTE",
        payload: res.data
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function getNote(id) {
    try {
      const res = await Axios.get(`${domain}/notes/${id}`);

      dispatch({
        type: "GET_NOTE",
        payload: res.data
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function getNotes(path) {
    let query = "false";
    if (path === "/archive") {
      query = "true";
    }

    try {
      const res = await Axios.get(`${domain}/notes?completed=${query}`);
      dispatch({
        type: "GET_NOTES",
        payload: res.data
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        notes: state.notes,
        note: state.note,
        loading: state.loading,
        getNote,
        getNotes,
        removeNote,
        addNote,
        editNote
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
