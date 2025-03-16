require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Check if MONGO_URI is defined
if (!process.env.MONGO_URI) {
    console.error("ERROR: MONGO_URI is undefined");
    process.exit(1);
}

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected Successfully"))
    .catch((err) => console.error("MongoDB Connection Error:", err));

app.listen(5000, () => console.log("Server running on port 5000"));
