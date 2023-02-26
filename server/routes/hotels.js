import express from "express";
import {
	createHotel,
	updateHotel,
	deleteHotel,
	getHotel,
	getHotels,
	countByCity,
	countByType,
} from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE
router.post("/", verifyAdmin, createHotel);

// UPDATE
router.put("/:id", verifyAdmin, updateHotel);

// DELETE
router.delete("/:id", verifyAdmin, deleteHotel);

// GET
router.get("/find/:id", getHotel);

// GET ALL
router.get("/", getHotels);

// GET HOTEL COUNT
router.get("/countByCity", countByCity);

//GET HOTEL COUNT BY TYPE
router.get("/countByType", countByType);

export default router;
