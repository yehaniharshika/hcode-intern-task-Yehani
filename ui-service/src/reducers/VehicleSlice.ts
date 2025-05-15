import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const GRAPHQL_API = "http://localhost:4000/graphql";

export interface Vehicle {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  car_make: string;
  car_model: string;
  vin: string;
  manufactured_date: string;
}

interface VehicleState {
  vehicles: Vehicle[];
  loading: boolean;
  error: string | null;
}

const initialState: VehicleState = {
  vehicles: [],
  loading: false,
  error: null,
};

export const createVehicle = createAsyncThunk(
  "vehicle/create",
  async (vehicleData: Vehicle) => {
    const query = `
      mutation CreateVehicle(
        $first_name: String!,
        $last_name: String!,
        $email: String!,
        $car_make: String!,
        $car_model: String!,
        $vin: String!,
        $manufactured_date: String!
      ) {
        createVehicle(
          first_name: $first_name,
          last_name: $last_name,
          email: $email,
          car_make: $car_make,
          car_model: $car_model,
          vin: $vin,
          manufactured_date: $manufactured_date
        ) {
          id
        }
      }
    `;

    const response = await axios.post(GRAPHQL_API, {
      query,
      variables: vehicleData,
    });

    if (response.data.errors) {
      throw new Error(response.data.errors[0].message);
    }

    return response.data.data.createVehicle;
  }
);

const vehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createVehicle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createVehicle.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicles.push(action.payload);
      })
      .addCase(createVehicle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create vehicle";
      });
  },
});

export default vehicleSlice.reducer;
