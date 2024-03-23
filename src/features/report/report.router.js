import express from "express";
import ReportController from "./report.controller.js";
import jwtAuth from "../../middlewares/jwt.middleware.js";

// 2. Initialize Express router.
const reportRouter = express.Router();

const reportController = new ReportController();

// All the paths to controller methods.
reportRouter.post("/patient/:id/create_report", jwtAuth, (req, res) => {
  reportController.createReport(req, res);
});

reportRouter.get("/patient/:id/all_reports", jwtAuth, (req, res) => {
  reportController.getAllReport(req, res);
});

reportRouter.get("/reports/:status", jwtAuth, (req, res) => {
  reportController.getReportByStatus(req, res);
});

export default reportRouter;
