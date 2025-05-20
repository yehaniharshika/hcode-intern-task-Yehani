import { Job } from "bull";
import fs from "fs/promises";
import path from "path";
import xlsx from "xlsx";
import Redis from "ioredis";
import { AppDataSource } from "../config/data-source";
import { parseCSV } from "../utils/csvParser";

//Redis setup
const redisClient = new Redis({ host: "localhost", port: 6380 });

//Lazy import for Vehicle entity
let Vehicle: any;

//Parses CSV or Excel files into JSON records.
const parseFile = async (filePath: string): Promise<any[]> => {
  const ext = path.extname(filePath).toLowerCase();

  if (ext === ".csv") {
    console.log("🔍 Detected CSV file");
    return await parseCSV(filePath);
  }

  if (ext === ".xlsx") {
    console.log("🔍 Detected Excel file");
    const fileBuffer = await fs.readFile(filePath);
    const workbook = xlsx.read(fileBuffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    return xlsx.utils.sheet_to_json(sheet);
  }

  throw new Error(`Unsupported file type: ${ext}`);
};

/**
 * Main function to import vehicle data from the parsed file into the database.
 */
export const importVehicles = async (filePath: string): Promise<void> => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
    console.log("✅ Database connection initialized");
  }

  if (!Vehicle) {
    Vehicle = (await import("../../../database-service/src/entity/Vehicle"))
      .Vehicle;
  }

  const vehicleRepo = AppDataSource.getRepository(Vehicle);
  const data = await parseFile(filePath);
  console.log(`📄 Parsed ${data.length} records`);

  const vehicles = data.map((record: any) => {
    const manufacturedDate = new Date(record.manufactured_date);
    const age = new Date().getFullYear() - manufacturedDate.getFullYear();

    return vehicleRepo.create({
      first_name: record.first_name,
      last_name: record.last_name,
      email: record.email,
      car_make: record.car_make,
      car_model: record.car_model,
      vin: record.vin,
      manufactured_date: manufacturedDate,
      age_of_vehicle: age,
    });
  });

  await vehicleRepo.save(vehicles);
  console.log("✅ Vehicles saved successfully");
};


//Job processor to handle background import jobs.
export const importJobProcessor = async (job: Job): Promise<void> => {
  const { filePath } = job.data;
  console.log(`📥 Starting import for file: ${filePath}`);

  try {
    await importVehicles(filePath);
    await redisClient.set("import-job-status", "success", "EX", 3600);
    console.log("✅ Import job completed. Status set to success in Redis.");
  } catch (err: any) {
    console.error("❌ Import job failed:", err.message);
    await redisClient.set("import-job-status", "failed", "EX", 3600);
    console.log("⚠️ Import job status set to failed in Redis.");
  }
};
