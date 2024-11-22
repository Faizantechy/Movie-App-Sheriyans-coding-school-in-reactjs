import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function SideBar() {

  const getSearches = async () => {


    const D = await axios.get('/search/multi')
    console.log(D);
    
  }

  useEffect(() => {
    
    getSearches()

  },
    
    
    [])
  return (
    <div className="w-[20%] min-h-[100vh] p-4 overflow-y-auto flex flex-col justify-center border">
      <h1 className="text-3xl font-bold flex items-center">
        <i className="ri-play-circle-fill text-purple-600 mr-2"></i> SCSDB
      </h1>

      <nav>
        <h2 className="mt-5 font-bold text-xl">News Feeds</h2>

        <ul className="flex flex-col gap-4 text-lg ml-2 mt-4 font-semibold">
          <Link to="/trending" className="hover:bg-purple-600 p-2 rounded-lg duration-75 active:scale-[90%]">
            <i className="ri-fire-fill mr-2"></i> Trending
          </Link>
          <Link to="/popular" className="hover:bg-purple-600 p-2 rounded-lg duration-75 active:scale-[90%]">
            <i className="ri-bar-chart-fill mr-2"></i> Popular
          </Link>
          <Link to="/movies" className="hover:bg-purple-600 p-2 rounded-lg duration-75 active:scale-[90%]">
            <i className="ri-movie-line mr-2"></i> Movies
          </Link>
          <Link to="/tv-shows" className="hover:bg-purple-600 p-2 rounded-lg duration-75 active:scale-[90%]">
            <i className="ri-tv-2-line mr-2"></i> TV Shows
          </Link>
          <Link to="/people" className="hover:bg-purple-600 p-2 rounded-lg duration-75 active:scale-[90%]">
            <i className="ri-contacts-line mr-2"></i> People
          </Link>
        </ul>

        <hr className="h-[2px] bg-black w-full mt-6" />

        <h2 className="mt-5 font-bold text-xl">Website Information</h2>

        <ul className="flex flex-col gap-4 text-lg ml-2 mt-4 font-semibold">
          <Link to="/about" className="hover:bg-purple-600 p-2 rounded-lg duration-75 active:scale-[90%]">
            <i className="ri-folder-info-line mr-2"></i> About
          </Link>
          <Link to="/contact" className="hover:bg-purple-600 p-2 rounded-lg duration-75 active:scale-[90%]">
            <i className="ri-phone-line mr-2"></i> Contact
          </Link>
        </ul>
      </nav>
    </div>
  );
}

export default SideBar;
