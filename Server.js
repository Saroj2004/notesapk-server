const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Routers
const authRouter = require("./routes/auth");
const notesRouter = require("./routes/notesRouter");

const app = express();

// Middleware


app.use(cors({
  origin: [
    "http://localhost:3000", // for local testing
    "https://notesapk-client-dhx4.vercel.app" // your Vercel URL
  ],
  credentials: true
}));
// Routes
app.use("/api/auth", authRouter);
app.use("/api/notes", notesRouter);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
