import React from "react";
import "./App.css";
import TodoListComponent from "./TodoListComponent";
import logo from "./assets/logo.png";

function App() {
  return (
    <>
      <div>
        <img src={logo} alt="" className="Logo" />
      </div>
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
