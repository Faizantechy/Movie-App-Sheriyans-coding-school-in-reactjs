import axios from "../utils/axios";
import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import DropDownComp from "../components/DropDownComp";
import Cards from "../components/Cards";
import SearchBar from "../components/SearchBar";
import Loading from "../components/Loading";

const Popular = () => {
  const navigate = useNavigate();

  const [popularMovies, setPopularMovies] = useState([]);
  const [Category, setCatgory] = useState("movie");
  const [page, setPage] = useState(2);
  const [hasMore, sethasMore] = useState(true);

  const getPopularMovies = async () => {
    let endPoint = "";

    if (Category === "top-rated") {
      endPoint = `/movie/top_rated?page=${page}`;
    } else if (Category === "airing-today") {
      endPoint = `/tv/airing_today?page=${page}`;
    } else if (Category === "drama") {
      endPoint = `/discover/tv?with_genres=18?page=${page}`;
    } else {
      endPoint = `/trending/all/day?page=${page}`;
    }

    const { data } = await axios.get(endPoint);
    console.log(data);

    if (data.results.length > 0) {
      setPopularMovies((prevState) => [...prevState, ...data.results]);
      setPage(page + 1);
    } else {
      sethasMore(false);
    }
  };

  const refreshHandler = () => {
    if (popularMovies.length >= 0) {
      getPopularMovies();
    } else {
      setPage(1);
      setPopularMovies([]);
    }
  };

  useEffect(() => {
    setPopularMovies([]);
    setPage(1);
  }, [Category]);

  useEffect(() => {
    refreshHandler();
  }, [page, Category]);
  
  if (popularMovies.length===0) {
    
return <Loading/>
  }

  return  <>
  <div className="w-screen px-5 mt-2 text-white  lg:flex  justify-center items-center ">
    <div className="title-heading flex gap-1 items-center lg:justify-start justify-center">
      <i
        className="ri-arrow-right-line text-3xl  font-bold hover:text-[rgb(147,51,234)] active:scale-[90%]"
        onClick={() => navigate(-1)}
      ></i>{" "}
      <h1 className="text-2xl font-semibold  ">Popular</h1>
    </div>

    <SearchBar Data={popularMovies} />

    <div className="drop-downs lg:flex lg:gap-2 gap-5 lg:static absolute right-0 top-[130px] z-[700]">
   
      <DropDownComp
        title="Category"
        options={["tv", "movie", "top-rated", "airing-today", "drama"]}
        selectVal={Category}
        setSelectVal={setCatgory} 
      />
    </div>
  </div>

  <InfiniteScroll
    dataLength={popularMovies.length}
    next={getPopularMovies}
    hasMore={hasMore}
    loader={''}
  >
    <Cards data={popularMovies} />
  </InfiniteScroll>
</>;
};

export default Popular;
