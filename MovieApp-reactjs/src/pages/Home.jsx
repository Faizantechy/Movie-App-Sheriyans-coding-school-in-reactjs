import React from 'react'
import SideBar from '../components/SideBar'

import SearchBar from '../components/SearchBar'

function Home() {
  return (
      <div className='flex h-[100vh] w-full bg-slate-900 text-white'>
          
          <SideBar />
          
      <div className="SideBar w-[80%] h-screen">

        <SearchBar/>
    
        

          </div>

      
      </div>
  )
}

export default Home