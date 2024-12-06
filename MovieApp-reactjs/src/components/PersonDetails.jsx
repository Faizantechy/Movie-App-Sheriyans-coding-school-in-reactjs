import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import { removeperson } from "../reducers/PersonSlice";
import { asyncLoadpeoples } from "../actions/PersonActions";
import HoriZontalCards from '../Partials/HorizontalCards'
import DropDownComp from "./DropDownComp";

const PersonDetails = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [category, setCategory] = useState('movie');

  const info = useSelector((state) => state.personInfo.info);

  useEffect(() => {
    dispatch(asyncLoadpeoples(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id]);

  if (!info || !info.detail) {
    return <Loading />;
  }

  return (
    <>
      <Link className="inline-block px-4 py-5 text-white">
        <i
          className="ri-arrow-right-line text-3xl font-bold hover:text-[rgb(147,51,234)] active:scale-[90%]"
          onClick={() => navigate(-1)}
        ></i>
      </Link>
      <div className="px-[5%] py-5 flex flex-col lg:flex-row gap-10">
        {/* Part1: Profile Info */}
        <div className="person-info w-full lg:w-[30%] flex flex-col justify-start mt-2">
          <img
            src={`https://image.tmdb.org/t/p/original${info.detail.profile_path}`}
            alt=""
            className="w-full lg:h-[320px] h-[400px] object-cover"
          />
          <hr className="h-[3px] lg:w-[220px] bg-zinc-400 mt-4 block" />
          <div className="icons lg:text-xl text-[20px] flex lg:gap-6 gap-[70px] font-bold mt-3 justify-center items-center text-white">
            <a
              href={`https://www.instagram.com/${info.externalId.instagram_id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="ri-instagram-line"></i>
            </a>
            <a
              href={`https://www.tiktok.com/@${info.externalId.tiktok_id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="ri-tiktok-fill"></i>
            </a>
            <a
              href={`https://twitter.com/${info.externalId.twitter_id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="ri-twitter-x-line"></i>
            </a>
            <a
              href={`https://www.facebook.com/${info.externalId.facebook_id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="ri-facebook-fill"></i>
            </a>
          </div>

          <div className="information mt-5 text-zinc-400">
            <h2 className="text-xl font-bold">Person Info</h2>
            <h3 className="font-bold mt-3">Known For</h3>
            <p>{info.detail.known_for_department}</p>
            <h3 className="font-bold mt-3">Gender</h3>
            <p>{info.detail.gender}</p>
            <h3 className="font-bold mt-3">Birthday</h3>
            <p>{info.detail.birthday}</p>

            <h3 className="font-bold mt-3">DeathDay</h3>
            <p>{info.detail.deathday}</p>

            <h3 className="font-bold mt-3">Birth Place</h3>
            <p>{info.detail.place_of_birth}</p>

            <h3 className="font-bold mt-3">Also Known as</h3>
            <p>{info.detail.also_known_as.length > 0 ? info.detail.also_known_as : 'No Info Found'}</p>
          </div>
        </div>

        {/* Part2: Biography */}
        <div className="content-part w-full lg:w-[70%] flex flex-col space-y-5 text-zinc-300">
          <div className="biography">
            <h1 className="text-4xl lg:text-5xl font-bold text-left">{info.detail.name}</h1>
            <h2 className="mt-4 text-xl font-bold">Biography</h2>
            <p className="w-full lg:w-[60%] leading-[30px] mt-2">{info.detail.biography}</p>

            <div className="mt-10">
              <HoriZontalCards data={info.combinedCredits.cast} title='Known For' />
            </div>
          </div>

          {/* Category Dropdown */}
          <div className="dropdown flex items-center justify-between mt-5">
            <h2 className="font-bold">Acting</h2>
            <DropDownComp
              title="Category"
              options={["tv", "movie"]}
              selectVal={category}
              setSelectVal={setCategory}
            />
          </div>

          {/* Movie/TV Credits */}
          <div className="frame w-full max-h-[400px] border-5 px-5 py-8 overflow-y-auto shadow-2xl shadow-purple-400 !border-solid">
            {info[category + 'Credits']?.cast?.map((movie, index) => (
              <li key={index} className="hover:text-white cursor-pointer hover:underline text-xl">
                <Link to={`/${category}/details/${movie.id}`}>
                  <span>{movie ? movie.title || movie.original_title : 'Not Found'}</span>
                  <span className="block">{movie.character ? movie.character : 'Not Found'}</span>
                </Link>
              </li>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonDetails;
