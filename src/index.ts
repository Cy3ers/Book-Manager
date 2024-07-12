// ./src/index.ts

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from "./config/database";
import usersRouter from "./routes/users";
import tasksRouter from "./routes/tasks";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());
app.use("/api/users", usersRouter);
app.use("/api/tasks", tasksRouter);

const port = process.env.PORT || 3000;

// app.listen(port, () => console.log(`Listening on port ${port}...`));

sequelize
  .sync()
  .then(() => {
    app.listen(port, () => console.log(`Listening on port ${port}...`));
    console.log("Models synchronized successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
