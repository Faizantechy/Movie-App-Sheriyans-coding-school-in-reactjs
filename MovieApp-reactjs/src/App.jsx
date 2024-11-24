import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Trending from './pages/Trending'

function App() {



  
  return (

    <div className='w-screen h-[100vh]'>
      
      
      <Routes>


        <Route path='/' element={<Home />} />
        <Route path='/trending' element={<Trending/>} />


        </Routes>
    
    
    </div>
    
  )
}

export default App