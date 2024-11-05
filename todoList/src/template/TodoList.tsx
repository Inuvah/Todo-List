import React from "react";

export const TodoList = (props: { targets: any; handleDone: any }) => {
  const targets = props.targets;
  return (
    <div>
      {targets.map((target: { id: React.Key; title: string }) => (
        <div key={target.id}>
          <p>{target.title}</p>
          <button onClick={() => props.handleDone(target.id)}>Done</button>
        </div>
      ))}
    </div>
  );
};
export default TodoList;
