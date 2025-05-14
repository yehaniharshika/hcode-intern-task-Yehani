import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Vehicle } from "../model/Vehicle";
import Swal from "sweetalert2";
import "../pages/style/alert.css";

const GRAPHQL_API = "http://localhost:4000/graphql";
export const initialState: Vehicle[] = [];

// GraphQL fetcher helper
const fetchGraphQL = async (query: string, variables?: any) => {
  const res = await fetch(GRAPHQL_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  return json.data;
};

// 🔄 Create
export const createVehicle = createAsyncThunk(
  "vehicle/createVehicle",
  async (vehicle: Omit<Vehicle, "id">) => {
    const mutation = `
      mutation CreateVehicle(
        $first_name: String!
        $last_name: String!
        $email: String!
        $car_make: String!
        $car_model: String!
        $vin: String!
        $manufactured_date: String!
      ) {
        createVehicle(
          first_name: $first_name
          last_name: $last_name
          email: $email
          car_make: $car_make
          car_model: $car_model
          vin: $vin
          manufactured_date: $manufactured_date
        ) {
          id
          first_name
          last_name
          email
          car_make
          car_model
          vin
          manufactured_date
          age_of_vehicle
        }
      }
    `;
    const data = await fetchGraphQL(mutation, {
      ...vehicle,
      manufactured_date: vehicle.manufactured_date.toString(),
    });

    Swal.fire({
      title: "✅ Success!",
      html: '<p class="swal-text">Vehicle saved successfully.</p>',
      icon: "success",
      background: "white",
      color: "black",
      confirmButtonColor: "green",
      timer: 2500,
      customClass: {
        title: "swal-title",
        popup: "swal-popup",
        confirmButton: "swal-button",
      },
    });

    return data.createVehicle;
  }
);

// 🔄 Update
export const updateVehicle = createAsyncThunk(
  "vehicle/updateVehicle",
  async (vehicle: Vehicle) => {
    const mutation = `
      mutation UpdateVehicle(
        $id: ID!,
        $first_name: String,
        $last_name: String,
        $email: String,
        $car_make: String,
        $car_model: String,
        $vin: String,
        $manufactured_date: String
      ) {
        updateVehicle(
          id: $id,
          first_name: $first_name,
          last_name: $last_name,
          email: $email,
          car_make: $car_make,
          car_model: $car_model,
          vin: $vin,
          manufactured_date: $manufactured_date
        ) {
          id
          first_name
          last_name
          email
          car_make
          car_model
          vin
          manufactured_date
          age_of_vehicle
        }
      }
    `;

    const data = await fetchGraphQL(mutation, {
      ...vehicle,
      manufactured_date: vehicle.manufactured_date.toString(),
    });

    Swal.fire({
      title: "✅ Updated!",
      html: '<p class="swal-text">Vehicle updated successfully.</p>',
      icon: "success",
      background: "white",
      color: "black",
      confirmButtonColor: "green",
      timer: 2500,
      customClass: {
        title: "swal-title",
        popup: "swal-popup",
        confirmButton: "swal-button",
      },
    });

    return data.updateVehicle;
  }
);

// 🔄 Delete
export const deleteVehicle = createAsyncThunk(
  "vehicle/deleteVehicle",
  async (id: number) => {
    const mutation = `
      mutation DeleteVehicle($id: ID!) {
        deleteVehicle(id: $id)
      }
    `;
    await fetchGraphQL(mutation, { id });

    Swal.fire({
      title: "✅ Deleted!",
      html: '<p class="swal-text">Vehicle deleted successfully.</p>',
      icon: "success",
      background: "white",
      color: "black",
      confirmButtonColor: "green",
      timer: 2500,
      customClass: {
        title: "swal-title",
        popup: "swal-popup",
        confirmButton: "swal-button",
      },
    });

    return id;
  }
);

// 🔄 Fetch All
export const getVehicles = createAsyncThunk("vehicle/getVehicles", async () => {
  const query = `
    query GetVehicles {
      vehicles {
        id
        first_name
        last_name
        email
        car_make
        car_model
        vin
        manufactured_date
        age_of_vehicle
      }
    }
  `;
  const data = await fetchGraphQL(query);
  return data.vehicles;
});

const vehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createVehicle.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(updateVehicle.fulfilled, (state, action) => {
        const index = state.findIndex((v) => v.id === action.payload.id);
        if (index !== -1) {
          state[index] = action.payload;
        }
      })
      .addCase(deleteVehicle.fulfilled, (state, action) => {
        return state.filter((v) => v.id !== action.payload);
      })
      .addCase(getVehicles.fulfilled, (_, action) => {
        return action.payload;
      });
  },
});


export default vehicleSlice.reducer;
