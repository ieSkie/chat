import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
console.log("KEY:", process.env.GEMINI_API_KEY);
console.log("MODEL:", process.env.MODEL);
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "resopnse" });
});

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${process.env.MODEL}:generateContent`;
  try {
    const requestBody = {
      contents: [
        {
          role: "user",
          parts: [{ text: message }],
        },
      ],
    };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": process.env.GEMINI_API_KEY,
      },
      body: JSON.stringify(requestBody),
    });
    const data = await response.json();
    console.log(data);
    const reply = data.candidates[0].content.parts[0].text;
    res.json({ reply });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running in localhost:${port}`);
});
