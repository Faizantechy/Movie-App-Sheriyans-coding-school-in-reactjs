import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import DropDownComp from "../components/DropDownComp";
import Cards from "../components/Cards";
import axios from "../utils/axios";

import InfiniteScroll from "react-infinite-scroll-component";

const Trending = () => {
  const navigate = useNavigate();

  const [trendingMovies, setTrendingMovies] = useState([]);
  const [selectVal, setSelectVal] = useState("");
  const [timeFrame, setTimeFrame] = useState("week"); // Adding timeFrame state for dropdown
  const [page, setPage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  const Value = true;

  const TrendingMoviesCall = async () => {
    let endPoint = "";

    if (selectVal === "top-rated") {
      endPoint = `/movie/top_rated?page=${page}`;
    } else if (selectVal === "airing-today") {
      endPoint = `/tv/airing_today?page=${page}`;
    } else if (selectVal === "drama") {
      endPoint = `/discover/tv?with_genres=18?page=${page}`;
    } else {
      endPoint = `/trending/all/day?page=${page}`;
    }

    const { data } = await axios.get(endPoint);
    console.log(data);

    if (data.results.length > 0) {
      setTrendingMovies((prevState) => [...prevState, ...data.results]);
      setPage(page + 1);
    } else {
      sethasMore(false);
    }
  };

  const refreshHandler = () => {
    if (trendingMovies.length >= 0) {
      TrendingMoviesCall();
    } else {
      setPage(1);
      setTrendingMovies([]);
    }
  };

  useEffect(() => {
    setTrendingMovies([]);
    setPage(1);
  }, [timeFrame, selectVal]);

  useEffect(() => {
    refreshHandler();
  }, [page, selectVal, timeFrame]);

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

        <SearchBar Data={trendingMovies} />

        <div className="drop-downs lg:flex lg:gap-2 gap-5 lg:static absolute right-0 top-[130px] z-[700]">
          <DropDownComp
            title="Duration"
            options={["week", "day", "hour", "year"]}
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

      <InfiniteScroll
        dataLength={trendingMovies.length}
        next={TrendingMoviesCall}
        hasMore={hasMore}
        loader={<h1>Loading....</h1>}
      >
        <Cards data={trendingMovies} />
      </InfiniteScroll>
    </>
  );
};

export default Trending;
