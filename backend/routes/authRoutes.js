/* ==========================================
   TruthLens AI
   Authentication Routes
========================================== */

const express = require("express");

const router = express.Router();

const {

    registerUser,

    loginUser,

    getCurrentUser

} = require("../controllers/authController");

const {

    protect

} = require("../middleware/authMiddleware");

/* ==========================================
   Public Routes
========================================== */

/*
    POST /api/auth/register
*/

router.post(

    "/register",

    registerUser

);

/*
    POST /api/auth/login
*/

router.post(

    "/login",

    loginUser

);

/* ==========================================
   Protected Routes
========================================== */

/*
    GET /api/auth/me
*/

router.get(

    "/me",

    protect,

    getCurrentUser

);

/* ==========================================
   Export Router
========================================== */

module.exports = router;