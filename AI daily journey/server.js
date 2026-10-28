
const express = require("express");
const dotenv = require("dotenv");
const { GoogleGenAI } = require("@google/genai");

dotenv.config();

const app = express();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

app.use(express.json());
app.use(express.static("public"));

app.post("/journal-prompt", async (req, res) => {
    try {
        const mood = req.body.mood;

        if (!mood) {
            return res.status(400).json({
                error: "Please enter your mood"
            });
        }

        const response = await ai.models.generateContent({
            model: "gemini-3.8-flash",
            contents: `Write a short, encouraging journal prompt for someone feeling ${mood}.`
        });

        res.json({
            prompt: response.text
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Unable to generate journal prompt"
        });
    }
});

app.listen(3001, () => {
    console.log("Server running at http://localhost:3001");
});
