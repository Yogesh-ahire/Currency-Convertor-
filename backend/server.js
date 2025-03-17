const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

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
                    if (client.readyState === WebSocket.OPEN) { // ✅ Fixed typo
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

// Database Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1);
    }
};

connectDB().then(() => {
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
});
