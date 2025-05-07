// src/server.ts
import 'reflect-metadata'; // required by type-graphql
import 'dotenv/config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { AppDataSource } from './src/config/data-source';
import { UserResolver } from './src/resolver/UserResolver';
import { VehicleResolver } from './src/resolver/VehicleResolver';


const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log('✅ Database connected!');

    const schema = await buildSchema({
      resolvers: [UserResolver,VehicleResolver], // <-- register your resolver here
    });

    const server = new ApolloServer({
      schema, // not typeDefs/resolvers, use the built schema
    });

    await server.start();

    const app = express();
    server.applyMiddleware({ app });

    app.listen({ port: 4000 }, () =>
      console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    );
  } catch (error) {
    console.error('❌ Server startup error:', error);
  }
};

startServer();
