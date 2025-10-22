const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

// GET /me endpoint
app.get("/me", async (req, res) => {
  try {
    // Fetch cat fact dynamically on every request
    const response = await axios.get("https://catfact.ninja/fact", {
      timeout: 5000,
    });
    const catFact = response.data.fact || "No fact available right now.";

    // Construct response
    const data = {
      status: "success",
      user: {
        email: "youremail@example.com", // 🔹 Replace with your real email
        name: "Your Full Name", // 🔹 Replace with your real name
        stack: "Node.js/Express",
      },
      timestamp: new Date().toISOString(), // ISO 8601 format
      fact: catFact,
    };

    res.status(200).json(data); // ✅ Sends JSON with correct Content-Type
  } catch (error) {
    // Handle if Cat Facts API fails
    res.status(200).json({
      status: "success",
      user: {
        email: "youremail@example.com",
        name: "Your Full Name",
        stack: "Node.js/Express",
      },
      timestamp: new Date().toISOString(),
      fact: "Could not fetch cat fact at the moment. Try again later.",
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}/me`)
);
