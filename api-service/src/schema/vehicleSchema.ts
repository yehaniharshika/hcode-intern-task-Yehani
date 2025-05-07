import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Vehicle {
    id: Int!
    first_name: String!
    last_name: String!
    email: String!
    car_make: String!
    car_model: String!
    vin: String!
    manufactured_date: String!
    age_of_vehicle: Int!
  }

  type Query {
    vehicles(page: Int!): [Vehicle!]!
    searchVehicles(model: String!): [Vehicle!]!
  }

  type Mutation {
    createVehicle(
      first_name: String!
      last_name: String!
      email: String!
      car_make: String!
      car_model: String!
      vin: String!
      manufactured_date: String!
    ): Vehicle!
    updateVehicle(
      id: Int!
      first_name: String
      last_name: String
      email: String
      car_make: String
      car_model: String
      vin: String
      manufactured_date: String
    ): Vehicle!
    deleteVehicle(id: Int!): Boolean!
    importVehicles(filePath: String!): Boolean!
    exportVehicles(age: Int!): Boolean!
  }
`;
