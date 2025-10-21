// Import dependencies
const express = require("express");
const axios = require("axios");
const cors = require("cors");

// Create an Express app
const app = express();

// Enable CORS (optional but recommended)
app.use(cors());

// Create a GET endpoint at /me
app.get("/me", async (req, res) => {
  try {
    // Fetch a random cat fact from the Cat Facts API
    const catResponse = await axios.get("https://wronglink.ninja/fact", {
      timeout: 5000,
    });
    const catFact = catResponse.data.fact;

    // Build the response
    const data = {
      status: "success",
      user: {
        email: "youremail@example.com",
        name: "Your Full Name",
        stack: "Node.js/Express",
      },
      timestamp: new Date().toISOString(),
      fact: catFact,
    };

    // Send JSON response
    res.status(200).json(data);
  } catch (error) {
    // Handle errors (e.g., Cat Facts API down)
    const data = {
      status: "success",
      user: {
        email: "youremail@example.com",
        name: "Your Full Name",
        stack: "Node.js/Express",
      },
      timestamp: new Date().toISOString(),
      fact: "Could not fetch cat fact at this time.",
    };

    res.status(200).json(data);
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}/me`);
});
