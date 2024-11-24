import React from 'react'

const Cards = ({data}) => {
  return (
      <div className='flex w-full h-full gap-4 mt-5 flex-wrap'>
          

          
          {data.map((d) => {
              
              return <div className="card lg:w-[250px] lg:h-[400px] h-[500px] border shadow-2xl pb-4 overflow-hidden ">
              <img   src={`https://image.tmdb.org/t/p/original${d.backdrop_path || d.poster_path}`} className='w-full h-[85%] position-center object-cover' alt="" />
              
                  <h2 className='lg:text-2xl text-3xl font-bold mt-4 lg:ml-2 text-center text-white'>{ d.title? d.title:'No title'}</h2>

          </div>
          })}
          


    </div>
  )
}

export default Cards