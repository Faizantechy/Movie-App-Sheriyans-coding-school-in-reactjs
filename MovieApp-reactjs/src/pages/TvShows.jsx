import axios from "../utils/axios";
import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import DropDownComp from "../components/DropDownComp";
import Cards from "../components/Cards";
import SearchBar from "../components/SearchBar";

const TvShows = () => {
  const navigate = useNavigate();

  const [Shows, setShows] = useState([]);
  const [Category, setCatgory] = useState("");
  const [page, setPage] = useState(3);
  const [hasMore, sethasMore] = useState(true);

  const getShows = async () => {
    let endPoint = "";

    if (Category === "top-rated") {
      endPoint = `/movie/top_rated?page=${page}`;
    } else if (Category === "airing-today") {
      endPoint = `/tv/airing_today?page=${page}`;
    } else if (Category === "now_playing") {
      endPoint = `/movie/${Category}page=${page}`;
    } else if (Category === "popular") {
      endPoint = `/popular?page={page}
`;
    } else if (Category === "on-the-air") {
      endPoint = `/on_the_air?page={page}`;
    } else if (Category === "discover") {
      endPoint = `/discover/tv?with_genres=18&page={page}
`;
    } else {
      endPoint = `/trending/all/day?page=${page}`;
    }

    const { data } = await axios.get(endPoint);
    console.log(data);

    if (data.results.length > 0) {
      setShows((prevState) => [...prevState, ...data.results]);
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

        <SearchBar Data={TvShows} />

        <div className="drop-downs lg:flex lg:gap-2 gap-5 lg:static absolute right-0 top-[130px] z-[700]">
          <DropDownComp
            title="Category"
            options={[
              "popular",
              "top-rated",
              "airing-today",
              "now-playing",
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
        loader={<h1>Loading....</h1>}
      >
        <Cards data={Shows} />
      </InfiniteScroll>
    </>
  );
};

export default TvShows;
