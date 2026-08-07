/* ==========================================
   TruthLens AI
   Analysis Controller
========================================== */

const Analysis = require("../models/Analysis");
const User = require("../models/User");

const {
    analyzeNewsWithGroq
} = require("../services/groqService");

/* ==========================================
   Analyze News
========================================== */

const analyzeNewsController = async (req, res) => {

    try {

        const {

            newsText,

            sourceUrl

        } = req.body;

        /* Validation */

        if (!newsText) {

            return res.status(400).json({

                success: false,

                message: "News text is required."

            });

        }

        if (newsText.trim().length < 20) {

            return res.status(400).json({

                success: false,

                message: "Please enter a longer news article."

            });

        }

        /* AI Analysis */

        /* AI Analysis */

        const aiResult = await analyzeNewsWithGroq(newsText);
                /* Save Analysis */

        const analysis = await Analysis.create({

            user: req.user._id,

            newsText,

            sourceUrl: sourceUrl || "",

            prediction: aiResult.prediction,

            confidence: aiResult.confidence,

            riskLevel:
                aiResult.confidence >= 80
                    ? "Low"
                    : aiResult.confidence >= 50
                    ? "Medium"
                    : "High",

            aiExplanation: aiResult.explanation,

            summary: aiResult.summary,

            keywords: [],

            sentiment: "Neutral",

            category: "Other",

            aiModel: "Groq Llama 3.3 70B",

            processingTime: 0,

            language: "English"

        });

        /* Update User Statistics */

        await User.findByIdAndUpdate(

            req.user._id,

            {

                $inc: {

                    analysesCount: 1

                }

            }

        );

        /* Success Response */

/* Success Response */

return res.status(200).json({

    success: true,

    message: "News analyzed successfully.",

    analysis

});

} catch (error) {

    console.error("Analysis Error:");
    console.error(error);

    return res.status(500).json({

        success: false,

        message: error.message

    });

}

};  

/* ==========================================
   Get User Analysis History
========================================== */

const getAnalysisHistory = async (req, res) => {

    try {

        const analyses = await Analysis.find({

            user: req.user._id

        })

        .sort({

            createdAt: -1

        });

        return res.status(200).json({

            success: true,

            total: analyses.length,

            analyses

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Failed to fetch analysis history."

        });

    }

};
/* ==========================================
   Delete Analysis
========================================== */

const deleteAnalysis = async (req, res) => {

    try {

        const analysis = await Analysis.findOne({

            _id: req.params.id,

            user: req.user._id

        });

        if (!analysis) {

            return res.status(404).json({

                success: false,

                message: "Analysis not found."

            });

        }

        await analysis.deleteOne();

        await User.findByIdAndUpdate(

            req.user._id,

            {

                $inc: {

                    analysesCount: -1

                }

            }

        );

        return res.status(200).json({

            success: true,

            message: "Analysis deleted successfully."

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Failed to delete analysis."

        });

    }

};

/* ==========================================
   Export Controllers
========================================== */

module.exports = {

    analyzeNewsController,

    getAnalysisHistory,

    deleteAnalysis

};