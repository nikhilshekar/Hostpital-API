// Manage routes/paths to ProductController

// 1. Import express.
import express from "express";
import PatientController from "./patient.controller.js";

// 2. Initialize Express router.
const patientRouter = express.Router();

const patientController = new PatientController();

// All the paths to controller methods.
patientRouter.post("/registration", (req, res) => {
  patientController.register(req, res);
});

export default patientRouter;
