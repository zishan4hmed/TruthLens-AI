/* ==========================================
   TruthLens AI
   JWT Token Generator
========================================== */

const jwt = require("jsonwebtoken");

/* ==========================================
   Generate JWT
========================================== */

const generateToken = (userId) => {

    return jwt.sign(

        {
            id: userId
        },

        process.env.JWT_SECRET,

        {
            expiresIn: "7d"
        }

    );

};

module.exports = generateToken;