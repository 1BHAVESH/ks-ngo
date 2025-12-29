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
