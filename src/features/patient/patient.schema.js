import mongoose from "mongoose";

export const patientSchema = new mongoose.Schema(
  {
    phone: {
      type: Number,
      maxlength: 10,
    },
    name: {
      type: String,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },
  },
  {
    timestamps: true,
  }
);
