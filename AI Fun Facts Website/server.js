
const express = require("express");
const dotenv = require("dotenv");
const { GoogleGenAI } = require("@google/genai");

dotenv.config();

const app = express();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

// Serve the website files
app.use(express.static("public"));

// Generate an AI fun fact
app.get("/fun-fact", async (req, res) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3.8-flash",
            contents: "Tell me one surprising, accurate, interesting fun fact in simple English. Keep it short."
        });

        res.json({
            success: true,
            funFact: response.text
        });

    } catch (error) {
        console.error("Gemini error:", error);
        res.status(500).json({
            success: false,
            error: "Unable to generate a fun fact. Please try again."
        });
    }
});

// Start server
app.listen(3003, () => {
    console.log("AI Fun Facts Website running at http://localhost:3003");
});
