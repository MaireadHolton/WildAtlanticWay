import * as dotenv from "dotenv";
import Mongoose from "mongoose";
import * as mongooseSeeder from "mais-mongoose-seeder";
import { seedData } from "./seed-data.js";

const seedLib = mongooseSeeder.default;

// function for seeding the database with the information contained in seed-data.js
async function seed() {
  const seeder = seedLib(Mongoose);
  const dbData = await seeder.seed(seedData, { dropDatabase: false, dropCollections: true });
  console.log(dbData);
}

// function for connecting to the mongo database
export function connectMongo() {
  dotenv.config();

  Mongoose.set("strictQuery", true);
  Mongoose.connect(process.env.db);
  const db = Mongoose.connection;

  // displays an error to the console when there is a connection error to the database
  db.on("error", (err) => {
    console.log(`database connection error: ${err}`);
  });

 // displays an error to the console when the database is disconnected
  db.on("disconnected", () => {
    console.log("database disconnected");
  });

  // displays the database connection details to the console
  db.once("open", function () {
    console.log(`database connected to ${this.name} on ${this.host}`);
    seed();
  });
}
