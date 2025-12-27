import { Gallery } from "../models/Gallery.js";


export const createCow = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        message: "Image is required"
      });
    }

    const cow = await Gallery.create({
      title: req.body.title,
      image: `/uploads/cows/${req.file.filename}`,
      displayOrder: req.body.displayOrder
    });

    res.status(201).json({
      success: true,
      data: cow
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const getAllCows = async (req, res) => {
  try {
    const cows = await Gallery.find().sort({ createdAt: -1 }); // latest first

    res.status(200).json({
      success: true,
      data: cows,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};