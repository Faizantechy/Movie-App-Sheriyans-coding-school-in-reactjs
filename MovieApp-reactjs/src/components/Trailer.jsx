import React from 'react'
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import NotFound from './NotFound'


const Trailer = () => {


    const ytVideo = useSelector((state) => state.movieInfo.info.videos)
    console.log(ytVideo);
    const { pathname } = useLocation()
    console.log(pathname)
    const navigate=useNavigate()
    
  return ytVideo?(
      <div className='absolute w-full h-fit top-0 left-0 bg-[rgba(0,0,0,.9)] flex justify-center '>
          

          <Link>
              
              <span  className='text-2xl font-bold absolute top-5 right-[6%]'   onClick={() => navigate(-1)}>X</span>
           
            </Link>

          <ReactPlayer url={`https://www.youtube.com/watch?v=${ytVideo.key}`} height={500} width={1200}/>

    </div>
  ): <NotFound/>
}

export default Trailer