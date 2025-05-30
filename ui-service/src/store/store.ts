import { configureStore } from "@reduxjs/toolkit";
import VehicleSlice from "../reducers/VehicleSlice";





const store = configureStore({
    reducer: {
        vehicle: VehicleSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
