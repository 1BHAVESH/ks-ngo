import { BankDetail } from "../models/BankDetail.js";

export const createDonationDetails = async (req, res) => {
  try {
    const { accountName, accountNumber, ifscCode, bankName } = req.body;

    let qrCode = null;

    if (req.file) {
      qrCode = `/uploads/qr/${req.file.filename}`;
    }

    const donation = await BankDetail.create({
      accountName,
      accountNumber,
      ifscCode,
      bankName,
      qrCode,
    });

    res.status(201).json({
      success: true,
      data: donation,
    });
  } catch (error) {
    console.error("Create Error =", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const updateDonationDetails = async (req, res) => {
  try {
    const { id } = req.params;

    let updateData = { ...req.body };

    if (req.file) {
      updateData.qrCode = `/uploads/qr/${req.file.filename}`;
    }

    const updated = await BankDetail.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error("Update Error =", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getDonationDetails = async (req, res) => {
  try {
    const bank = await BankDetail.findOne({ isActive: true });

    if (!bank) {
      return res.status(404).json({
        success: false,
        message: "No active donation details found",
      });
    }

    res.status(200).json({
      success: true,
      data: donation,
    });
  } catch (error) {
    console.error("Get Donation Error =", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
