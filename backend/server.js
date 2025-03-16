const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

const documentRoutes = require("./routes/documentRoutes");
app.use("/api/documents", documentRoutes);


// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());  // Middleware to parse JSON
app.use(cors());  // Enable Cross-Origin Requests

// Database Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("Error Connecting to MongoDB:", error);
        process.exit(1);
    }
};
connectDB();

// Basic Route
app.get("/", (req, res) => {
    res.send("API is running...");
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
