import React from "react";
import useFetch from "./customHooks/useFetch";

export const TodoList = () => {
  const { contents, isLoading, error } = useFetch(
    "http://localhost:8000/reminders"
  );
  return (
    <div>
      {contents &&
        contents.map(
          (content: {
            id: React.Key;
            title: String;
            time: String;
            desription: String;
            priority: Number;
          }) => (
            <div key={content.id}>
              <ul>
                <li>{content.title}</li>
              </ul>
            </div>
          )
        )}
    </div>
  );
};
export default TodoList;
