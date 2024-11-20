import React from "react";
import "./App.css";
import TodoListComponent from "./TodoListComponent";
import logo from "./assets/logo.png";
import Search from "./search";

function App() {
  return (
    <>
      <div>
        <img src={logo} alt="" class="Logo" />
      </div>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
          <div className="searchbar"><Search></Search></div>
            <TodoListComponent />
            {/* New components bliver imported here */}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
