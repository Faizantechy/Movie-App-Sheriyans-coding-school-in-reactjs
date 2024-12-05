import React from 'react'

const Cards = ({ data, Rating }) => {

  return (
    <div className='flex w-full h-full gap-4 mt-5 flex-wrap justify-center items-center'>
      

          

          
          {data.map((d) => {
              
              return <div className="card lg:w-[250px] w-[90%] lg:h-[450px] h-[400px] border shadow-2xl pb-4 relative z-[1800]  ">
<img
  src={`https://image.tmdb.org/t/p/original${
    d.profile_path || d.poster_path || d.backdrop_path ||  "https://www.shutterstock.com/shutterstock/photos/2059817444/display_1500/stock-vector-no-image-available-photo-coming-soon-illustration-vector-2059817444.jpg"
  }`}
  className="w-full lg:h-[85%] h-[75%] position-center object-cover"
  alt={d.name || d.title || "No image"}
/>
              
                <h2 className='lg:text-2xl text-3xl font-bold lg:mt-4 lg:ml-2 text-center text-white mt-10'>{d.title || d.
original_name}</h2>
                
             
             {d.vote_average? <div className="ratings w-[40px] h-[40px] rounded-full bg-[rgb(147,51,234)] flex justify-center items-center absolute bottom-[100px] font-bold text-xl p-2 right-[-11px] z-[3000] text-white">{Math.floor(d.vote_average)}</div>: null}  

          </div>
          })}
          


    </div>
  )
}

export default Cards