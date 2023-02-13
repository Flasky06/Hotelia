import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

export const createRoom = async (req, res, next) => {
	const hotelId = req.params.hotelId;
	const newRoom = new Room(req.body);

	try {
		const savedRoom = await newRoom.save();
		try {
			await Hotel.findByIdAndUpdate(hotelId, { $push: savedRoom._id });
		} catch (err) {
			next(err);
		}
		res.status(200).json(savedRoom);
	} catch (err) {
		next(err);
	}
};

export const UpdateRoom = async (req, res) => {
	try {
		const updatedRoom = await Room.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		);
		res.status(200).json(updatedRoom);
	} catch (error) {
		next(err);
	}
};

export const deleteRoom = async (req, res) => {
	try {
		await Room.findOneAndDelete(req.params.id);

		res.status(200).json("Room has been deleted");
	} catch (error) {
		next(err);
	}
};

export const getRoom = async (req, res) => {
	try {
		const room = await Room.findById(req.params.id);

		res.status(200).json(room);
	} catch (error) {
		next(err);
	}
};

export const getRooms = async (req, res, next) => {
	try {
		const rooms = await Room.find();
		res.status(200).json(rooms);
	} catch (err) {
		next(err);
	}
};
