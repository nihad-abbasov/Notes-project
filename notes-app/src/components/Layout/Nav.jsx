import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = props => {
  return (
    <header>
      <div className='container'>
        <nav>
          <h2>NotesApp</h2>
          <ul className='nav-list'>
            <li className='nav-item'>
              <Link className='nav-link' to='/'>
                Actual
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/archive'>
                Archive
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/create'>
                Create
              </Link>
            </li>

            
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Nav;
