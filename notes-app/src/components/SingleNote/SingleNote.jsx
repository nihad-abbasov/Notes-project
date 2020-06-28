import React, { useContext } from "react";
import "./SingleNote.css";
import { Link, Redirect } from "react-router-dom";
import { GlobalContext } from "../../context/globalState";
import { useEffect } from "react";

const SingleNote = props => {
  const { note, loading, getNote, removeNote,editNote } = useContext(GlobalContext);

  useEffect(() => {
    getNote(props.match.params.id);
  }, [props.match.params.id]);

  return (
    <div className='container my-2'>
      {loading ? (
        <h1>Loading... </h1>
      ) : (
        <div className='single-note-page'>
          <div className='note-details' style ={note.color ? {backgroundColor: note.color.hex} : null }>
            <h2 className='title'>{note.title}</h2>

            <div className='content'>
              <p className='date'> {note.createdDate} </p>
              <p className='desc'>{note.text}</p>
            </div>
          </div>
          <div className='actions'>
            <Link className='nav-link' to={"/edit/" + note.id}>
              Edit
            </Link>
            <Link
              onClick={() => removeNote(note.id)}
              to='/'
              className='nav-link'
            >
              Delete
            </Link>
            <button onClick={() => editNote(note.id,{...note,completed: !note.completed }) } className='nav-link'>{note.completed ? "Unarchive" : "Archive" }</button>
            <Link className='nav-link' to='/'>
              Go Back
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleNote;
