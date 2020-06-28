import React from "react";
import "./Notes.css";
import NoteItem from "./NoteItem/NoteItem";
import { useContext } from "react";
import { GlobalContext } from "../../context/globalState";
import { useEffect } from "react";

const Notes = props => {
  const { notes, loading, getNotes } = useContext(GlobalContext);

  useEffect(() => {
    getNotes(props.match.path);
  }, [props.match.path]);

  let title = null
  if(notes.length <= 0  ){
    if(props.match.path === "/"){
      
      title = <h1>There is no note in Actual Notes </h1>
    }else{
      
      title = <h1>There is no note in Archived Notes </h1>
    }
  }

  return (
    <div className='container my-2'>
      <div className='notes-list'>
        {!loading && title}
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          notes.map(note => <NoteItem key={note.id} note={note} />)
        )}
      </div>
    </div>
  );
};
export default Notes;
