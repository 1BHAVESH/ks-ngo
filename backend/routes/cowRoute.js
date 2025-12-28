import express from "express";
import { uploadCow } from "../config/multer/cowMulter.js";
import { createCow, deleteCow, getAllCows, updateCow } from "../controller/cowImageController.js";

const router = express.Router();

router.post(
  "/create-cow-image",
  uploadCow.single("image"),
  createCow
);

router.put(
  "/update/:id",
  uploadCow.single("image"),
  updateCow
);

router.get("/all", getAllCows);

router.delete("/cow/:id", deleteCow);

export default router;
