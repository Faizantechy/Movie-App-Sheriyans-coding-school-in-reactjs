import React from 'react'

const Cards = ({data}) => {
  return (
      <div className='flex w-full h-full gap-4 mt-5 flex-wrap'>
          

          
          {data.map((d) => {
              
              return <div className="card w-[250px] h-[400px] border shadow-2xl ">
              <img   src={`https://image.tmdb.org/t/p/original${d.backdrop_path || d.poster_path}`} className='w-full h-[85%] position-center object-cover' alt="" />
              
                  <h2 className='text-2xl font-bold mt-2 ml-2 text-white'>{ d.title?d.title:'No title'}</h2>

          </div>
          })}
          


    </div>
  )
}

export default Cards