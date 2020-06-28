import React from "react";
import "./NoteItem.css";
import { Link } from "react-router-dom";
const NoteItem = ({note}) => {
  
  return (
    
      <div className='custom-box'  style ={note.color ? {backgroundColor: note.color.hex} : null }>
        <h2 className="title">{note.title}</h2>

        <div className='content'>
          <p className='date'>{note.createdDate} </p>
          <p className='desc'>
           {note.text}
          </p>
          <Link className="viewMoreBtn" to={"/notes/"+note.id}>View More</Link>
        </div>
      </div>
  );
};

export default NoteItem;
