import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    donorName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 10,
    },

    amount: {
      type: Number,
      required: true,
      min: 1,
    },

    paymentMethod: {
      type: String,
      enum: ["UPI", "Bank Transfer", "Card", "Other"],
      default: "UPI",
    },

    paymentScreenshot: {
      type: String,   
      required: true,
    },

  },

  { timestamps: true }
);

export const Donation =  mongoose.model("Donation", donationSchema);
