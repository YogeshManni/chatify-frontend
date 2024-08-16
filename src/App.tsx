import React from 'react';
import './App.css';
import List from './Components/List/Chatlist';
import Chat from './Components/Chat/Chat';

function App() {
  return (
    <div className="container flex">
       <List/>
       <Chat/>
       <h1> Details</h1>
    </div>
  );
}

export default App;
