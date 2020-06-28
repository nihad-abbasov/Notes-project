import React, { Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Nav from "./components/Layout/Nav";
import Notes from "./components/NoteList/Notes";
import SingleNote from "./components/SingleNote/SingleNote";
import NoteForm from "./components/NoteForm/NoteForm";
import { GlobalProvider } from "./context/globalState";
function App() {
  return (
    <GlobalProvider>
     
        <Nav />

        <Switch>
          <Route exact path='/' component={Notes} />
          <Route exact path='/notes/:id' component={SingleNote} />
          <Route exact path='/create' component={NoteForm} />
          <Route exact path='/edit/:id' component={NoteForm} />
          <Route exact path ="/archive" component = {Notes} />  
        </Switch>
    </GlobalProvider>
  );
}

export default App;
