import "./App.css";
import TodoListComponent from "./TodoListComponent";
import PriorityOption from './PriorityOption';

function App() {
  return (
<>
<div>
<img src="todoList\src\assets\DoItLogo.png" />
</div>

    <div className="todo-wrapper">
      <div className="todo-input">
        <div className="todo-input-item">
    <>
      <TodoListComponent />
      <PriorityOption></PriorityOption>
    </>
    </div>
    </div>
</div>
</>
  );
}



export default App;


/* New components bliver imported here */ 