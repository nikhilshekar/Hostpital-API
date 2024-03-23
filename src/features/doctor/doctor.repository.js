import mongoose from "mongoose";
import { doctorSchema } from "./doctor.schema.js";

import { ObjectId } from "mongodb";
import { ApplicationError } from "../../error-handler/applicationError.js";

// creating model from schema.
const DoctorModel = mongoose.model("Doctor", doctorSchema);

export default class DoctorRepository {
  async registration(doctor) {
    try {
      const newDoctor = new DoctorModel(doctor);
      await newDoctor.save();
      return newDoctor;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async login(email, password) {
    try {
      return await DoctorModel.findOne({ email, password });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async findByEmail(email) {
    try {
      return await DoctorModel.findOne({ email });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
}
