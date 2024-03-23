import ReportRepository from "./report.repository.js";

export default class ReportController {
  constructor() {
    this.reportRepository = new ReportRepository();
  }

  async createReport(req, res) {
    try {
      const report = {
        doctor: req.doctorid,
        patient: req.params.id,
        status: req.body.status,
      };
      await this.reportRepository.createReport(report);
      return res
        .status(201)
        .json({ success: true, msg: "Report has been created" });
    } catch (err) {
      console.log(err);
      return res.status(400).send(err);
    }
  }

  async getAllReport(req, res) {
    try {
      const result = await this.reportRepository.getAllReport(req.params.id);
      if (!result) {
        return res
          .status(404)
          .json({ success: false, msg: "Not found any reports" });
      }
      return res.status(200).json({ success: true, result });
    } catch (err) {
      console.log(err);
      return res.status(400).send(err);
    }
  }

  async getReportByStatus(req, res) {
    try {
      const result = await this.reportRepository.getReportByStatus(
        req.params.status
      );
      if (result.length == 0) {
        return res
          .status(404)
          .json({ success: false, msg: "No reports found" });
      }
      return res.status(200).json({ success: true, result });
    } catch (err) {
      console.log(err);
      return res.status(400).send(err);
    }
  }
}
