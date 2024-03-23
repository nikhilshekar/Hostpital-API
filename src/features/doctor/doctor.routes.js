// Manage routes/paths to ProductController

// 1. Import express.
import express from "express";
import DoctorController from "./doctor.controller.js";

// 2. Initialize Express router.
const doctorRouter = express.Router();

const doctorController = new DoctorController();

// All the paths to controller methods.
doctorRouter.post("/registration", (req, res) => {
  doctorController.register(req, res);
});

doctorRouter.post("/login", (req, res) => {
  doctorController.login(req, res);
});

export default doctorRouter;
