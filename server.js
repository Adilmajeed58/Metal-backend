import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("MetalRate backend running");
});

// -------- GOLD (USD / OUNCE) --------
app.get("/api/gold", async (req, res) => {
  try {
    const response = await fetch("https://stooq.com/q/l/?s=xauusd&i=d");
    const text = await response.text();

    const lines = text.trim().split("\n");
    const values = lines[1].split(",");
    const price = parseFloat(values[4]); // Close price

    if (!price) throw new Error("Invalid gold price");

    res.json({ metal: "XAU", price });
  } catch (err) {
    console.error("Gold error:", err.message);
    res.status(500).json({ error: "Gold fetch failed" });
  }
});

// -------- SILVER (USD / OUNCE) --------
app.get("/api/silver", async (req, res) => {
  try {
    const response = await fetch("https://stooq.com/q/l/?s=xagusd&i=d");
    const text = await response.text();

    const lines = text.trim().split("\n");
    const values = lines[1].split(",");
    const price = parseFloat(values[4]);

    if (!price) throw new Error("Invalid silver price");

    res.json({ metal: "XAG", price });
  } catch (err) {
    console.error("Silver error:", err.message);
    res.status(500).json({ error: "Silver fetch failed" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});
