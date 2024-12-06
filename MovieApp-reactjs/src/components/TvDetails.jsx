import React, { useEffect } from "react";
import { asyncLoadMovies } from "../actions/MovieActions";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import { removeMovie } from "../reducers/MovieSlice";
import HorizZontalCards from '../Partials/HorizontalCards';

const TvDetails = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.movieInfo);

  const Value = false;

  useEffect(() => {
    dispatch(asyncLoadMovies(id));
    return () => {
      dispatch(removeMovie());
    };
  }, [id]);

  if (!info || !info.detail) {
    return <Loading />;
  }

  return (
    <div
      className="w-full h-auto text-white bg-cover bg-no-repeat bg-center movie-details overflow-auto relative"
      style={{
        backgroundImage: `url(${
          info.detail.backdrop_path
            ? `https://image.tmdb.org/t/p/original${
          info.detail.poster_path
              }`
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNNLEL-qmmLeFR1nxJuepFOgPYfnwHR56vcw&s"
        })`,
      }}
    >
      <div className="flex flex-wrap gap-4 px-4 md:px-10 pt-5">
        <div className="w-full lg:w-1/2">
          <nav className="text-zinc-100 text-lg sm:text-xl font-bold flex gap-4 sm:gap-6 items-center py-2">
            <Link>
              <i
                className="ri-arrow-right-line text-2xl sm:text-3xl font-bold hover:text-[rgb(147,51,234)] active:scale-[90%]"
                onClick={() => navigate(-1)}
              ></i>
            </Link>
            <a
              href={`https://www.wikidata.org/wiki/${info.wikidata_id}`}
              target="_blank"
              rel="noreferrer"
            >
              <i className="ri-global-fill"></i>
            </a>
            <a href={info.detail.homepage} target="_blank" rel="noreferrer">
              <i className="ri-webhook-line"></i>
            </a>
            <a
              href={`https://www.imdb.com/title/${info.externalId.imdb_id}/`}
              target="_blank"
              rel="noreferrer"
            >
              IMDb
            </a>
          </nav>

          <div className="w-full lg:w-[80%] h-[250px] sm:h-[300px] mt-4 shadow-2xl border-5">
            <img
              src={`https://image.tmdb.org/t/p/original${info.detail.backdrop_path}`}
              alt=""
              className="w-full h-full object-cover rounded-md"
            />
          </div>

          <div className="mt-5 lg:flex gap-2">
            <h1 className="text-lg sm:text-2xl font-semibold mb-2">Available to rent:</h1>
            <div className="flex flex-wrap gap-2">
              {info.watchProviders?.results?.US?.rent.map((m) => (
                <img
                  src={`https://image.tmdb.org/t/p/original${m.logo_path}`}
                  alt="provider logo"
                  className="w-[20px] sm:w-[30px]"
                  key={m.provider_id}
                />
              ))}
            </div>
          </div>

          <div className="mt-5 lg:flex gap-2">
            <h1 className="text-lg sm:text-2xl font-semibold mb-2">Available to buy:</h1>
            <div className="flex flex-wrap gap-2">
              {info.watchProviders?.results?.US?.buy.map((m) => (
                <img
                  src={`https://image.tmdb.org/t/p/original${m.logo_path}`}
                  alt="provider logo"
                  className="w-[20px] sm:w-[30px]"
                  key={m.provider_id}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 lg:pl-6">
          <h2 className="text-2xl sm:text-4xl font-bold">
            {info.detail.original_title}{" "}
            <span className="font-semibold text-zinc-400 text-lg sm:text-2xl">
              ({info.detail.release_date.split("-")[0]})
            </span>
          </h2>
          <div className="flex flex-wrap gap-4 mt-2">
            <span className="rounded-full bg-[rgb(147,51,234)] w-[40px] sm:w-[55px] h-[40px] sm:h-[55px] flex justify-center items-center font-bold">
              {info.detail.vote_average}
            </span>

            <div className="date-runtime flex items-center">
              <span className="text-sm sm:text-xl text-zinc-400 font-bold">{info.detail.release_date}</span>
              <span className="text-sm sm:text-xl text-zinc-400 font-bold">{info.detail.runtime} min</span>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-lg sm:text-3xl font-bold">Overview</h3>
            <p className="text-zinc-300 leading-6 text-sm sm:text-base">{info.detail.overview}</p>
            <h4 className="text-sm sm:text-xl font-semibold text-[rgb(147,51,234)] mt-4">
              {info.detail.genres.map((genre) => genre.name).join(", ")}
            </h4>
          </div>

          <Link
            className="mt-5 lg:ml-0 ml-10 inline-block bg-[rgb(147,51,234)] lg:px-3 px-12 sm:px-8 py-2 rounded-lg hover:scale-90 transition-transform"
            to={`${pathname}/trailer`}
          >
            <i className="ri-google-play-fill"></i> Watch Trailer
          </Link>
        </div>
      </div>

      <div className="mt-10 px-4 md:px-10">
        <HorizZontalCards
          data={info.recommendations?.length > 0 ? info.recommendations : info.similar || []} title='Recommendations'
          Value={Value} />
      </div>

      <Outlet />
    </div>
  );
};

export default TvDetails;
