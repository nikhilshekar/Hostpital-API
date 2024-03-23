import mongoose from "mongoose";
import { reportSchema } from "./report.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

// creating model from schema.
const ReportModel = mongoose.model("Report", reportSchema);

export default class ReportRepository {
  async createReport(report) {
    try {
      const newReport = new ReportModel(report);
      await newReport.save();
      return newReport;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async getAllReport(patientid) {
    try {
      return await ReportModel.find({ patient: patientid });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async getReportByStatus(status) {
    try {
      return await ReportModel.find({ status: status });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
}
