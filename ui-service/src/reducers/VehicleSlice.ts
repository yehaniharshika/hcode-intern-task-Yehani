// src/reducers/VehicleSlice.ts
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
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
  age_of_vehicle: string;
}

interface VehicleState {
  vehicles: Vehicle[];
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  importSuccess: boolean | null;
  exportSuccess: boolean | null;
}

const initialState: VehicleState = {
  vehicles: [],
  loading: false,
  error: null,
  total: 0,
  page: 1,
  importSuccess: null,
  exportSuccess: null,
};

export const createVehicle = createAsyncThunk(
  "vehicle/create",
  async (vehicleData: Vehicle) => {
    const query = `
      mutation CreateVehicle($first_name: String!, $last_name: String!, $email: String!, $car_make: String!, $car_model: String!, $vin: String!, $manufactured_date: String!) {
        createVehicle(first_name: $first_name, last_name: $last_name, email: $email, car_make: $car_make, car_model: $car_model, vin: $vin, manufactured_date: $manufactured_date) {
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

export const getAllVehicles = createAsyncThunk(
  "vehicle/getByPage",
  async (page: number) => {
    const query = `
      query GetAllVehicles($page: Int!) {
        getAllVehicles(page: $page) {
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

    const response = await axios.post(GRAPHQL_API, {
      query,
      variables: { page },
    });

    if (response.data.errors) {
      throw new Error(response.data.errors[0].message);
    }

    const vehicles = response.data.data.getAllVehicles;

    return {
      vehicles,
      page,
      total: vehicles.length,
    };
  }
);

export const updateVehicle = createAsyncThunk(
  "vehicle/update",
  async (vehicleData: Vehicle) => {
    const query = `
      mutation UpdateVehicle($id: ID!, $first_name: String, $last_name: String, $email: String, $car_make: String, $car_model: String, $vin: String, $manufactured_date: String) {
        updateVehicle(id: $id, first_name: $first_name, last_name: $last_name, email: $email, car_make: $car_make, car_model: $car_model, vin: $vin, manufactured_date: $manufactured_date) {
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

    const response = await axios.post(GRAPHQL_API, {
      query,
      variables: vehicleData,
    });

    if (response.data.errors) {
      throw new Error(response.data.errors[0].message);
    }

    return response.data.data.updateVehicle;
  }
);

export const deleteVehicle = createAsyncThunk(
  "vehicle/delete",
  async (id: string) => {
    const query = `
      mutation DeleteVehicle($id: ID!) {
        deleteVehicle(id: $id)
      }
    `;

    const response = await axios.post(GRAPHQL_API, {
      query,
      variables: { id },
    });

    if (response.data.errors) {
      throw new Error(response.data.errors[0].message);
    }

    return id;
  }
);

//import vehicles file
export const importVehicles = createAsyncThunk(
  "vehicle/import",
  async (file: File) => {
    const formData = new FormData();

    // GraphQL multipart request spec
    formData.append("operations", JSON.stringify({
      query: `
        mutation ImportVehicles($file: Upload!) {
          importVehicles(file: $file)
        }
      `,
      variables: { file: null },
    }));

    formData.append("map", JSON.stringify({
      "0": ["variables.file"],
    }));

    formData.append("0", file);

    const response = await axios.post(GRAPHQL_API, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.data.errors) {
      throw new Error(response.data.errors[0].message);
    }

    return response.data.data.importVehicles;
  }
);


export const exportVehicles = createAsyncThunk(
  "vehicle/export",
  async (age: number) => {
    const query = `
      mutation ExportVehicles($age: Int!) {
        exportVehicles(age: $age) {
          success
          fileUrl
        }
      }
    `;

    const response = await axios.post(GRAPHQL_API, {
      query,
      variables: { age },
    });

    if (response.data.errors) {
      throw new Error(response.data.errors[0].message);
    }

    const result = response.data.data.exportVehicles;
    return result; // return both success and fileUrl
  }
);

const vehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    resetImportStatus: (state) => {
      state.importSuccess = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createVehicle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createVehicle.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(createVehicle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create vehicle";
      })

      .addCase(getAllVehicles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getAllVehicles.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicles = action.payload.vehicles;
        state.page = action.payload.page;
        state.total = action.payload.total;
      })

      .addCase(getAllVehicles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch vehicles";
      })

      .addCase(updateVehicle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateVehicle.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        const index = state.vehicles.findIndex((v) => v.id === updated.id);
        if (index !== -1) {
          state.vehicles[index] = updated;
        }
      })

      .addCase(updateVehicle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update vehicle";
      })

      .addCase(deleteVehicle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteVehicle.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicles = state.vehicles.filter((v) => v.id !== action.payload);
      })

      .addCase(deleteVehicle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete vehicle";
      })

      .addCase(importVehicles.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.importSuccess = null;
      })

      .addCase(importVehicles.fulfilled, (state, action) => {
        state.loading = false;
        state.importSuccess = action.payload;
        console.log("✅ Import successful:", action.payload);
      })

      .addCase(importVehicles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to import vehicles";
        state.importSuccess = false;
      })

      .addCase(exportVehicles.pending, (state) => {
        state.loading = true;
        state.exportSuccess = null;
        state.error = null;
      })
      .addCase(exportVehicles.fulfilled, (state, action) => {
        state.loading = false;
        state.exportSuccess = action.payload.success;
      })
      .addCase(exportVehicles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to export vehicles";
        state.exportSuccess = false;
      });
  },
});

export const { setPage } = vehicleSlice.actions;

export default vehicleSlice.reducer;
