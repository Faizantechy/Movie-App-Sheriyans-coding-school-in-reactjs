import { createSlice } from "@reduxjs/toolkit";


const initialState = ({
    
    info:[]

})

const personSlice = createSlice({
    
    name: 'personInfo',
    initialState,
    reducers:{

    loadperson: (state, action) => {
            
            
            state.info=action.payload
            
    },
        
    removeperson: (state, action) => {
            
            
        state.info=null
        
    },

    }

})

export const { loadperson, removeperson } = personSlice.actions
export default personSlice.reducer