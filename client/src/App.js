// import React from 'react';
import './App.css';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import NavBar from './NavBar';
import Banner from './Banner';
import HomePage from './HomePage';
import Login from './Login';
import MySongs from './MySongs';

function App() {
  
  return (
    <>
      <NavBar />
      <Banner />
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/mysongs">
            <MySongs />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
