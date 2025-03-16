const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

// Load environment variables **at the top**
dotenv.config();

// Initialize Express App **before using it**
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Import Routes **after defining app**
const documentRoutes = require("./routes/documentRoutes");

// Use Routes **after initializing app**
app.use("/api/documents", documentRoutes);

app.use("/api/auth", require("./routes/authRoutes"));

// Database Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
        console.error("❌ Error Connecting to MongoDB:", error);
        process.exit(1); // Exit process if DB connection fails
    }
};

// Connect to Database **before starting the server**
connectDB().then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
});

// Basic Route
app.get("/", (req, res) => {
    res.send("API is running...");
});
