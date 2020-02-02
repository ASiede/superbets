import React from 'react';
import logo from './logo.svg';
import {Provider} from 'react-redux';
import store from './store';
import './App.css';
import Thing from './components/thing';
import { Nav } from './components/Nav/Nav';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <Nav />
        </header>
        <Thing />
      </div>
    </Provider>
  );
}

export default App;
