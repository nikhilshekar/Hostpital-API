import mongoose from "mongoose";
import { patientSchema } from "./patient.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

// creating model from schema.
const PatientModel = mongoose.model("Patient", patientSchema);

export default class PatientRepository {
  async registration(patient) {
    try {
      const newPatient = new PatientModel(patient);
      await newPatient.save();
      return newPatient;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }


  async findByPhone(phone) {
    try {
      return await PatientModel.findOne({ phone });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
}
