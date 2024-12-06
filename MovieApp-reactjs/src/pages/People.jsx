import axios from "../utils/axios";
import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import DropDownComp from "../components/DropDownComp";
import Cards from "../components/Cards";
import SearchBar from "../components/SearchBar";
import Loading from "../components/Loading";

const People = () => {
  const navigate = useNavigate();

  const [People, setPeople] = useState([]);
  const [Category, setCatgory] = useState("");
  const [page, setPage] = useState(3);
  const [hasMore, sethasMore] = useState(true);

  const getPeople = async () => {
    const { data } = await axios.get(`/person/popular?page=${page}`);
    console.log(data.results);

    // const filteredData = data.results.filter(
    //   (person) =>
    //     person.id &&
    //     person.original_title &&
    //     person.title &&
    //     person.biography &&
    //     person.birthday &&
    //     person.deathday &&
    //     person.gender &&
    //     person.known_for_department &&
    //     person.place_of_birth &&
    //     person.name &&
    //     person.profile_path
    // );

    if (data.results.length > 0) {
      setPeople((prevState) => [...prevState, ...data.results]);
      setPage(page + 1);
    } else {
      sethasMore(false);
    }
  };

  const refreshHandler = () => {
    if (People.length >= 0) {
      getPeople();
    } else {
      setPage(1);
      setPeople([]);
    }
  };

  useEffect(() => {
    setPeople([]);
    setPage(1);
  }, []);

  useEffect(() => {
    refreshHandler();
  }, [page]);

  if (People.length === 0) {
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
            People{" "}
            <span className="text-[rgb(147,51,234)] text-[20px] text-nowrap">
              {Category.length !== 0 ? Category : ""}
            </span>
          </h1>
        </div>

        <SearchBar Data={People} />
      </div>

      <InfiniteScroll
        dataLength={People.length}
        next={getPeople}
        hasMore={hasMore}
        loader={""}
      >
        <Cards data={People} title="person" />
      </InfiniteScroll>
    </>
  );
};

export default People;
