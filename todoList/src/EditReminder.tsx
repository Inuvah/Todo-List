import React, { useState } from "react";
import useFetchSpecific from "./customHooks/useFetchSpecific";

export const EditReminder = (props: {
  handleEdit: any;
  handleSubmit: any;
  setTitle: any;
  setDescription: any;
  setTime: any;
  selectedPriority: any;
  handleChange: any;
  editVisible: any;
  priority: any;
  editId: any;
  handleDelete: any;
  contentsEdit: any;
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [priority, setPriority] = useState("Priority");
  const [editFetch, setEditFetch] = useState(false);
  const todoListing = { title, description, time, priority };
  //Needs to get ID from function but also needs to be outside function scope
  //CustomHook for fetching and loading data from JSON
  function handleEditChange(id: any) {
    alert("handle change");
    if (editFetch === false) setEditFetch(true);
    else setEditFetch(false);
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todoListing),
    };
    fetch("http://localhost:8000/reminders/" + id, requestOptions)
      .then((response) => response.json())
      .then((data) => props.setTitle({ data }))
      .then((data) => console.log(data));
  }
  return (
    <>
      <div className={props.editVisible}>
        <div className="editContent">
          <form onSubmit={() => handleEditChange(props.editId)}>
            {props.contentsEdit &&
              props.contentsEdit.map(
                (content: {
                  title: string | number | readonly string[] | undefined;
                  priority: any;
                  time: any;
                  description: any;
                  id: React.Key;
                }) => (
                  <div key={content.id}>
                    <label>Title:</label>
                    <input
                      type="text"
                      required
                      value={content.title}
                      onChange={(e) => props.setTitle(e.target.value)}
                    />
                    <label>Description:</label>
                    <input
                      type="text"
                      required
                      value={content.description}
                      onChange={(e) => props.setDescription(e.target.value)}
                    />
                    <label>Time:</label>
                    <input
                      type="text"
                      required
                      value={content.time}
                      onChange={(e) => props.setTime(e.target.value)}
                    />
                    <div className="priority-option">
                      <label>Priority: </label>
                      <select
                        value={props.selectedPriority}
                        onChange={props.handleChange}
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    </div>
                  </div>
                )
              )}
            <button>Add To List</button>
          </form>
        </div>
      </div>
    </>
  );
};
export default EditReminder;
