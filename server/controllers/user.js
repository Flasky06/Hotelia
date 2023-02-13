import User from "../models/User.js";
import { createError } from "../utils/error.js";

export const createUser = async (req, res, next) => {
	const newHotel = new User(req.body);

	try {
		const savedHotel = await newHotel.save();
		res.status(200).json(savedHotel);
	} catch (error) {
		next(error);
	}
};

export const updateUser = async (req, res) => {
	try {
		const updatedUser = await User.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		);
		res.status(200).json(updatedUser);
	} catch (error) {
		next(err);
	}
};

export const deleteUser = async (req, res) => {
	try {
		await User.findOneAndDelete(req.params.id);

		res.status(200).json("User has been deleted");
	} catch (error) {
		next(err);
	}
};

export const getUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);

		res.status(200).json(user);
	} catch (error) {
		next(err);
	}
};

export const getUsers = async (req, res, next) => {
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch (err) {
		next(err);
	}
};
