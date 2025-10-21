const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/me", async (req, res) => {
  try {
    // Fetch a new cat fact dynamically every request
    const response = await axios.get("https://catfact.ninja/fact", {
      timeout: 5000,
    });
    const catFact = response.data.fact || "No fact available at the moment.";

    // Build JSON response exactly as required
    const data = {
      status: "success",
      user: {
        email: "Oyeniranoluwaseyiamos@gmail.com", // <-- Replace with your email
        name: "Oluwaseyi Oyeniran", // <-- Replace with your full name
        stack: "Node.js/Express",
      },
      timestamp: new Date().toISOString(), // ISO 8601 format
      fact: catFact,
    };

    res.status(200).json(data); // Content-Type: application/json
  } catch (error) {
    // Fallback if Cat Facts API fails
    const data = {
      status: "success",
      user: {
        email: "Oyeniranoluwaseyiamos@gmail.com",
        name: "Oluwaseyi Oyeniran",
        stack: "Node.js/Express",
      },
      timestamp: new Date().toISOString(),
      fact: "Could not fetch cat fact at this time.",
    };
    res.status(200).json(data);
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}/me`);
});
