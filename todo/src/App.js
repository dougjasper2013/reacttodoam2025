// import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import TodoBanner from './TodoBanner';
import TodoRow from './TodoRow';

function App() {
  const [userName] = useState("Doug");

  const [todoItems] = useState([
    { action: "Buy Flowers", done: false },
    { action: "Get Shoes", done: false },
    { action: "Collect Tickets", done: true },
    { action: "Call Joe", done: false }
  ]);

  //const changeStateData = () => {
  //  setUserName(prevName => (prevName === "Doug" ? "Bob" : "Doug"));
  //};

  return (
    <div className="container mt-3">
      <TodoBanner userName={userName} todoItems={todoItems} />

      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Action</th>
            <th>Done</th>
          </tr>
        </thead>
        <tbody>
          {todoItems.map((item, index) => (            
            <TodoRow item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
