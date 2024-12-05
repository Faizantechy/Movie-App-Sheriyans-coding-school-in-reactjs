import { createSlice } from "@reduxjs/toolkit";


const initialState = ({
    
    info:[]

})

const tvSlice = createSlice({
    
    name: 'tvInfo',
    initialState,
    reducers:{

    loadtv: (state, action) => {
            
            
            state.info=action.payload
            
    },
        
    removetv: (state, action) => {
            
            
        state.info=null
        
    },

    }

})

export const { loadtv, removetv } = tvSlice.actions
export default tvSlice.reducer