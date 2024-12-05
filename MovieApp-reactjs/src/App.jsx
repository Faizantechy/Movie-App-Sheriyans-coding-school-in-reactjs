import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Trending from './pages/Trending'
import Popular from './pages/Popular'
import Movies from './pages/Movies'
import TvShows from './pages/TvShows'
import People from './pages/People'
import MovieDetails from './components/MovieDetails'
import TvDetails from './components/TvDetails'
import PersonDetails from './components/PersonDetails'
import Trailer from './components/Trailer'
import NotFound from './components/NotFound'

function App() {



  
  return (

    <div className='w-screen h-[100vh]'>
      
      
      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/trending" element={<Trending />} />
  <Route path="/popular" element={<Popular />} />
  <Route path="/movies" element={<Movies />} />
  <Route path="/movie/details/:id" element={<MovieDetails />}>
    {/* Nested Trailer Route */}
    <Route path="trailer" element={<Trailer />} />
  </Route>
  <Route path="/tv-shows" element={<TvShows />} />
  <Route path="/tv/details/:id" element={<TvDetails />} />
  <Route path="/people" element={<People />} />
        <Route path="/person/details/:id" element={<PersonDetails />} />
        <Route path='*' element={<NotFound/>} />
</Routes>

    
    </div>
    
  )
}

export default App