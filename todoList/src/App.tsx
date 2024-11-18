import React from "react";
import "./App.css";
import TodoListComponent from "./TodoListComponent";


function App() {
  return (
    <>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <TodoListComponent />
            {/* New components bliver imported here */}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
