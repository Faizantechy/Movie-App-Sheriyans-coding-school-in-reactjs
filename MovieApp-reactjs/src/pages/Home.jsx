import React, { useEffect, useState } from 'react'
import SideBar from '../components/SideBar'

import SearchBar from '../components/SearchBar'
import Header from '../Partials/Header'
import HorizontalCards from '../Partials/HorizontalCards'

function Home() {


  const [searchVal, setSearchVal] = useState("");

  const [searches, setSearches] = useState([]);

  const getSearches = async () => {
    try {
      const response = await axios.get(`/search/multi?query=${searchVal}`);
      const apiResults = response.data.results || [];


      setSearches(apiResults);
    } catch (error) {
      console.error("Error fetching search results:", error);
      
    }
  };

  useEffect(() => {

  
if(searchVal && searchVal.trim()!==''){

  getSearches()
} else {
  
  setSearches([])
}
    ;
  }, [searchVal]);



  return (
      <div className='flex h-screen w-full bg-slate-900 text-white'>
          
          <SideBar />
          
      <div className="SideBar lg:w-[80%] w-[100%] h-screen overflow-y-auto">

        <SearchBar Data={searches} />
        
        <Header />

        <HorizontalCards/>
        

    
        

          </div>

      
      </div>
  )
}

export default Home