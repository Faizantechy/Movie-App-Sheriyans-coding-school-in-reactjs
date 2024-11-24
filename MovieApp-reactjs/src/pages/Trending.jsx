import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import DropDownComp from "../components/DropDownComp";
import Cards from "../components/Cards";
import axios from "../utils/axios";

const Trending = () => {
    const navigate = useNavigate();
    
  
  



  const [trendingMovies, setTrendingMovies] = useState([]);
  const [selectVal, setSelectVal] = useState("");
  const [timeFrame, setTimeFrame] = useState("week");  // Adding timeFrame state for dropdown

    const TrendingMoviesCall = async () => {
      
        let endPoint = ''
        
    
        if (selectVal === 'top-rated') {
            endPoint = '/movie/top_rated';
        } else if (selectVal === 'airing-today') {
            endPoint = '/tv/airing_today';
        } else if (selectVal === 'drama') {
            endPoint = '/discover/tv?with_genres=18';
        }
        else {
            
            endPoint='/trending/all/day'
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
      <div className="w-screen px-2 mt-2 text-white  lg:flex  justify-center items-center ">
        <div className="title-heading flex gap-1 items-center lg:justify-start justify-center">
          <i
            className="ri-arrow-right-line text-3xl  font-bold hover:text-[rgb(147,51,234)] active:scale-[90%]"
            onClick={() => navigate(-1)}
          ></i>{" "}
          <h1 className="text-2xl font-semibold  ">Trending</h1>
        </div>

        <SearchBar />

        <div className="drop-downs lg:flex lg:gap-2 gap-5 lg:static absolute right-0 top-[130px] z-[700]">
          <DropDownComp
            title="Duration"
            options={["week", "day",'hour','year']}
            selectVal={timeFrame}
            setSelectVal={setTimeFrame} 
        />
        <DropDownComp
  title="Category"
  options={["tv", "movie", "top-rated", "airing-today", "drama"]}
  selectVal={selectVal} // Pass the current value
  setSelectVal={setSelectVal} // Pass the setter function
/>
        </div>
      </div>

      {/* Pass trendingMovies to Cards */}
      <Cards data={trendingMovies} />
    </>
  );
};

export default Trending;
