require("dotenv").config();

console.log("URI:  " ,process.env.MONGO_URI);

const express = require("express");
const mongoose = require("mongoose");

const app = express();

if (!process.env.MONGO_URI) {
  console.error("❌ ERROR: MONGO_URI is undefined. Check your .env file.");
  process.exit(1);  // Stop the server if MONGO_URI is missing
}

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

app.listen(5000, () => console.log("Server running on port 5000"));
