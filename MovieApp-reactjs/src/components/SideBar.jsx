import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  const getSearches = async () => {
    const D = await axios.get("/search/multi");
    console.log(D);
  };

  useEffect(() => {
    getSearches();
  }, []);

  return (
    <>
      {/* Hamburger Icon */}
      <div className="hamburger lg:hidden bg-[rgb(15,23,42)]">
        <i
          className="ri-menu-2-line text-2xl font-bold absolute top-5 left-5 hover:text-purple-600 active:scale-[90%]"
          onClick={() => setIsOpen(!isOpen)}
        ></i>
      </div>

      {/* Sidebar */}
      <div
        className={`lg:w-[20%] w-[200px] lg:bg-transparent lg:h-[100vh] h-[80vh] lg:p-8 px-3 py-4 overflow-y-auto flex-col justify-center border lg:flex lg:static absolute z-[5000000] bg-zinc-900 top-[4.4rem] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } duration-300 ease-in-out lg:translate-x-0 text-nowrap`}
      >
        <h1 className="lg:text-3xl text-2xl font-bold flex items-center">
          <i className="ri-play-circle-fill text-purple-600 mr-2"></i> Entertain
        </h1>

        <nav>
          <h2 className="mt-5 font-bold text-xl">News Feeds</h2>

          <ul className="flex flex-col gap-4 text-lg ml-2 mt-4 font-semibold">
            <Link
              to="/trending"
              className="hover:bg-purple-600 p-2 rounded-lg duration-75 active:scale-[90%]"
            >
              <i className="ri-fire-fill mr-2 text-yellow-400"></i> Trending
            </Link>
            <Link
              to="/popular"
              className="hover:bg-purple-600 p-2 rounded-lg duration-75 active:scale-[90%]"
            >
              <i className="ri-bar-chart-fill mr-2"></i> Popular
            </Link>
            <Link
              to="/movies"
              className="hover:bg-purple-600 p-2 rounded-lg duration-75 active:scale-[90%]"
            >
              <i className="ri-movie-line mr-2"></i> Movies
            </Link>
            <Link
              to="/tv-shows"
              className="hover:bg-purple-600 p-2 rounded-lg duration-75 active:scale-[90%]"
            >
              <i className="ri-tv-2-line mr-2"></i> TV Shows
            </Link>
            <Link
              to="/people"
              className="hover:bg-purple-600 p-2 rounded-lg duration-75 active:scale-[90%]"
            >
              <i className="ri-contacts-line mr-2"></i> People
            </Link>
          </ul>

          <hr className="h-[2px] bg-black w-full mt-6" />

          <h2 className="mt-5 font-bold text-xl">Website Info</h2>

          <ul className="flex flex-col gap-4 text-lg ml-2 mt-4 font-semibold">
            <Link
              to="/about"
              className="hover:bg-purple-600 p-2 rounded-lg duration-75 active:scale-[90%]"
            >
              <i className="ri-folder-info-line mr-2"></i> About
            </Link>
            <Link
              to="/contact"
              className="hover:bg-purple-600 p-2 rounded-lg duration-75 active:scale-[90%]"
            >
              <i className="ri-phone-line mr-2"></i> Contact
            </Link>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default SideBar;
