import express from "express";
import {
  createRoom,
  deleteRoom,
  getAllRooms,
  getRoom,
  updateRoom,
} from "../controllers/roomController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/:id", verifyAdmin, createRoom);
router.put("/:id", verifyAdmin, updateRoom);
router.delete("/:id", verifyAdmin, deleteRoom);
router.get("/:id", verifyAdmin, getRoom);
router.get("/", getAllRooms);
export default router;
