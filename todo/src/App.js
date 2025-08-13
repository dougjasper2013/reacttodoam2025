import React, { useState, useEffect } from "react";
import "./App.css";
import TodoBanner from "./TodoBanner";
import TodoCreator from "./TodoCreator";
import TodoRow from "./TodoRow";
import VisibilityControl from "./VisibilityControl";

function App() {
  const [userName] = useState("Doug");

  const [todoItems, setTodoItems] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved
      ? JSON.parse(saved)
      : [
          { action: "Buy Flowers", done: false },
          { action: "Get Shoes", done: false },
          { action: "Collect Tickets", done: true },
          { action: "Call Joe", done: false },
        ];
  });

  const [showCompleted, setShowCompleted] = useState(true);

  // Persist to localStorage whenever todoItems change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoItems));
  }, [todoItems]);

  const createNewTodo = (task) => {
    if (!todoItems.find((item) => item.action === task)) {
      setTodoItems([...todoItems, { action: task, done: false }]);
    }
  };

  const toggleTodo = (todo) => {
    setTodoItems(
      todoItems.map((item) =>
        item.action === todo.action ? { ...item, done: !item.done } : item
      )
    );
  };

  const deleteTodo = (todo) => {
    setTodoItems(todoItems.filter((item) => item.action !== todo.action));
  };

  const editTodo = (todo, newAction) => {
    setTodoItems(
      todoItems.map((item) =>
        item.action === todo.action ? { ...item, action: newAction } : item
      )
    );
  };

  const clearCompleted = () => {
    setTodoItems(todoItems.filter((item) => !item.done));
  };

  const todoTableRows = (doneValue) =>
    todoItems
      .filter((item) => item.done === doneValue)
      .map((item, index) => (
        <TodoRow
          key={index}
          item={item}
          toggle={toggleTodo}
          deleteCallback={deleteTodo}
          editCallback={editTodo}
        />
      ));

  return (
    <div className="container mt-3">
      <TodoBanner userName={userName} todoItems={todoItems} />

      <div className="m-3">
        <TodoCreator callback={createNewTodo} />
      </div>

      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Description</th>
            <th>Done</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{todoTableRows(false)}</tbody>
      </table>

      <div className="bg-secondary text-white text-center p-2">
        <VisibilityControl
          description="Completed Tasks"
          isChecked={showCompleted}
          callback={(checked) => setShowCompleted(checked)}
        />
      </div>

      {showCompleted && (
        <table className="table table-striped table-bordered mt-2">
          <thead className="table-dark">
            <tr>
              <th>Description</th>
              <th>Done</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{todoTableRows(true)}</tbody>
        </table>
      )}

      <div className="text-center mt-3">
        <button className="btn btn-danger" onClick={clearCompleted}>
          Clear Completed
        </button>
      </div>
    </div>
  );
}

export default App;
