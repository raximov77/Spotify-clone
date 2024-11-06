import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    likedList:[]
}

export const LikeSlice = createSlice({
    name:"Liked",
    initialState,
    reducers:{
        saveLikeList:(state, action) => {
            return {
                likedList:[...state.likedList, action.payload]
            }
        }
    }
})

export const {saveLikeList} = LikeSlice.actions