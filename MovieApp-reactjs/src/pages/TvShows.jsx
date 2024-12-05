import axios from "../utils/axios";
import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import DropDownComp from "../components/DropDownComp";
import Cards from "../components/Cards";
import SearchBar from "../components/SearchBar";
import Loading from "../components/Loading";

const TvShows = () => {
  const navigate = useNavigate();

  const [Shows, setShows] = useState([]);
  const [Category, setCatgory] = useState("");
  const [page, setPage] = useState(3);
  const [hasMore, sethasMore] = useState(true);

  const getShows = async () => {
    let endPoint = "";

  
    if (Category === "airing-today") {
      endPoint = `/tv/airing_today?page=${page}`;
  
    } else if (Category === "on-the-air") {
      endPoint = `/on_the_air?page=${page}`;
    } else if (Category === "discover") {
      endPoint = `/discover/tv?with_genres=18&page=${page}
`;
    } else {
      endPoint = `/trending/tv/day?page=${page}`;
    }

    const { data } = await axios.get(endPoint);
    const filteredResults = data.results.filter(
      (tv) => tv.id && tv.name && tv.poster_path 
    );
  

    if (filteredResults.length > 0) {
      setShows((prevState) => [...prevState, ...filteredResults]);
      setPage(page + 1);
    } else {
      sethasMore(false);
    }
  };


  const refreshHandler = () => {
    if (Shows.length >= 0) {
      getShows();
    } else {
      setPage(1);
      setShows([]);
    }
  };

  useEffect(() => {
    setShows([]);
    setPage(1);
  }, [Category]);

  useEffect(() => {
    refreshHandler();
  }, [page, Category]);

  if (Shows.length === 0) {
    return <Loading/>
  }



  return (
    <>
      <div className="w-screen px-5 mt-4 text-white  lg:flex  justify-center items-center ">
        <div className="title-heading flex gap-1 items-center lg:justify-start justify-center">
          <i
            className="ri-arrow-right-line text-3xl  font-bold hover:text-[rgb(147,51,234)] active:scale-[90%]"
            onClick={() => navigate(-1)}
          ></i>{" "}
          <h1 className="text-2xl font-semibold  flex gap-2 items-center ">
            Shows{" "}
            <span className="text-[rgb(147,51,234)] text-[20px] text-nowrap">
              {Category.length !== 0 ? Category : ""}
            </span>
          </h1>
        </div>

        <SearchBar Data={Shows} />

        <div className="drop-downs lg:flex lg:gap-2 gap-5 lg:static absolute right-0 top-[130px] z-[700]">
          <DropDownComp
            title="Category"
            options={[
              "popular",
              "airing-today",
              "on-the-air",
              "Discover",
            ]}
            selectVal={Category}
            setSelectVal={setCatgory}
          />
        </div>
      </div>

      <InfiniteScroll
        dataLength={Shows.length}
        next={getShows}
        hasMore={hasMore}
        loader={``}
      >
        <Cards data={Shows} title='tv' />
      </InfiniteScroll>
    </>
  );
};

export default TvShows;
