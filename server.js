import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());

app.get("/", (req, res) => {
  res.send("MetalRate backend running");
});

// Common headers to mimic browser
const headers = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
  "Accept": "application/json"
};

// -------- GOLD (USD / OUNCE) --------
app.get("/api/gold", async (req, res) => {
  try {
    const response = await fetch(
      "https://query1.finance.yahoo.com/v7/finance/quote?symbols=XAUUSD=X",
      { headers }
    );

    const data = await response.json();

    const price = data?.quoteResponse?.result?.[0]?.regularMarketPrice;

    if (!price) throw new Error("No gold price");

    res.json({ metal: "XAU", price });
  } catch (err) {
    console.error("Gold error:", err.message);
    res.status(500).json({ error: "Gold fetch failed" });
  }
});

// -------- SILVER (USD / OUNCE) --------
app.get("/api/silver", async (req, res) => {
  try {
    const response = await fetch(
      "https://query1.finance.yahoo.com/v7/finance/quote?symbols=XAGUSD=X",
      { headers }
    );

    const data = await response.json();

    const price = data?.quoteResponse?.result?.[0]?.regularMarketPrice;

    if (!price) throw new Error("No silver price");

    res.json({ metal: "XAG", price });
  } catch (err) {
    console.error("Silver error:", err.message);
    res.status(500).json({ error: "Silver fetch failed" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
