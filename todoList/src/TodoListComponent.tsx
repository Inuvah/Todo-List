import React, { useEffect, useState } from "react";
import useFetch from "./customHooks/useFetch";
import useFetchSpecific from "./customHooks/useFetchSpecific";
import Search from "./search";
import closeIcon from "./assets/close.svg";
import checkMark from "./assets/completed.svg";
import FilterContent from "./template/FilterContent";
//Oliver handled the fetching(GET,POST,PUT)(displaying data || changing data)
//Sebila handled Searching && priorities for tasks && filtering.
//anything else is a mix we have both been pretty involved in each others responsibilities. Many things are connected.
//interface from PriorityOptions.tsx, interface defines properties for typescript.
interface PriorityOptionProps {
  priority: string;
}
export const TodoListComponent: React.FC<PriorityOptionProps> = () => {
  const urlJson = "http://localhost:8000/reminders";
  //UseStates to change POST content to reminderdb.json
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [priority, setPriority] = useState("Low");
  const [priorityFilter, setPriorityFilter] = useState("Filter");
  const [editVisible, setEditVisible] = useState("editWrapper");
  const [searchActive, setSearchActive] = useState("searchFocus");
  const [editId, setEditId] = useState();
  const [filteredContents, setFilteredContents] = useState();
  const [search, setSearch] = useState("");
  const [selectedPriority, setSelectedPriority] = useState<string>(
    priority || "Low"
  );
  const [selectedPriorityFilter, setSelectedPriorityFilter] = useState<string>(
    priority || "low"
  );
  //Handles POST of content to JSON
  function handleSubmit(e: { preventDefault: () => void }) {
    //Takes the useStates and makes sure they are converted to strings
    //Then POST to reminderdb.json
    const todoListing = { title, description, time, priority };
    fetch(urlJson, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todoListing),
    });
  }
  //CustomHook for fetching and loading data from JSON
  const { contents, isLoading, error } = useFetch(urlJson);
  //Same as previus hook but with a dependencies so it only runs when needed
  const { contentsSpecific } = useFetchSpecific(
    urlJson,
    editVisible,
    title,
    description,
    time,
    priority,
    editId
  );
  /*
  does not work. Same as whats right under
  <FilterContent
    search={search}
    priority={priority}
    contents={contents}
    setFilteredContents={setFilteredContents}
  />;
  */
  //Function for searching and categories(priorities)
  function FilterContent(search, priority) {
    //Filter first to get all objects in the array
    const filtered = contents.filter(
      (content) =>
        //check if any titles match the search set to lowercase too stop it from being pedantic
        content.title.toLowerCase().includes(search.toLowerCase()) ||
        //and it checks if priority is set and if any todos matches the priority
        content.priority.includes(priority)
    );
    //set the new filtered content to a new state so old one isnt overwritten
    setFilteredContents(filtered);
  }
  //run the function everytime the searchbar is interacted with
  //set the priority to simply set the value of the search input so it also runs
  useEffect(() => {
    FilterContent(search, priority);
  }, [search]);

  //Handle DELETE when done graps id and targets specific objects in the array
  function handleDelete(id: any): undefined {
    fetch(urlJson + "/" + id, {
      method: "DELETE",
    });
  }
  //Is for changing the edit window to display:none && block
  function handleEdit(id) {
    setEditId(id);
    if (editVisible !== "editShow") {
      setEditVisible("editShow");
    } else setEditVisible("editWrapper");
  }
  //Handles submitting changes after editing
  function handleEditSubmit(e: { preventDefault: () => void }) {
    //again use useStates to grap the data
    const todoListing = { title, description, time, priority };
    //targets object that was edited
    fetch(urlJson + "/" + editId, {
      //use PUT to change the objects without making a new one
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todoListing),
    })
      //response from Json-server
      .then((response) => {
        return response.json();
      })
      //catch in case of any errors it will log it
      .catch(() => {
        console.log("Edit submit error");
      });
  }
  //handles changing the priority input
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //graps the new priority from the input
    const newPriority = e.target.value;
    //updates the useState that is displayed
    setSelectedPriority(newPriority);
    //the useState that sends the data
    setPriority(e.target.value);
  };
  //same as previus but for the searching
  const handleChangeFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPriority = e.target.value;
    //needs new useState for display so it doesn't changed both
    setSelectedPriorityFilter(newPriority);
    setSearch(newPriority);
    setPriority(e.target.value);
  };
  return (
    <>
      {/*Input forms*/}
      <div className="app-body">
        <div className="form-body">
          {/*When the button in the form is pressed onSubmit runs the function*/}
          <form className="input-form-create" onSubmit={handleSubmit}>
            <div className="form-wrapper">
              <label className="test-class">Title:</label>
              <div className="title">
                <input
                  type="text"
                  required
                  value={title}
                  //When it detects any change in the input updates useStates for data
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <label>Description:</label>
              <div className="description">
                <input
                  type="text"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <label>Time:</label>
              <div className="time">
                <input
                  type="datetime-local"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
              <div className="priority-option">
                <label>Priority: </label>
                <select value={selectedPriority} onChange={handleChange}>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <button>Add To List</button>
            </div>
          </form>
        </div>
        <div className="searchbar">
          {/*Imported component and props needed from this file.
          Search is responsible for the searchbar*/}
          <Search
            search={search}
            setSearch={setSearch}
            setSearchActive={setSearchActive}
            searchActive={searchActive}
          ></Search>
          {/*Priority input for the searchbar*/}
          <div className="priority-option">
            <label>Priority: </label>
            <select
              value={selectedPriorityFilter}
              onChange={handleChangeFilter}
              //Whenever its is interacted with remove all content from page
              //allowing only search results to appear
              onFocus={() => {
                setSearch("");
                setSearchActive("searchFocusOut");
              }}
              //When interaction ends set search text back in searchbar to clarify what it does.
              //then display all content again if searchbar is empty
              onBlur={() => {
                if (search === "") setSearch("Search...");
                if (search === "") setSearchActive("searchFocus");
                setPriority("low");
              }}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>
        {/*Using && like a if the left side must be true or it wont run the right*/}
        {/*Will display a error if the initial fetch of all content fails*/}
        {error && (
          <div className="container-md">
            <p className="text-center">{error}</p>
          </div>
        )}
        {/*If theres a delay before data is displayed it will display that it is loading*/}
        {isLoading && (
          <div className="container-md">
            <p>Loading...</p>
          </div>
        )}
        {/*Maps the JSON like a foreach loop going through each object in the array*/}
        {filteredContents &&
          filteredContents.map(
            (content: {
              priority: String;
              description: String;
              time: String;
              id: React.Key;
              title: String;
            }) => (
              //Creates HTML elements for each object so it can be displayed
              <div key={content.id}>
                <div className="fetched-content-container">
                  <div className="fetched-content">
                    <h3 className="f-c">{content.title}</h3>
                    <p className="f-c">{content.description}</p>
                    <p className="f-c">{content.time}</p>
                    <p className="f-c">{content.priority}</p>
                  </div>
                  <div className="fetched-content-button">
                    <div>
                      {/*Button for deleting when you have finished the task*/}
                      <button
                        className="button-complete"
                        onClick={() => handleDelete(content.id)}
                      >
                        <img src={checkMark} alt="" />
                      </button>
                      {/*Edit object button*/}
                      <button onClick={() => handleEdit(content.id)}>
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        {/*Creates all content for display && is hidden when searching*/}
        {contents &&
          contents.map(
            (content: {
              priority: String;
              description: String;
              time: String;
              id: React.Key;
              title: String;
            }) => (
              //Sets class to a useState that will change between display:none&&hidden
              <div className={searchActive} key={content.id}>
                <div className="fetched-content-container">
                  <div className="fetched-content">
                    <h3 className="f-c">{content.title}</h3>
                    <p className="f-c">{content.description}</p>
                    <p className="f-c">{content.time}</p>
                    <p className="f-c">{content.priority}</p>
                  </div>
                  <div className="fetched-content-button">
                    <div>
                      <button
                        className="button-complete"
                        onClick={() => handleDelete(content.id)}
                      >
                        <img src={checkMark} alt="" />
                      </button>
                      <button onClick={() => handleEdit(content.id)}>
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
      </div>
      <div className={editVisible}>
        {
          <div className="button-edit-close">
            <button onClick={() => handleEdit(editId)}>
              <img src={closeIcon} />
            </button>
          </div>
        }
        {/*Almost as previus .map's but has forms like when a task is initialy made
         */}
        {contentsSpecific &&
          contentsSpecific.map(
            (content: {
              priority: String;
              description: any;
              time: any;
              id: React.Key;
              title: any;
            }) => (
              <div className="form-edit-body" key={content.id}>
                <form
                  onSubmit={(e) => {
                    //Is supposed to prevent non changed data from being set too "" nothing
                    if (title !== content.title) setTitle(content.title);
                    handleEditSubmit(e);
                  }}
                >
                  <input
                    type="text"
                    value={content.title}
                    onChange={(e) => {
                      content.title = e.target.value;
                      setTitle(e.target.value);
                    }}
                  />
                  <input
                    type="text"
                    value={content.description}
                    onChange={(e) => {
                      content.description = e.target.value;
                      setDescription(e.target.value);
                    }}
                  />
                  <input
                    type="datetime-local"
                    value={content.time}
                    onChange={(e) => {
                      content.time = e.target.value;
                      setTime(e.target.value);
                    }}
                  />
                  <div className="priority-option">
                    <label>Priority: </label>
                    <select value={selectedPriority} onChange={handleChange}>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                  <button>Save</button>
                </form>
              </div>
            )
          )}
      </div>
    </>
  );
};
export default TodoListComponent;
