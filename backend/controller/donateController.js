import { Donation } from "../models/Donate.js";

export const createDonation = async (req, res) => {
  try {
    const {
      donorName,
      email,
      phone,
      amount,
      paymentMethod,
    } = req.body;

    console.log("-----------",req.body)

    // Check screenshot file
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Payment screenshot is required",
      });
    }

    const donation = await Donation.create({
      donorName,
      email,
      phone,
      amount,
      paymentMethod,
      paymentScreenshot: `/screenshots/${req.file.filename}`,
    });

    return res.status(201).json({
      success: true,
      message: "Donation submitted successfully",
      donation,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: donations.length,
      donations,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}