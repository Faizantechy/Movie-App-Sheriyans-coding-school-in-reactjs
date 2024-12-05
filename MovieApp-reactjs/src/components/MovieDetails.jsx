import React, { useEffect } from "react";
import { asyncLoadMovies } from "../actions/MovieActions";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import { removeMovie } from "../reducers/MovieSlice";
import HorizZontalCards from '../Partials/HorizontalCards';


const MovieDetails = () => {
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
      className="w-full h-[100vh] text-white bg-cover bg-no-repeat bg-center movie-details overflow-auto relative"
      style={{
        backgroundImage: `url(${
          info.detail.backdrop_path
            ? `https://image.tmdb.org/t/p/original${
                info.detail.belongs_to_collection?.backdrop_path || info.detail.backdrop_path
              }`
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNNLEL-qmmLeFR1nxJuepFOgPYfnwHR56vcw&s"
        })`,
      }}
    >
      <div className="flex flex-wrap md:flex-nowrap gap-4 px-4 md:px-10 pt-5">
        <div className="w-full md:w-1/2">
          <nav className="text-zinc-100 text-xl font-bold flex gap-6 items-center py-2">
            <Link>
              <i
                className="ri-arrow-right-line text-3xl font-bold hover:text-[rgb(147,51,234)] active:scale-[90%]"
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



{/* This is the card part */}
          <div className="lg:w-full md:w-[80%] lg:h-auto h-[300px] w-[280px] lg:mt-4 lg:mb-0  shadow-2xl border-5 border-red-600 lg:ml-0  card: space-x-5 ">
            <img
              src={`https://image.tmdb.org/t/p/original${info.detail.backdrop_path}`}
              alt=""
              className="w-full h-[85%] object-cover rounded-md"
            />



            
            <br />
            <br />


          </div>

          {/* This is the card part */}


          <div className="mt-5 flex flex-col lg:flex-row gap-2">
            <h1 className="text-2xl font-semibold mb-2">Available to rent:</h1>
            <div className="flex flex-wrap gap-2">
              {info.watchProviders?.results?.US?.rent.map((m) => (
                <img
                  src={`https://image.tmdb.org/t/p/original${m.logo_path}`}
                  alt="provider logo"
                  className="w-[30px]"
                  key={m.provider_id}
                />
              ))}
            </div>
          </div> 

          <div className="mt-5 lg:flex gap-2 flex-col lg:flex-row ">
            <h1 className="text-2xl font-semibold mb-2">Available to buy:</h1>
            <div className="flex flex-wrap gap-2">
              {info.watchProviders?.results?.US?.buy.map((m) => (
                <img
                  src={`https://image.tmdb.org/t/p/original${m.logo_path}`}
                  alt="provider logo"
                  className="w-[30px]"
                  key={m.provider_id}
                />
              ))}
            </div>
          </div>

        </div>

        <div className="w-full md:w-1/2 md:pl-6 lg:mt-12">
        <h2 className="text-4xl font-bold block">
  {info.detail.original_title || info.title || info.detail.original_title}{" "}
  <span className="font-semibold text-zinc-400 text-2xl">
    ({info.detail.release_date.split("-")[0]})
  </span>
</h2>


          <div className="flex flex-wrap gap-4 mt-2 lg:justify-start justify-center">
            <span className="rounded-full bg-[rgb(147,51,234)] w-[55px] h-[55px] flex justify-center items-center font-bold">
              {info.detail.vote_average}
            </span>

            <div className="date-runtime flex items-center ">
            <span className="text-xl text-zinc-400 font-bold">{info.detail.release_date}</span>
              <span className="text-xl text-zinc-400 font-bold">{info.detail.runtime} min</span>
              </div>
          </div>
          <div className="mt-6 lg:text-left text-center ">
            <h3 className="text-3xl font-bold">Overview</h3>
            <p className="text-zinc-300 leading-6">{info.detail.overview}</p>
            <h4 className="text-xl font-semibold text-[rgb(147,51,234)] mt-4">
              {info.detail.genres.map((genre) => genre.name).join(", ")}
            </h4>
          </div>

          <Link
            className="mt-5 inline-block bg-[rgb(147,51,234)] lg:px-4 lg:py-2 rounded-lg px-[15%] py-3 hover:scale-90 transition-transform lg:ml-0 ml-[12%] text-xl  "
            to={`${pathname}/trailer`}
          >
            <i className="ri-google-play-fill"></i> Watch Trailer
          </Link>
        </div>
      </div>
      
  

      <div className="mt-10 px-4 md:px-10">
        <HorizZontalCards
          data={info.recommendations?.length > 0 ? info.recommendations : info.similar || []} title='Recommendations'
          Value={ Value} />
      </div>

      <Outlet/>


    </div>
    
  );
};

export default MovieDetails;
