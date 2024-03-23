// 1. Import Exprerss
import express from "express";
import dotenv from "dotenv";
import doctorRouter from "./src/features/doctor/doctor.routes.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import loggerMiddleware from "./src/middlewares/logger.middleware.js";
import { ApplicationError } from "./src/error-handler/applicationError.js";
import { connectUsingMongoose } from "./src/config/mongooseConfig.js";
import patientRouter from "./src/features/patient/patient.routes.js";
import reportRouter from "./src/features/report/report.router.js";

// 2. Create Server
const server = express();

// load all the environment variables in application
dotenv.config();

server.use(express.json());

server.use(loggerMiddleware);

server.use("/doctor/", loggerMiddleware, doctorRouter);
server.use("/patient/", loggerMiddleware, jwtAuth, patientRouter);
server.use("/", loggerMiddleware, reportRouter);

// Error handler middleware
server.use((err, req, res, next) => {
  console.log(err);
  if (err instanceof ApplicationError) {
    return res.status(err.code).send(err.message);
  }

  // server errors.
  res.status(500).send("Something went wrong, please try later");
});

// 5. Specify port.
server.listen(3200, () => {
  console.log("Server is running at 3200");
  connectUsingMongoose();
});
