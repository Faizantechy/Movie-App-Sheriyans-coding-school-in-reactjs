import axios from '../utils/axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


const Header = () => {

    const [trending, setTrending] = useState([])
  const [index, setIndex] = useState(4)



    const getTrendingMovies = async () => {

        

      const { data } = await axios.get('/movie/popular')
      

      let randomData = data.results[Math.floor(Math.random() * data.results.length)]
      let RNDATA = data.results[index]
      
      // const filteredData=randomData.filter(movie => movie.id &&
      //   movie.backdrop_path &&
      //   movie.poster_path &&
      //   movie.title &&
      //   movie.original_title
        
        
      // )
      

        setTrending(RNDATA)
        

    }

    useEffect(() => {
        
        getTrendingMovies()

    },[])
        

    

    return (
      
    
        <div className='Header lg:w-full h-[50vh] mt-2 overflow-x-auto bg-red-600 relative flex flex-col justify-center items-center' style={{ backgroundImage: `url(${
            trending.backdrop_path
              ? `https://image.tmdb.org/t/p/original${trending.backdrop_path || trending.backdrop_path}`
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNNLEL-qmmLeFR1nxJuepFOgPYfnwHR56vcw&s"
          })` }}>
        
     
      <div className="img-title  w-full ml-10">
       
        

        <div className=" lg:m-[0] m-[3rem] lg:mt-[3rem] flex flex-col  text-white justify-start ">
                    <h1 className='text-3xl lg:text-4xl font-bold mb-4 text-left'>{ trending.title}</h1>
                    <p className="lg:max-w-[80%] w-[100%] text-lg  block">
  {trending.overview ? trending.overview.slice(0, 160) : "Loading..."} ...more
</p>


            <p className='text-white flex gap-4 lg:mt-5 items-center mt-8 lg:mb-0'>
              <i className="ri-volume-down-line lg:text-[25px] text-[20px] font-bold text-yellow-500  lg:ml-2 text-nowrap"><span className='text-white'>{ trending.
release_date}</span></i>
              <i className="ri-movie-line text-xl font-bold lg:ml-2 text-yellow-500  text-[25px] text-nowrap"><span className='text-white lg:text-[25px] text-[20px]'>{ trending.popularity
              }</span></i>


            </p>
                    
                    {/* <div className="controls space-x-5 z-[2000] w-full">
              <i className="ri-arrow-left-s-line text-[5rem] rounded-full bg-[rgb(147,51,234)] text-white hover:opacity-[0.5] active:scale-[90%]"></i>
                        <i className="ri-arrow-right-s-line text-[5rem] rounded-full bg-[rgb(147,51,234)] text-white hover:opacity-[0.5] active:scale-[90%] "></i>

                    </div> */}
          </div>
          {/* <Link  to={`/${trending.media_type || title}/details/${trending.id}`}
  className="px-6 py-3 rounded-lg bg-[rgb(147,51,234)] text-white font-bold shadow-lg hover:bg-purple-800 transition-all duration-300 transform hover:scale-105 focus:outline-none z-[800]  mt-2 ml-2 mb-5 absolute active:border lg:flex ">
  Watch Trailer
</Link> */}
      </div>
    </div>
  )
}

export default Header;
