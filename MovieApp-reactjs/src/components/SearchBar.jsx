import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../utils/axios";

function SearchBar({Data}) {
  const [searchVal, setSearchVal] = useState("");

  const [searches, setSearches] = useState([]);

  const getSearches = async () => {
    try {
      const response = await axios.get(`/search/multi?query=${searchVal}`);
      const apiResults = response.data.results || [];

      const combinedData = [...Data, ...apiResults];

      setSearches(combinedData);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearches([...Data]); 
    }
  };

  useEffect(() => {

  
if(searchVal && searchVal.trim()!==''){

  getSearches()
} else {
  
  setSearches([])
}
    ;
  }, [searchVal]);

  return (
    <div className="flex justify-center mt-4 flex-col  w-full items-center">
      <div
        className="search-row w-[60%] max-h-[50%] rounded-md bg-transparent relative flex justify-center items-center
          "
      >
        <i className="ri-search-line px-2 h-full  flex justify-center items-center text-xl "></i>

        <input
          type="text"
          className="px-4 py-[10px] w-full bg-transparent text-white text-xl outline-none border-none"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
       placeholder="Search Movies...." />

        {searchVal !== "" ? (
          <i
            onClick={() => setSearchVal("")}
            className="cursor-pointer text-xl"
          >
            X
          </i>
        ) : null}
      </div>

      {searchVal !== "" ? (
        <div className="suggestions bg-white text-black lg:w-[56%] w-[80%] max-h-[50vh] lg:top-[70px]  top-[130px] flex justify-start overflow-hidden flex-col lg:gap-2 gap-5 overflow-y-auto absolute z-[2000] ">
            {searches.map((item) => {
              return (
            
                <Link className=" w-full inline-block p-8 hover:bg-slate-300 mt-5" to={`/${item.media_type || title}/details/${item.id} `}>

                <div className="flex justify-between flex-row-reverse justify-center items-center">
                  <span className="order-1 font-semibold text-xl ">{item.name? item.name:'Title Not Found! '}</span>
                  <img
                    src={
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/w200${item.poster_path? item.poster_path: item.profile_path}:`
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNNLEL-qmmLeFR1nxJuepFOgPYfnwHR56vcw&s"
                    }
                    alt=""
                    className="w-[20vh] h-[20vh] rounded-lg mt-4 shadow-2xl"
                  />
                  </div>
                  </Link>

              );
            })}
        </div>
      ) : null}
    </div>
  );
}

export default SearchBar;
