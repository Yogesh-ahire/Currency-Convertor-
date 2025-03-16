const express = require("express");
const Document = require("../models/Document");

const router = express.Router();

// Get all documents
router.get("/", async (req, res) => {
    try {
        const documents = await Document.find();
        res.json(documents);
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
});

// Create a new document
router.post("/", async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ error: "Title and Content are required" });
    }

    try {
        const newDocument = new Document({ title, content });
        await newDocument.save();
        res.status(201).json(newDocument);
    } catch (error) {
        res.status(500).json({ error: "Failed to create document" });
    }
});

module.exports = router;
