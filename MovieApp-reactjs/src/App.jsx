import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Trending from './pages/Trending'
import Popular from './pages/Popular'
import Movies from './pages/Movies'
import TvShows from './pages/TvShows'
import People from './pages/People'

function App() {



  
  return (

    <div className='w-screen h-[100vh]'>
      
      
      <Routes>


        <Route path='/' element={<Home />} />
        <Route path='/trending' element={<Trending />} />
        <Route path='/popular' element={<Popular />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/tv-shows' element={<TvShows />} />
        <Route path='/people' element={<People/>} />






        </Routes>
    
    
    </div>
    
  )
}

export default App