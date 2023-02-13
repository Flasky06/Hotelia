import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

// Import routes
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";

const app = express();
dotenv.config();

// MONGO  DB CONNECTION
const connect = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URL);
		console.log("connected to mongodb");
	} catch (error) {
		throw error;
	}
};
mongoose.connection.on("disconnected", () => {
	console.log("Mongodb disconnected");
});

// middleware
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err, req, res, next) => {
	const errorStatus = err.status || 500;
	const errorMessage = err.Message || "Something went wrong";

	return res.status(errorStatus).json({
		success: false,
		status: errorStatus,
		Message: errorMessage,
		stack: err.stack,
	});
});

app.listen(process.env.PORT, () => {
	connect();
	console.log("connected to backend");
});
