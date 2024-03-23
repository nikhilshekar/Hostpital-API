import jwt from "jsonwebtoken";
import DoctorRepository from "./doctor.repository.js";
import bcrypt from "bcrypt";
import { doctorSchema } from "./doctor.schema.js";

export default class DoctorController {
  constructor() {
    this.doctorRepository = new DoctorRepository();
  }

  async register(req, res) {
    try {
      const result = await this.doctorRepository.findByEmail(req.body.email);
      if (result) {
        res
          .status(400)
          .json({ success: false, msg: "Email is already exist!" });
      } else {
        const newDoctor = req.body;
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        newDoctor.password = hashedPassword;
        const savedDoctor = await this.doctorRepository.registration(newDoctor);
        res.status(201).send(savedDoctor);
      }
    } catch (err) {
      res.status(400).json({ success: false, error: err });
    }
  }

  async login(req, res) {
    try {
      const doctor = await this.doctorRepository.findByEmail(req.body.email);
      if (!doctor) {
        return res.status(400).send("Incorrect Email");
      } else {
        const result = await bcrypt.compare(req.body.password, doctor.password);
        if (result) {
          const token = jwt.sign({ doctorid: doctor._id }, "secretKey", {
            expiresIn: "1h",
          });
          res
            .status(200)
            .json({ success: true, msg: "Login Successeful", token: token });
        } else {
          return res.status(400).send("Incorrect Password");
        }
      }
    } catch (err) {
      res.status(400).json({ success: false, error: err });
    }
  }
}
