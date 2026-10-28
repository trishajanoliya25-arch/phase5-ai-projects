
const express = require("express");
const dotenv = require("dotenv");
const { GoogleGenAI } = require("@google/genai");

dotenv.config();

const app = express();

app.use(express.static("public"));

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function getAIResponse(prompt) {
    const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt
    });

    return response.text;
}

// Route 1: Generate a joke
app.get("/joke", async (req, res) => {
    try {
        const joke = await getAIResponse(
            "Tell me one short, funny, family-friendly joke."
        );

        res.json({ joke: joke });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to generate joke" });
    }
});

// Route 2: Generate motivation
app.get("/motivation", async (req, res) => {
    try {
        const motivation = await getAIResponse(
            "Write one short, inspiring motivational message."
        );

        res.json({ motivation: motivation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to generate motivation" });
    }
});

// Route 3: Generate a daily tip
app.get("/tip-of-the-day", async (req, res) => {
    try {
        const tip = await getAIResponse(
            "Give one practical, useful tip for everyday life."
        );

        res.json({ tip: tip });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to generate daily tip" });
    }
});


// Start the server on port 3002
app.listen(3002, () => {
    console.log("AI Helper Bot running at http://localhost:3002");
});
