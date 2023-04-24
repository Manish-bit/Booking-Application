import RoomModel from "../models/Room";
import HotelModel from "../models/Hotel";
import { createError } from "../utils/error";

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const room = new RoomModel(req.body);
  try {
    const savedRoom = await room.save();
    try {
      await HotelModel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (error) {
      next(createError(error));
    }
    res.status(200).json(savedRoom);
  } catch (error) {
    next(error);
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const roomId = req.params.id;
    const updatedRoom = await RoomModel.findByIdAndUpdate(
      roomId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (error) {
    next(error);
  }
};

export const deleteRoom = async (req, res, next) => {
  try {
    await RoomModel.findByIdAndDelete(req.params.id);
    res.status(200).json("User deleted sucessfully");
  } catch (error) {
    next(error);
  }
};

export const getRoom = async (req, res, next) => {
  try {
    const room = await RoomModel.findById(req.params.id);
    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

export const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await RoomModel.find();
    res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};
