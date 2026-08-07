/* ==========================================
   TruthLens AI
   Authentication Middleware
========================================== */

const jwt = require("jsonwebtoken");
const User = require("../models/User");

/* ==========================================
   Protect Routes
========================================== */

const protect = async (req, res, next) => {

    try {

        let token;

        /* Check Authorization Header */

        if (

            req.headers.authorization &&

            req.headers.authorization.startsWith("Bearer")

        ) {

            token = req.headers.authorization.split(" ")[1];

        }

        /* No Token */

        if (!token) {

            return res.status(401).json({

                success: false,

                message: "Access denied. No token provided."

            });

        }

        /* Verify Token */

        const decoded = jwt.verify(

            token,

            process.env.JWT_SECRET

        );

        /* Find User */

        const user = await User.findById(decoded.id);

        if (!user) {

            return res.status(401).json({

                success: false,

                message: "User not found."

            });

        }

        if (!user.isActive) {

            return res.status(403).json({

                success: false,

                message: "Your account has been disabled."

            });

        }

        req.user = user;

        next();

    } catch (error) {

        console.error(error);
                return res.status(401).json({

            success: false,

            message: "Invalid or expired token."

        });

    }

};

/* ==========================================
   Admin Only Middleware
========================================== */

const adminOnly = (req, res, next) => {

    if (!req.user) {

        return res.status(401).json({

            success: false,

            message: "Unauthorized."

        });

    }

    if (req.user.role !== "admin") {

        return res.status(403).json({

            success: false,

            message: "Access denied. Admins only."

        });

    }

    next();

};

/* ==========================================
   Export Middleware
========================================== */

module.exports = {

    protect,

    adminOnly

};