import React from 'react';
import './App.css';
import List from './Components/List/Chatlist';
import Chat from './Components/Chat/Chat';
import Details from './Components/Details/Details';

function App() {
  return (
    <div className="container flex">
       <List/>
       <Chat/>
       <Details />
    </div>
  );
}

export default App;
