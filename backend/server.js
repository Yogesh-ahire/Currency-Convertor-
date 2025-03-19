const express = require("express");
const http = require("http");
const connectDB = require("./config/db"); // ✅ Use imported DB connection
const authRoutes = require("./routes/authRoutes");
const documentRoutes = require("./routes/documentRoutes");
const WebSocket = require("ws");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);

// Create HTTP server
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let document = ""; // Store document content

wss.on("connection", (ws) => {
    console.log("✅ New client connected");

    // Send current document state to new clients
    ws.send(JSON.stringify({ type: "init", data: document }));

    ws.on("message", (message) => {
        try {
            const parsedMessage = JSON.parse(message);
            if (parsedMessage.type === "update") {
                document = parsedMessage.data;
                
                // Broadcast update to all clients
                wss.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) { // ✅ Fixed condition
                        client.send(JSON.stringify({ type: "update", data: document }));
                    }
                });
            }
        } catch (error) {
            console.error("❌ Error parsing message:", error);
        }
    });

    ws.on("close", () => {
        console.log("❌ Client disconnected");
    });
});

app.get("/", (req, res) => {
    res.send("API is running...");
});

// ✅ Ensure MongoDB is connected BEFORE starting server
connectDB()
    .then(() => {
        const PORT = process.env.PORT || 5000;
        server.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("❌ MongoDB Connection Failed:", error);
        process.exit(1);
    });
