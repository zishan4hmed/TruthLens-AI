/* ==========================================
   TruthLens AI
   Analysis Routes
========================================== */

const express = require("express");

const router = express.Router();

const {

    analyzeNewsController,

    getAnalysisHistory,

    deleteAnalysis

} = require("../controllers/analysisController");

const {

    protect

} = require("../middleware/authMiddleware");

/* ==========================================
   Protected Routes
========================================== */

/*
    POST /api/analyze
*/

router.post(

    "/",

    protect,

    analyzeNewsController

);

/*
    GET /api/analyze/history
*/

router.get(

    "/history",

    protect,

    getAnalysisHistory

);

/*
    DELETE /api/analyze/:id
*/

router.delete(

    "/:id",

    protect,

    deleteAnalysis

);

/* ==========================================
   Export Router
========================================== */

module.exports = router;