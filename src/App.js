import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PetsDisplayContainer from './PetsDisplayContainer';

class App extends Component {

   componentDidMount() {

   }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to PetStore App4</h1>
        </header>

        <PetsDisplayContainer />


      </div>
    );
  }
}

export default App;
