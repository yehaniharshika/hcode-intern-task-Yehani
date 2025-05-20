import "reflect-metadata";
import "dotenv/config";
import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { AppDataSource } from "./src/config/data-source";
import { VehicleResolver } from "./src/resolver/VehicleResolver";
import { graphqlUploadExpress } from "graphql-upload-minimal";

const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log("✅ Database connected!");

    const schema = await buildSchema({
      resolvers: [VehicleResolver],
    });

    const server = new ApolloServer({ schema });

    await server.start();

    const app = express();
    app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

    // ✅ Fix: Proper CORS for Vite
    const allowedOrigin = "http://localhost:5173";
    app.use(
      cors({
        origin: allowedOrigin,
        credentials: true,
      })
    );

    app.use(express.json());

    // Apply Apollo middleware AFTER CORS
    server.applyMiddleware({
      app,
      cors: false, // 🚨 disable Apollo's internal CORS handling!
    });

    const PORT = 4000;
    app.listen(PORT, () => {
      console.log(
        `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  } catch (err) {
    console.error("❌ Server startup error:", err);
  }
};

startServer();
