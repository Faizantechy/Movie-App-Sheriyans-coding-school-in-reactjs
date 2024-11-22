import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from '../utils/axios';


function SearchBar() {
    const [searchVal, setSearchVal] = useState();
    
    const [searches,setSearches]=useState([])

    const getSearches = async () => {


        const { data } = await axios.get(`/search/multi?query=${searchVal}`)
        setSearches(data.results)
        
    }
    

    useEffect(() => {

getSearches()

     }
        
        , [searchVal])
  
    
   
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
        />

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
              <div className="suggestions bg-white text-black w-[56%] max-h-[50vh] top-[100px] flex justify-start overflow-hidden flex-col gap-2 overflow-y-auto">
                  
                        <Link className=" w-full bg-white inline-block p-8 hover:bg-slate-300  ">
                        
                            

                            {searches.map((item) => {
                                
                                return    <div className="flex justify-between flex-row-reverse">
                                    
                                    <span className="order-1">{ item.name}</span><img src={item.poster_path ? `https://image.tmdb.org/t/p/w200${item.poster_path}:` : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNNLEL-qmmLeFR1nxJuepFOgPYfnwHR56vcw&s'} alt="" className="w-[100px] h-[100px] rounded-lg" />
            
                               </div> 
                            })}
                            
                           
                      </Link>

        
        </div>
      ) : null}
    </div>
  );
}

export default SearchBar;
