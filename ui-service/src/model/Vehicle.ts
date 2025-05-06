export class Vehicle {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    car_make: string;
    car_model: string;
    vin: string;
    manufactured_date: Date;
    age_of_vehicle: number;
  
    constructor(
      id: number,
      first_name: string,
      last_name: string,
      email: string,
      car_make: string,
      car_model: string,
      vin: string,
      manufactured_date: Date,
      age_of_vehicle: number
    ) {
      this.id = id;
      this.first_name = first_name;
      this.last_name = last_name;
      this.email = email;
      this.car_make = car_make;
      this.car_model = car_model;
      this.vin = vin;
      this.manufactured_date = manufactured_date;
      this.age_of_vehicle = age_of_vehicle;
    }
  }
  