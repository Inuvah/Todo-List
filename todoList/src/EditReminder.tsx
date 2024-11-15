import React from "react";

export const EditReminder = (props: {
  handleEdit: any;
  handleSubmit: any;
  setTitle: any;
  setDescription: any;
  setTime: any;
  selectedPriority: any;
  handleChange: any;
  editVisible: any;
}) => {
  return (
    <>
      <div className={props.editVisible}>
        <div className="editContent">
          <form onSubmit={props.handleSubmit}>
            <label>Title:</label>
            <input
              type="text"
              required
              value={"title"}
              onChange={(e) => props.setTitle(e.target.value)}
            />
            <label>Description:</label>
            <input
              type="text"
              required
              value={"description"}
              onChange={(e) => props.setDescription(e.target.value)}
            />
            <label>Time:</label>
            <input
              type="text"
              required
              value={"time"}
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

            <button>Add To List</button>
          </form>
        </div>
      </div>
    </>
  );
};
export default EditReminder;
