/* ==========================================
   TruthLens AI
   Authentication Controller
========================================== */

const User = require("../models/User");
const generateToken = require("../utils/generateToken");

/* ==========================================
   Register User
========================================== */

const registerUser = async (req, res) => {

    try {

        const {
            name,
            email,
            password
        } = req.body;

        /* Validation */

        if (!name || !email || !password) {

            return res.status(400).json({

                success: false,

                message: "Please fill all required fields."

            });

        }

        if (password.length < 6) {

            return res.status(400).json({

                success: false,

                message: "Password must be at least 6 characters."

            });

        }

        /* Check Existing User */

        const existingUser = await User.findOne({

            email

        });

        if (existingUser) {

            return res.status(409).json({

                success: false,

                message: "Email already registered."

            });

        }

        /* Create User */

        const user = await User.create({

            name,

            email,

            password

        });
                /* Generate JWT */

        const token = generateToken(user._id);

        /* Success Response */

        return res.status(201).json({

            success: true,

            message: "Account created successfully.",

            token,

            user

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Registration failed."

        });

    }

};

/* ==========================================
   Login User
========================================== */

const loginUser = async (req, res) => {

    try {

        const {

            email,

            password

        } = req.body;

        /* Validation */

        if (!email || !password) {

            return res.status(400).json({

                success: false,

                message: "Email and password are required."

            });

        }

        /* Find User */

        const user = await User.findOne({

            email

        }).select("+password");

        if (!user) {

            return res.status(401).json({

                success: false,

                message: "Invalid email or password."

            });

        }
                /* Compare Password */

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {

            return res.status(401).json({

                success: false,

                message: "Invalid email or password."

            });

        }

        /* Update Last Login */

        user.lastLogin = new Date();

        await user.save();

        /* Generate JWT */

        const token = generateToken(user._id);

        /* Remove Password */

        user.password = undefined;

        /* Success Response */

        return res.status(200).json({

            success: true,

            message: "Login successful.",

            token,

            user

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Login failed."

        });

    }

};

/* ==========================================
   Get Current User
========================================== */

const getCurrentUser = async (req, res) => {

    try {

        const user = await User.findById(req.user.id);

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found."

            });

        }

        return res.status(200).json({

            success: true,

            user

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Unable to fetch user."

        });

    }

};
/* ==========================================
   Export Controllers
========================================== */

module.exports = {

    registerUser,

    loginUser,

    getCurrentUser

};