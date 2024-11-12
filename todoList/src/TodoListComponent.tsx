import React, { useEffect, useState } from "react";
import useFetch from "./customHooks/useFetch";

export const TodoListComponent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [priority, setPriority] = useState("Priority");

  function handleSubmit(e: { preventDefault: () => void }) {
    const todoListing = { title, description, time, priority };
    fetch("http://localhost:8000/reminders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todoListing),
    }).then(() => {
      console.log("added");
      console.log(contents);
    });
  }
  const { contents, isLoading, error } = useFetch(
    "http://localhost:8000/reminders"
  );

  function handleDelete(id: any): undefined {
    fetch("http://localhost:8000/reminders/" + id, {
      method: "DELETE",
    }).then(() => {
      console.log(id);
      console.log("http://localhost:8000/reminders/${id}");
    });
  }
  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <label>Title:</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Description:</label>
          <input
            type="text"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label>Time:</label>
          <input
            type="text"
            required
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <label>Priority:</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Very Important!">Very Important!</option>
            <option value="Important!">Important!</option>
            <option value="Get it done">Get it done</option>
            <option value="Find time for it">Find time for it</option>
            <option value="Ehh whenever">Ehh whenever</option>
          </select>
          <button>Add To List</button>
        </form>
        {/*Using && like a if the left side must be true or it wont run the right*/}
        {error && (
          <div className="container-md">
            <p className="text-center">{error}</p>
          </div>
        )}
        {isLoading && (
          <div className="container-md">
            <p>Loading...</p>
          </div>
        )}
        {contents &&
          contents.map(
            (content: {
              priority: String;
              description: String;
              time: String;
              id: React.Key;
              title: String;
            }) => (
              <div key={content.id}>
                <h3>{content.title}</h3>
                <p>{content.description}</p>
                <p>{content.time}</p>
                <p>{content.priority}</p>
                <button onClick={() => handleDelete(content.id)}>Done</button>
              </div>
            )
          )}
      </div>
    </>
  );
};
export default TodoListComponent;
