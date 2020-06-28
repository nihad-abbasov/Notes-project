import React, { useContext, useEffect } from "react";
import "./NoteForm.css";
import { Link, Redirect } from "react-router-dom";
import { GlobalContext } from "../../context/globalState";
import { useState } from "react";
import { v4 } from "uuid";
import { ChromePicker } from "react-color";

const NoteForm = ({ match: { params, path } }) => {
  const { note, getNote, addNote, editNote } = useContext(GlobalContext);
  
  const [formData, setFormData] = useState({
    title: (params.id && note) ? note.title: ""  ,
    text: (params.id && note) ? note.text: "" ,
    color: (params.id && note) ? note.color: "" ,
    id: (params.id && note) ? note.id: null    
  });


  useEffect(() => {
    if (params.id) {
      getNote(params.id);
    }
  }, [params.id]);

  const [redirectDone, setRedirectDone] = useState(false);

  const [errors, setErrors] = useState({});

  const validate = () => {
    let errors = {};
    let valid = true;
    if (formData.title === "") {
      valid = false;
      errors.title = "Title Field is required";
    }
    if (formData.text === "") {
      valid = false;
      errors.text = "Text Field is required";
    }
    if (!valid) {
      setErrors(errors);
    }
    return valid;
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    const valid = validate();
    if (valid) {
      if (params.id && note.id) {
        const updatedNote = {
          ...note,
          title: formData.title,
          text: formData.text,
          color:formData.color
        };
        editNote(params.id, updatedNote);
      } else {
        const newNote = {
          id: v4(),
          title: formData.title,
          text: formData.text,
          completed: false,
          color:formData.color,
          createdDate: new Date()
        };
        addNote(newNote);
      }

      setRedirectDone(true);
    } else {
      console.log("not okay");
    }
  };

  let redirect = null;
  if (redirectDone) {
    redirect = <Redirect to='/' />;
  }

  let title = "Create Note";
  if (params.id) {
    title = "Edit Note";
  }

  return (
    <div className='note-form ' >
      {redirect}
      <div className='header-form'>
        <h2>{title}</h2>
        <Link className='go-back' to='/'>
          {" "}
          Go Back{" "}
        </Link>
      </div>
      <div className='form'>
        <form onSubmit={onSubmitHandler}>
          <label>Title</label>
          <input
            value={formData.title}
            type='text'
            placeholder='Enter a title'
            onChange={e => setFormData({ ...formData, title: e.target.value })}
          />
          {errors.title && <span>{errors.title}</span>}

          <label>Description</label>
          <textarea
            value={formData.text}
            onChange={e => setFormData({ ...formData, text: e.target.value })}
            name='desc'
            placeholder='Enter a Description'
            rows='10'
          />
          {errors.text && <span>{errors.text}</span>}

          <input type='submit' value='Submit' />
        </form>
        <ChromePicker value = {formData.color} color={formData.color} onChange ={updatedColor => setFormData({...formData, color:updatedColor })}  />
      </div>
    </div>
  );
};

export default NoteForm;
