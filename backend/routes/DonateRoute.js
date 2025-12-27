import express from "express";
import { upload } from "../config/multer/multer.js";
import { createDonation, getAllDonations } from "../controller/donateController.js";


const router = express.Router();

router.post(
  "/donate-send",
  upload.single("paymentScreenshot"),
  createDonation
);

router.get(
  "/get-all-donation",
  getAllDonations
)

export default router;
