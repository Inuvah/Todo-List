import React, { useEffect } from "react";

export const FilterContent = (props: {
  search;
  priority;
  contents;
  setFilteredContents;
}) => {
  const search = props.search;
  const priority = props.priority;
  useEffect(() => {
    const filtered = props.contents.filter(
      (content) =>
        content.title.toLowerCase().includes(search.toLowerCase()) ||
        content.priority.includes(priority)
    );
    props.setFilteredContents(filtered);
    console.log(filtered);
  }, [search]);
  return <div></div>;
};
export default FilterContent;
