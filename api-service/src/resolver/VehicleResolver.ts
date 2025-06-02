import { Resolver, Query, Mutation, Arg, ID, Int } from "type-graphql";
import { AppDataSource } from "../config/data-source";
import { jobQueue } from "../queues/jobQueue";
import { Vehicle } from "../entity/Vehicle";

import { createWriteStream } from "fs";
import path from "path";
import { FileUpload, GraphQLUpload } from "graphql-upload-minimal";
import { validateOrReject } from "class-validator";

@Resolver(Vehicle)
export class VehicleResolver {
  private vehicleRepository = AppDataSource.getRepository(Vehicle);

  @Query(() => [Vehicle])
  async getAllVehicles(
    @Arg("page", () => Int, { defaultValue: 1 }) page: number
  ): Promise<Vehicle[]> {
    const take = 100;
    const skip = (page - 1) * take;
    return this.vehicleRepository.find({
      order: { manufactured_date: "ASC" },
      skip,
      take,
    });
  }

  @Query(() => [Vehicle])
  async searchVehicles(
    @Arg("model", () => String) model: string
  ): Promise<Vehicle[]> {
    return this.vehicleRepository
      .createQueryBuilder("vehicle")
      .where("vehicle.car_model LIKE :model", { model: `${model}%` })
      .getMany();
  }

  @Mutation(() => Vehicle)
  async createVehicle(
    @Arg("first_name") first_name: string,
    @Arg("last_name") last_name: string,
    @Arg("email") email: string,
    @Arg("car_make") car_make: string,
    @Arg("car_model") car_model: string,
    @Arg("vin") vin: string,
    @Arg("manufactured_date") manufactured_date: string
  ): Promise<Vehicle> {
    const age =
      new Date().getFullYear() - new Date(manufactured_date).getFullYear();
    const vehicle = this.vehicleRepository.create({
      first_name,
      last_name,
      email,
      car_make,
      car_model,
      vin,
      manufactured_date: new Date(manufactured_date),
      age_of_vehicle: age,
    });

    await validateOrReject(vehicle);
    return this.vehicleRepository.save(vehicle);
  }

  @Mutation(() => Vehicle, { nullable: true })
  async updateVehicle(
    @Arg("id", () => ID) id: number,
    @Arg("first_name", { nullable: true }) first_name?: string,
    @Arg("last_name", { nullable: true }) last_name?: string,
    @Arg("email", { nullable: true }) email?: string,
    @Arg("car_make", { nullable: true }) car_make?: string,
    @Arg("car_model", { nullable: true }) car_model?: string,
    @Arg("vin", { nullable: true }) vin?: string,
    @Arg("manufactured_date", { nullable: true }) manufactured_date?: string
  ): Promise<Vehicle | undefined> {
    const vehicle = await this.vehicleRepository.findOne({ where: { id } });
    if (!vehicle) return undefined;

    if (first_name !== undefined) vehicle.first_name = first_name;
    if (last_name !== undefined) vehicle.last_name = last_name;
    if (email !== undefined) vehicle.email = email;
    if (car_make !== undefined) vehicle.car_make = car_make;
    if (car_model !== undefined) vehicle.car_model = car_model;
    if (vin !== undefined) vehicle.vin = vin;
    if (manufactured_date !== undefined) {
      vehicle.manufactured_date = new Date(manufactured_date);
      vehicle.age_of_vehicle =
        new Date().getFullYear() - vehicle.manufactured_date.getFullYear();
    }

    return this.vehicleRepository.save(vehicle);
  }

  @Mutation(() => Boolean)
  async deleteVehicle(@Arg("id", () => ID) id: number): Promise<boolean> {
    const result = await this.vehicleRepository.delete(id);
    return result.affected !== 0;
  }

  @Mutation(() => Boolean)
  async importVehicles(
    @Arg("file", () => GraphQLUpload) file: FileUpload
  ): Promise<boolean> {
    const { createReadStream, filename } = await file;

    const uploadPath = path.join(__dirname, "../../uploads", filename);

    return new Promise((resolve, reject) => {
      createReadStream()
        .pipe(createWriteStream(uploadPath))
        .on("finish", async () => {
          console.log("File uploaded:", uploadPath);
          //Queue the import job
          await jobQueue.add("import", { filePath: uploadPath });
          resolve(true);
        })
        .on("error", (err: any) => {
          console.error("Upload failed:", err);
          reject(false);
        });
    });
  }

  @Mutation(() => Boolean)
  async exportVehicles(@Arg("age", () => Int) age: number): Promise<boolean> {
    await jobQueue.add("export", { age });
    return true;
  }
}
