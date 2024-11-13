import React, { useEffect, useState } from "react";
import useFetch from "./customHooks/useFetch";

interface PriorityOptionProps {
  priority: string;
  onPriorityChange: (newPriority: string) => void;
}

export const TodoListComponent: React.FC<PriorityOptionProps> = ({
  onPriorityChange,
}) => {
  //UseStates to change POST content to reminderdb.json
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [priority, setPriority] = useState("Priority");
  //Handles POST of content to JSON
  function handleSubmit(e: { preventDefault: () => void }) {
    const todoListing = { title, description, time, priority };
    fetch("http://localhost:8000/reminders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todoListing),
    });
  }
  //CustomHook for fetching and loading data from JSON
  const { contents, isLoading, error } = useFetch(
    "http://localhost:8000/reminders"
  );
  //Handle DELETE when done
  function handleDelete(id: any): undefined {
    fetch("http://localhost:8000/reminders/" + id, {
      method: "DELETE",
    });
  }

  const [selectedPriority, setSelectedPriority] = useState<string>(
    priority || "Low"
  );

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPriority = e.target.value;
    setSelectedPriority(newPriority);
    setPriority(e.target.value);
  };
  return (
    <>
      {/*Input forms*/}
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
          <div className="priority-option">
            <label>Priority: </label>
            <select value={selectedPriority} onChange={handleChange}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

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
        {/*Maps the JSON "like a foreach loop"*/}
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
