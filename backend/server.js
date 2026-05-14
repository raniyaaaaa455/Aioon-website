require('dotenv').config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const apiKey = process.env.BREVO_API_KEY;

app.get("/", (req, res) => {
  res.send("Backend running successfully");
});

app.post("/api/contact", async (req, res) => {
  const { name, email, phone, company, message } = req.body;

  try {
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: { email: "info@aioon.sa", name: "Aioon Website" },
        to: [{ email: "info@aioon.sa", name: "Aioon Admin" }],
        replyTo: { email, name },
        subject: `New Contact Message from ${name}`,
        htmlContent: `
          <h3>New Contact Message</h3>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Phone:</b> ${phone}</p>
          <p><b>Company:</b> ${company}</p>
          <p><b>Message:</b></p>
          <p>${message}</p>
        `,
      },
      {
        headers: {
          "api-key": apiKey,
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }
    );

    res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });

  } catch (error) {
    console.error("Mail Error:", error.response?.data || error.message);

    res.status(500).json({
      success: false,
      message: "Mail sending failed",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});