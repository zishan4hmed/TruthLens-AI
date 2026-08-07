/* ==========================================
   TruthLens AI
   Analysis Model
========================================== */

const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        newsText: {
            type: String,
            required: [true, "News text is required"],
            trim: true,
            minlength: 20
        },

        sourceUrl: {
            type: String,
            default: ""
        },

        prediction: {
            type: String,
            enum: ["Real", "Fake", "Uncertain"],
            required: true
        },

        confidence: {
            type: Number,
            required: true,
            min: 0,
            max: 100
        },

        riskLevel: {
            type: String,
            enum: ["Low", "Medium", "High"],
            default: "Low"
        },

        aiExplanation: {
            type: String,
            required: true
        },

        summary: {
            type: String,
            default: ""
        },

        keywords: [
            {
                type: String
            }
        ],

        sentiment: {
            type: String,
            enum: [
                "Positive",
                "Neutral",
                "Negative"
            ],
            default: "Neutral"
        },

        category: {
            type: String,
            enum: [
                "Politics",
                "Technology",
                "Health",
                "Business",
                "Sports",
                "Entertainment",
                "Education",
                "Science",
                "Other"
            ],
            default: "Other"
        },

        aiModel: {
            type: String,
            default: "Hugging Face"
        },

        processingTime: {
            type: Number,
            default: 0
        },

        language: {
            type: String,
            default: "English"
        },

        isSaved: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

/* ==========================================
   Indexes
========================================== */

analysisSchema.index({
    user: 1,
    createdAt: -1
});

analysisSchema.index({
    prediction: 1
});

analysisSchema.index({
    confidence: -1
});

module.exports = mongoose.model("Analysis", analysisSchema);