import React, { useEffect, useState } from "react";
//Set data location as parameter so it can be reused
export const useFetchSpecific = (
  url: RequestInfo | URL,
  state,
  title,
  description,
  time,
  priority,
  id
) => {
  //content from Json will be set to contents is null until
  const [contentsSpecific, setContentsSpecific] = useState([]);
  //For checking if Json has been fetched if not display loading
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  //Only runs on page load
  useEffect(() => {
    //Fake load times so it can be seen
    console.log("useSpecific has run");
    setTimeout(() => {
      const todoListing = { title, description, time, priority };
      //Fetching the json
      fetch(url)
        //Making the file readable as a Json
        .then((res) => {
          //Checks if the response from the server is the data we want
          //If not ok means the server could not send what we requested
          if (!res.ok) {
            throw Error("Could not fetch the data ):");
          }
          return res.json();
        })
        //Pulling the Json data
        .then((data) => {
          setContentsSpecific(data);
          //Once pulled loading is done
          setIsLoading(false);
          console.log("data loaded", data);
        })
        //Catch will trigger if there are any network issues and data cant be fetched
        .catch((err) => {
          setIsLoading(false);
          setError(err.message);
          console.log("data NOT loaded", url);
        });
    });
    //[] empty dependency array making sure it only runs on page load
  }, [state]);
  //Return all data and values needed or nothing else can access it
  return { contentsSpecific, isLoading, error };
};
export default useFetchSpecific;
