import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./src/resolver/UserResolver";
import { ApolloServer } from "apollo-server-express";
import { VehicleResolver } from "./src/resolver/VehicleResolver";

async function main() {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [UserResolver,VehicleResolver],
    emitSchemaFile: true,
  });

  const apolloServer = new ApolloServer({ schema });

  const app = express();

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(4001, () => {
    console.log("Server started on http://localhost:4001/graphql");
  });
}

// ✅ Don't forget this line
main().catch((err) => console.error(err));
