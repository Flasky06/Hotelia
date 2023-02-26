import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import { createError } from "../utils/error.js";

export const createHotel = async (req, res, next) => {
	const newHotel = new Hotel(req.body);

	try {
		const savedHotel = await newHotel.save();
		res.status(200).json(savedHotel);
	} catch (error) {
		next(error);
	}
};

export const updateHotel = async (req, res, next) => {
	try {
		const updatedHotel = await Hotel.findByIdAndUpdate(
			req.params.id,
			{ $set: req.body },
			{ new: true }
		);
		res.status(200).json(updatedHotel);
	} catch (error) {
		next(err);
	}
};

export const deleteHotel = async (req, res, next) => {
	try {
		await Hotel.findByIdAndDelete(req.params.id);

		res.status(200).json("Hotel has been deleted");
	} catch (error) {
		next(err);
	}
};

export const getHotel = async (req, res) => {
	try {
		const hotel = await Hotel.findById(req.params.id);

		res.status(200).json(hotel);
	} catch (error) {
		next(err);
	}
};

export const getHotels = async (req, res, next) => {
	try {
		const hotels = await Hotel.find(req.query);
		res.status(200).json(hotels);
	} catch (err) {
		next(err);
	}
};

export const countByCity = async (req, res, next) => {
	const cities = req.query.cities.split(",");
	try {
		const list = await Promise.all(
			cities.map((city) => {
				return Hotel.countDocuments({ city: city });
			})
		);
		res.status(200).json(list);
	} catch (err) {
		next(err);
	}
};

export const countByType = async (req, res, next) => {
	try {
		const hotelCount = await Hotel.countDocuments({ type: "hotel" });
		const apartmentCount = await Hotel.countDocuments({ type: "apartments" });
		const resortCount = await Hotel.countDocuments({ type: "resort" });
		const villasCount = await Hotel.countDocuments({ type: "villas" });
		const cabinCount = await Hotel.countDocuments({ type: "fastfood" });

		res.status(200).json([
			{ type: "hotel", count: hotelCount },
			{ type: "apartments", count: apartmentCount },
			{ type: "resort", count: resortCount },
			{ type: "villas", count: villasCount },
			{ type: "fastfood", count: cabinCount },
		]);
	} catch (err) {
		next(err);
	}
};
