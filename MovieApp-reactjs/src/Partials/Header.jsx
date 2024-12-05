import axios from '../utils/axios'
import React, { useEffect, useState } from 'react'

const Header = () => {

    const [trending, setTrending] = useState([])
    const [index,setIndex]=useState(4)


    const getTrendingMovies = async () => {

        

      const { data } = await axios.get('/movie/popular')
      

      let randomData = data.results[Math.floor(Math.random() * data.results.length)]
      let RNDATA=data.results[index]
      

        setTrending(randomData)
        

    }

    useEffect(() => {
        
        getTrendingMovies()

    },[])
        

    

    return (
      
    
        <div className='Header lg:w-full h-[50vh] mt-2 bg-red-600 relative flex flex-col justify-center items-center' style={{ backgroundImage: `url(${
            trending.backdrop_path
              ? `https://image.tmdb.org/t/p/original${trending.backdrop_path || trending.backdrop_path}`
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNNLEL-qmmLeFR1nxJuepFOgPYfnwHR56vcw&s"
          })` }}>
        
     
      <div className="img-title  w-full h-full">
       
        

        <div className=" lg:m-[5rem] m-[3rem] mt-[10rem]  text-white ">
                    <h1 className='text-3xl font-bold mb-4'>{ trending.title}</h1>
          <p className='lg:max-w-[70%] w-[100%] text-lg '>
          {trending.overview ? trending.overview.slice(0, 200) : "Loading..."} ...more
            </p>
            
            <p className='lg:max-w-[70%] w-[100%] text-lg lg:hidden'>
          {trending.overview ? trending.overview.slice(0, 100) : "Loading..."} ...more
          </p>
            

            <p className='text-white flex gap-4 mt-5 items-center'>
              <i className="ri-volume-down-line lg:text-[25px] text-[20px] font-bold text-yellow-500  lg:ml-2 text-nowrap"><span className='text-white'>{ trending.
release_date}</span></i>
              <i className="ri-movie-line text-xl font-bold lg:ml-2 text-yellow-500  text-[25px] text-nowrap"><span className='text-white lg:text-[25px] text-[20px]'>{ trending.popularity
              }</span></i>


            </p>

            <button 
  className="px-6 py-3 rounded-lg bg-[rgb(147,51,234)] text-white font-bold shadow-lg hover:bg-purple-800 transition-all duration-300 transform hover:scale-105 focus:outline-none z-[800] mt-4 ml-2 absolute active:border lg:flex hidden">
  Watch Trailer
</button>
                    
                    {/* <div className="controls space-x-5 z-[2000] w-full">
              <i className="ri-arrow-left-s-line text-[5rem] rounded-full bg-[rgb(147,51,234)] text-white hover:opacity-[0.5] active:scale-[90%]"></i>
                        <i className="ri-arrow-right-s-line text-[5rem] rounded-full bg-[rgb(147,51,234)] text-white hover:opacity-[0.5] active:scale-[90%] "></i>

                    </div> */}
        </div>
      </div>
    </div>
  )
}

export default Header;
