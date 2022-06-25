const express = require("express");
const homeRoute = require("./routes/home");
const authRoute = require("./routes/auth");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
app.use(express.json());

// Database connectivity
mongoose
	.connect(process.env.MONGO_URL)
	.then(() => {
		console.log("Database connection successfully....");
	})
	.catch((err) => {
		console.log(err);
	});

// All routers are here
app.use("/", homeRoute);
app.use("/api", authRoute);

// Server listening
const Port = process.env.PORT || 5000;
app.listen(Port, () => {
	console.log(`Backend is running on port no. ${Port}`);
});
