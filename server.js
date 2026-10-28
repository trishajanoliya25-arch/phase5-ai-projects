require("dotenv").config();
const express = require("express");

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.get("/health", (req, res) => {
  res.json({
    status: "Server is running"
  });
});

app.post("/ask", async (req, res) => {
  try {
    const question = req.body.question;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: question }]
            }
          ]
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error?.message || "Gemini API error"
      });
    }

    const answer =
      data.candidates?.[0]?.content?.parts?.[0]?.text;

    res.json({ answer });

  } catch (error) {
    res.status(500).json({
      error: "Server error"
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});