import express from "express";
import { uploadCow } from "../config/multer/cowMulter.js";
import { createCow, getAllCows } from "../controller/cowImageController.js";

const router = express.Router();

router.post(
  "/create-cow",
  uploadCow.single("image"),
  createCow
);

router.get("/all", getAllCows);

export default router;
