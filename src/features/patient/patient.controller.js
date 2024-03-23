import PatientRepository from "./patient.repository.js";

export default class PatientController {
  constructor() {
    this.patientRepository = new PatientRepository();
  }

  async register(req, res) {
    try {
      const exist = await this.patientRepository.findByPhone(req.body.phone);
      if (exist) {
        res
          .status(200)
          .json({ success: true, msg: "Patient already exist", info: exist });
      } else {
        const patient = req.body;
        patient.doctor = req.doctorid;
        const result = await this.patientRepository.registration(patient);
        res.status(200).json({
          success: true,
          msg: "Patient has been registered successfully!",
          result,
        });
      }
    } catch (err) {
      res.status(400).json({ success: false, error: err });
    }
  }
}
