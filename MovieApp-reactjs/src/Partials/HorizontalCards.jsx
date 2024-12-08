import { Link } from "react-router-dom";
import DropDownComp from "../components/DropDownComp";
import Loading from "../components/Loading";
import axios from "../utils/axios";
import React, { useEffect, useState } from "react";

function HorizontalCards({ title, data, Value }) {
  const [selectVal, setSelectVal] = useState("tv");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(5)

  let combinedArrays = [...data, ...results];
  const dropDownData = async () => {
    let endPoints = "";

    if (selectVal === "top-rated") {
      endPoints = "/movie/top_rated";
    } else if (selectVal === "airing-today") {
      endPoints = "/tv/airing_today";
    } else if (selectVal === "drama") {
      endPoints = "/discover/tv?with_genres=18";
    } else {
      endPoints = "/trending/all/day";
    }

    const { data } = await axios.get(`${endPoints}?page=${page}`);

    setResults(data.results);

  };



  useEffect(() => {
    dropDownData();

  }, [selectVal]);

  return (
    <>
      <div className="w-full px-5 py-4">
        <div className="dropdown flex justify-between">
          <h1 className="text-2xl font-bold">{title ? title : "Trending"}</h1>

          {Value && (
            <DropDownComp
              selectVal={selectVal}
              setSelectVal={setSelectVal}
              title="category"
              options={["tv", "top-rated", "airing-today", "movie", "drama"]}
            />
          )}
        </div>

        <div className="horizontal-cards flex overflow-x-auto w-full mt-5 space-x-5 ">
          {/* Mapping through results */}
          {combinedArrays.map((item) => (
            <Link to={`/${item.media_type || title}/details/${item.id}`}>
              <div
                key={item.id}
                className="card flex-none lg:w-[300px] w-[270px] overflow-y-auto h-[400px] bg-black rounded-lg overflow-hidden border"
              >
                {/* Using a fixed aspect ratio for images */}
                <img
                  src={`https://image.tmdb.org/t/p/original${
                    item.backdrop_path || item.poster_path
                  }`}
                  alt={item.title || item.name}
                  className="w-full h-[200px] object-cover"
                />
                <h2 className="text-xl font-bold ml-4 mt-2">
                  {item.name ? item.name || item.original_title ||item.title : "Movie!"}
                </h2>
                <p className="p-2">
                  {item.overview
                    ? item.overview.slice(0, 150)
                    : "Overview Not Found..."}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default HorizontalCards;
