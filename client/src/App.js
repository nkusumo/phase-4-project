// import React from 'react';
import { useState } from 'react'
import './App.css';
import {Switch, Route} from 'react-router-dom';
import NavBar from './NavBar';
import Banner from './Banner';
import HomePage from './HomePage';
import Login from './Login';
import MySongs from './MySongs';

function App() {
  const [user, setUser] = useState(null);
  
  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <Banner />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/login">
            <Login onLogin={setUser} />
          </Route>
          <Route exact path="/mysongs">
            <MySongs user={user} />
          </Route>
        </Switch>
      
    </>
  );
}

export default App;
