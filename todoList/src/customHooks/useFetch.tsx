import React, { useEffect, useState } from "react";
//Set data location as parameter so it can be reused
export const useFetch = (url: RequestInfo | URL) => {
  //content from Json will be set to contents is null until
  const [contents, setContents] = useState(null);
  //For checking if Json has been fetched if not display loading
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  //Only runs on page load
  useEffect(() => {
    //Fake load times so it can be seen
    setTimeout(() => {
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
          setContents(data);
          //Once pulled loading is done
          setIsLoading(false);
        })
        //Catch will trigger if there are any network issues and data cant be fetched
        .catch((err) => {
          setIsLoading(false);
          setError(err.message);
        });
    });
    //[] empty dependency array making sure it only runs on page load
  });
  //Return all data and values needed or nothing else can access it
  return { contents, isLoading, error };
};
export default useFetch;
