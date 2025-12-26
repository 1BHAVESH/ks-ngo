import express from "express";
import { enquirySubmit, deleteEnquiry, getAllEnqury } from "../controller/Enquiry.js";

const router = express.Router();

router.post("/send-enquiry", enquirySubmit);
router.get("/", getAllEnqury)
router.delete("/:id", deleteEnquiry)

export default router;
