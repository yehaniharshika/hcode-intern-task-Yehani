import fs from 'fs';
import { Vehicle } from './vehicleModel';  // Assuming you have a vehicle model to save data to DB

export const importVehicleData = async (filePath: string) => {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    const vehicleRecords = parseCSV(data);  // Implement your CSV parsing here
    for (const record of vehicleRecords) {
      const ageOfVehicle = calculateAgeOfVehicle(record.manufactured_date);
      await Vehicle.create({
        ...record,
        age_of_vehicle: ageOfVehicle,
      }).save();
    }
  } catch (error) {
    console.error('Error in vehicle data import:', error);
    throw error;
  }
};

// Helper function to calculate vehicle age
const calculateAgeOfVehicle = (manufacturedDate: string): number => {
  const currentYear = new Date().getFullYear();
  const vehicleYear = new Date(manufacturedDate).getFullYear();
  return currentYear - vehicleYear;
};

// Helper function to parse CSV (can be replaced with any parser like 'csv-parser')
const parseCSV = (data: string) => {
  // Your CSV parsing logic goes here
  return JSON.parse(data); // Assuming JSON format for simplicity
};
