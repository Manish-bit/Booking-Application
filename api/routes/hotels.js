import express from "express";
import Hotel from "../models/Hotel.js";

const router = express.Router();

//CREATE
router.post("/", async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    // res.status(500).json(error);
    next(error);
  }
});

//UPDATE
router.put("/:id", async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    // res.status(500).json(error);
    next(error);
  }
});

//DELETE
router.delete("/:id", async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel deleted successfully");
  } catch (error) {
    // res.status(500).json(error);
    next(error);
  }
});

//GET HOTEL
router.get("/:id", async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    // res.status(500).json(error);
    next(error);
  }
});

//GET ALL HOTEL

router.get("/", async (req, res, next) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    // res.status(500).json(error);
    next(error);
  }
});

export default router;
