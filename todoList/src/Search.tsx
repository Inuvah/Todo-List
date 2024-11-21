import React, { useState } from "react";
import "./index.css";
//Sebilas component
const Search = (props: {
  //pass in props from todolistcomponent
  search;
  setSearch;
  setSearchActive;
  searchActive;
}) => {
  return (
    <>
      <form>
        <input
          value={props.search}
          onFocus={() => {
            props.setSearch("");
            props.setSearchActive("searchFocusOut");
          }}
          onBlur={() => {
            if (props.search === "") props.setSearch("Search...");
            if (props.search === "") props.setSearchActive("searchFocus");
          }}
          //Updates the search state to the searchbars input value
          //which is updated when searching
          onChange={(e) => {
            props.setSearch(e.target.value);
          }}
        />
      </form>
    </>
  );
};

export default Search;
