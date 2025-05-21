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
import http from "http";

const app = express();
const server = http.createServer(app);

// ✅ Setup Socket.IO
const io = new SocketIOServer(server, {
  cors: {
    origin: "http://localhost:5173", // React frontend
  },
});

io.on("connection", (socket) => {
  console.log("🔌 New WebSocket connection:", socket.id);
});
export { io };

const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log("✅ DB Connected");

    const schema = await buildSchema({
      resolvers: [VehicleResolver],
    });

    const apolloServer = new ApolloServer({ schema });
    await apolloServer.start();

    // ✅ GraphQL file upload middleware
    app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

    // ✅ CORS for frontend
    const allowedOrigin = "http://localhost:5173";
    app.use(cors({ origin: allowedOrigin, credentials: true }));

    app.use(express.json());

    // ✅ Apollo GraphQL middleware
    apolloServer.applyMiddleware({
      app,
      cors: false, // disable internal CORS since already handled
    });

    app.use("/downloads", express.static("exports"));

    server.listen(4000, () => {
      console.log(`🚀 Server: http://localhost:4000/graphql`);
    });
  } catch (err) {
    console.error("❌ Server startup error:", err);
  }
};

startServer();
