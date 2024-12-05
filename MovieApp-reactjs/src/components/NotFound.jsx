import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate=useNavigate()
    return (
      
      <div className='absolute w-full h-fit top-0 left-0 bg-[rgba(0,0,0,.9)] flex justify-center'>
            <Link>
              
              <span  className='text-2xl font-bold absolute top-5 right-[6%]'   onClick={() => navigate(-1)}>X</span>
           
            </Link>
          <img src="https://media3.giphy.com/media/YyKPbc5OOTSQE/200w.gif?cid=6c09b952cvad9fzphap8ksqwbbyvcwvb4luufjj0uvnlbivs&ep=v1_gifs_search&rid=200w.gif&ct=g" className='w-[500px]' alt="" />
          
    </div>
  )
}

export default NotFound