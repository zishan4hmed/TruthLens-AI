/* ==========================================
   TruthLens AI Backend
   server.js
========================================== */

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const connectDB = require("./config/db");

/* ==========================================
   Routes
========================================== */

const authRoutes = require("./routes/authRoutes");
const analysisRoutes = require("./routes/analysisRoutes");

const app = express();

/* ==========================================
   Connect Database
========================================== */

connectDB();

/* ==========================================
   Middleware
========================================== */

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

/* ==========================================
   API Routes
========================================== */

app.use("/api/auth", authRoutes);
app.use("/api/analyze", analysisRoutes);

/* ==========================================
   API Health Check
========================================== */

app.get("/", (req, res) => {

    res.status(200).json({

        success: true,

        application: "TruthLens AI",

        version: "1.0.0",

        message: "Backend is running successfully 🚀",

        timestamp: new Date()

    });

});

/* ==========================================
   API Status
========================================== */

app.get("/api/status", (req, res) => {

    res.json({

        success: true,

        status: "ONLINE",

        database: "Connected",

        environment: process.env.NODE_ENV || "development"

    });

});

/* ==========================================
   404 Handler
========================================== */

app.use((req, res) => {

    res.status(404).json({

        success: false,

        message: "Route not found."

    });

});

/* ==========================================
   Global Error Handler
========================================== */

app.use((err, req, res, next) => {

    console.error(err);

    res.status(500).json({

        success: false,

        message: "Internal Server Error"

    });

});

/* ==========================================
   Start Server
========================================== */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log("");

    console.log("================================");

    console.log("🚀 TruthLens AI Backend Started");

    console.log(`🚀 Server running on port ${PORT}`);

    console.log("================================");

});