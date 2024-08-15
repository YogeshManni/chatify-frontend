import React from 'react';
import './App.css';
import List from './Components/List/Chatlist';

function App() {
  return (
    <div className="container flex">
       <List/>
       <h1> Chat</h1>
       <h1> Details</h1>
    </div>
  );
}

export default App;
