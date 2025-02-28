// import React from 'react';
import { useState, useEffect } from 'react'
import './App.css';
import {Switch, Route} from 'react-router-dom';
import NavBar from './NavBar';
import Banner from './Banner';
import HomePage from './HomePage';
import Login from './Login';
import MySongs from './MySongs';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("./current_user")
    .then(resp => resp.json())
    .then(data => setUser(data))
  },[])
  
  console.log(user)
  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <Banner />
        <Switch>
          <Route exact path="/">
            <HomePage user={user} />
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
