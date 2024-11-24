import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import DropDownComp from "../components/DropDownComp";
import Cards from "../components/Cards";
import axios from "../utils/axios";

const Trending = () => {
    const navigate = useNavigate();
    
  
  



  const [trendingMovies, setTrendingMovies] = useState([]);
  const [selectVal, setSelectVal] = useState("tv");
  const [timeFrame, setTimeFrame] = useState("week");  // Adding timeFrame state for dropdown

    const TrendingMoviesCall = async () => {
      
        let endPoint = ''
        
        if (selectVal === 'hour') {
            
            endPoint =`/discover/${selectVal}/${timeFrame}`

        }
        else if (selectVal==='year') {
            endPoint = `/discover/${selectVal}?primary_release_year=${timeFrame}`;

         }
        
        else {

            endPoint=`/trending/${selectVal}/${timeFrame}`
            

        }

    const { data } = await axios.get(endPoint);
    console.log(data);
    setTrendingMovies(data.results);  
  };

  useEffect(() => {
    TrendingMoviesCall();
  }, [timeFrame, selectVal]); 

  return (
    <>
      <div className="w-screen px-2 mt-2 text-white  flex justify-center items-center">
        <div className="title-heading flex gap-1 items-center">
          <i
            className="ri-arrow-right-line text-3xl font-bold hover:text-[rgb(147,51,234)] active:scale-[90%]"
            onClick={() => navigate(-1)}
          ></i>{" "}
          <h1 className="text-2xl font-semibold">Trending</h1>
        </div>

        <SearchBar />

        <div className="drop-downs flex gap-2">
          <DropDownComp
            title="Duration"
            options={["week", "day",'hour','year']}
            selectVal={timeFrame}
            setSelectVal={setTimeFrame}  // Pass down the handler to change timeFrame
        />
          <DropDownComp
            title="Category"
            options={["tv", 'movie']} selectVal={setSelectVal}
            selectVal={selectVal}
            setSelectVal={setSelectVal}  // Pass down the handler to change selectVal
         />
        </div>
      </div>

      {/* Pass trendingMovies to Cards */}
      <Cards data={trendingMovies} />
    </>
  );
};

export default Trending;
