import { Donation } from "../models/Donate.js";


import XLSX from "xlsx";
import * as yup from "yup";
import fs from "fs";
import path from "path";


// helper → Excel column letter
const getNameFromNumber = (num) => {
  let str = "";
  while (num > 0) {
    let rem = (num - 1) % 26;
    str = String.fromCharCode(65 + rem) + str;
    num = Math.floor((num - 1) / 26);
  }
  return str;
};


export const importExcelDonations = async (req, res) => {
  try {
    console.log("REQ FILE =", req.file);

    if (!req.file.path)
      throw new Error("Please upload '.xlsx' file..!!");

    if (
      req.file.mimetype !==
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      throw new Error("Please upload '.xlsx' file only..!!");
    }

    // ========= READ FILE =========
    const workbook = XLSX.readFile(req.file.path);

    let exportData = [];
    let errorsCount = 0;

    // ========= VALIDATION SCHEMA =========
    const validationSchema = yup.object().shape({
      Donor: yup
        .string()
        .trim()
        .min(2)
        .max(100)
        .required("Donor name is required"),

      Email: yup
        .string()
        .email("Invalid email")
        .required("Email is required"),

      Phone: yup
        .string()
        .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
        .required("Phone number required"),

      Amount: yup
        .number()
        .typeError("Amount must be a number")
        .positive("Amount must be greater than 0")
        .required("Amount required"),

      Method: yup
        .string()
        .oneOf(["UPI", "Bank Transfer", "Cash"], "Invalid payment method")
        .required("Payment Method required"),

        // photo: yup
        // .string()
        // .oneOf(["UPI", "Bank Transfer", "Cash"], "Invalid payment method")
        // .required("Payment Proof required"),

      Message: yup.string().optional(),
    });

    // ========= LOOP ALL SHEETS =========
    for (let i = 0; i < workbook.SheetNames.length; i++) {
      const rows = XLSX.utils.sheet_to_json(
        workbook.Sheets[workbook.SheetNames[i]]
      );

      for (let row of rows) {
        try {
          await validationSchema.validate(row, { abortEarly: false });

          exportData.push({
            donorName: row.Donor.trim(),
            email: row.Email.toLowerCase().trim(),
            phone: row.Phone.trim(),
            amount: Number(row.Amount),
            paymentMethod: row.Method.trim(),
            // photo: row.photo.trim(),
            message: row.Message?.trim() || "Imported from Excel",
            error: null,
          });

        } catch (err) {
          errorsCount++;

          exportData.push({
            ...row,
            error: err.inner?.reduce((acc, e) => {
              acc[e.path] = e.message;
              return acc;
            }, {}),
          });
        }
      }
    }

    // ========= RESULT SHEET =========
    const worksheet = XLSX.utils.json_to_sheet(exportData);

    // ========= COMMENT ERRORS =========
    exportData.forEach((row, i) => {
      const { error } = row;

      ["Donor", "Email", "Phone", "Amount", "Method"].forEach((key, j) => {
        if (error?.[key]) {
          const col = getNameFromNumber(j + 1);
          const cell = `${col}${i + 2}`;

          if (!worksheet[cell]) worksheet[cell] = { t: "s", v: "" };

          worksheet[cell].c = [{ t: `${key}: ${error[key]}`, hidden: true }];
        }
      });
    });

    const resultWb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(resultWb, worksheet, "Donations");

    // ========= FILE PATH =========
    const filePath = `uploads/import-errors/donations-${req.file.originalname}`;

    const dir = path.join(process.cwd(), "public/uploads/import-errors");

    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    XLSX.writeFile(resultWb, "./public/" + filePath);

    // ========= IF ERRORS FOUND =========
    if (errorsCount > 0) {
      return res.status(422).json({
        success: false,
        message: "Invalid Data Provided",
        download: process.env.BASE_URL + "/" + filePath,
      });
    }

    // ========= SAVE TO DATABASE =========
    await Donation.deleteMany(); // remove old imported data

    await Donation.insertMany(
      exportData.map((e) => {
        const { error, ...d } = e;
        return d;
      })
    );

    return res.json({
      success: true,
      message: "Donations Imported Successfully",
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }
};


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