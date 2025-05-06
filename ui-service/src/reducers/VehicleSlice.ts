import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type { Vehicle } from "../model/Vehicle";


export const initialState: Vehicle[] = [];

// const api = axios.create({
//     baseURL : "http://localhost:3003/nurse",
// });


const vehicleSlice = createSlice({
    name: "vehicle",
    initialState,
    reducers: {
        
    },
   
});
export const {} = vehicleSlice.actions;
export default vehicleSlice.reducer;