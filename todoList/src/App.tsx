import "./App.css";
import TodoListComponent from "./TodoListComponent";
import PriorityOption from "./PriorityOption";
import UserAuth from "./userAuth";

function App() {
  return (
    <>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <TodoListComponent />
            <PriorityOption />
            {/* New components bliver imported here */}
          </div>
        </div>
      </div>
      <UserAuth />
    </>
  );
}

export default App;
