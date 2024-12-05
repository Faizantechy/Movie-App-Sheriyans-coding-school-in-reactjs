import { createSlice } from "@reduxjs/toolkit";


const initialState = ({
    
    info:[]

})

const movieSlice = createSlice({
    
    name: 'movieInfo',
    initialState,
    reducers:{

        loadMovie: (state, action) => {
            
            state.info = action.payload
            console.log(state.info);
            
            
            
            
    },
        
    removeMovie: (state, action) => {
            
            
        state.info=null
        
    },

    }

})

export const { loadMovie, removeMovie } = movieSlice.actions
export default movieSlice.reducer