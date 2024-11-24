import React from 'react'
import SideBar from '../components/SideBar'

import SearchBar from '../components/SearchBar'
import Header from '../Partials/Header'
import HorizontalCards from '../Partials/HorizontalCards'

function Home() {
  return (
      <div className='flex h-screen w-full bg-slate-900 text-white'>
          
          <SideBar />
          
      <div className="SideBar w-[80%] h-screen overflow-y-auto">

        <SearchBar />
        
        <Header />

        <HorizontalCards/>
        

    
        

          </div>

      
      </div>
  )
}

export default Home