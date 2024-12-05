import axios from "../utils/axios";
import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import DropDownComp from "../components/DropDownComp";
import Cards from "../components/Cards";
import SearchBar from "../components/SearchBar";
import Loading from "../components/Loading";

const Movies = () => {
  const navigate = useNavigate();

  const [Movies, setMovies] = useState([]);
  const [Category, setCatgory] = useState("");
  const [page, setPage] = useState(3);
  const [hasMore, sethasMore] = useState(true);
  const [rating, setrating] = useState([]);

  const getMovies = async () => {
    let endPoint = "";

    if (Category === "top-rated") {
      endPoint = `/movie/top_rated?page=${page}`;
    } else if (Category === "airing-today") {
      endPoint = `/tv/airing_today?page=${page}`;
    } else if (Category === "now_playing") {
      endPoint = `/movie/${Category}page=${page}`;
    } else {
      endPoint = `/trending/all/day?page=${page}`;
    }

    const { data } = await axios.get(endPoint);
    const filteredMovies = data.results.filter(
      (movie) =>
        movie.media_type === "movie" &&
        movie.id &&
        movie.backdrop_path &&
        movie.poster_path
    );

    setrating(filteredMovies.vote_average);

    if (filteredMovies.length > 0) {
      setMovies((prevState) => [...prevState, ...filteredMovies]);
      setPage(page + 1);
    } else {
      sethasMore(false);
    }
  };

  const refreshHandler = () => {
    if (Movies.length >= 0) {
      getMovies();
    } else {
      setPage(1);
      setMovies([]);
    }
  };

  useEffect(() => {
    setMovies([]);
    setPage(1);
  }, [Category]);

  useEffect(() => {
    refreshHandler();
  }, [page, Category]);

  if (Movies.length === 0) {
    return <Loading />;
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
            Movies{" "}
            <span className="text-[rgb(147,51,234)] text-[20px] text-nowrap">
              {Category.length !== 0 ? Category : ""}
            </span>
          </h1>
        </div>

        <SearchBar Data={Movies} />

        <div className="drop-downs lg:flex lg:gap-2 gap-5 lg:static absolute right-0 top-[130px] z-[700]">
          <DropDownComp
            title="Category"
            options={["movie", "top-rated", "airing-today", "now-playing"]}
            selectVal={Category}
            setSelectVal={setCatgory}
          />
        </div>
      </div>

      <InfiniteScroll
        dataLength={Movies.length}
        next={getMovies}
        hasMore={hasMore}
        loader={``}
      >
        <Cards data={Movies} title="movie" />
      </InfiniteScroll>
    </>
  );
};

export default Movies;
