import "reflect-metadata";
import "dotenv/config";
import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { AppDataSource } from "./src/config/data-source";
import { VehicleResolver } from "./src/resolver/VehicleResolver";
import { graphqlUploadExpress } from "graphql-upload-minimal";
import { Server as HttpServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import path from "path";
import Redis from "ioredis";

const startServer = async () => {
  try {
    //Initialize database
    await AppDataSource.initialize();
    console.log("✅ Database connected!");

    //Build GraphQL schema
    const schema = await buildSchema({
      resolvers: [VehicleResolver],
    });

    const apolloServer = new ApolloServer({ schema });
    await apolloServer.start();

    const app = express();

    //File upload middleware
    app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

    //CORS setup
    const allowedOrigin = "http://localhost:5173";
    app.use(cors({ origin: allowedOrigin, credentials: true }));
    app.use(express.json());

    //Serve static files (CSV exports)
    app.use(
      "/exports",
      express.static(path.join(__dirname, "../batch-job-service/exports"))
    );

    //Apply GraphQL middleware
    apolloServer.applyMiddleware({ app, cors: false });

    //HTTP & Socket.IO server setup
    const httpServer = new HttpServer(app);
    const io = new SocketIOServer(httpServer, {
      cors: {
        origin: allowedOrigin,
      },
    });

    //Handle WebSocket connection
    io.on("connection", (socket) => {
      console.log("🔌 Client connected:", socket.id);
    });

    //Redis Publisher setup
    const redisSubscriber = new Redis({ host: "localhost", port: 6380 });

    redisSubscriber.subscribe("export-events", (err, count) => {
      if (err) {
        console.error("❌ Redis subscribe failed:", err);
      } else {
        console.log("📡 Subscribed to export-events");
      }
    });
    redisSubscriber.subscribe("import-events");

    redisSubscriber.on("message", (channel, message) => {
      const data = JSON.parse(message);
      const socket = getSocketIO();

      if (!socket) return;

      if (channel === "export-events") {
        socket.emit(data.type, data);
        console.log(`Emitted export event: ${data.type}`);
      }

      if (channel === "import-events") {
        socket.emit(data.type, data);
        console.log(`Emitted import event: ${data.type}`);
      }
    });

    //Start listening
    const PORT = 4000;
    httpServer.listen(PORT, () => {
      console.log(
        `🚀 GraphQL ready at http://localhost:${PORT}${apolloServer.graphqlPath}`
      );
      console.log(`🔊 Socket.IO ready on ws://localhost:${PORT}`);
    });

    //Export socket instance for global access
    exportSocketIO(io);
  } catch (err) {
    console.error("❌ Server startup error:", err);
  }
};

//Global socket instance handling
let socketInstance: SocketIOServer | null = null;

export const exportSocketIO = (io: SocketIOServer) => {
  socketInstance = io;
};

export const getSocketIO = (): SocketIOServer | null => socketInstance;

//Start the server
startServer();
