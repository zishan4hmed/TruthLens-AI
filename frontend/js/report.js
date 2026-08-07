"use strict";

/* ==========================================
   TruthLens AI
   Premium Report Modal
========================================== */


/* ==========================================
   Load Report Modal
========================================== */

async function loadReportModal(){

    const container =
        document.getElementById(
            "reportModalContainer"
        );

    if(!container){

        console.warn(
            "reportModalContainer not found."
        );

        return;

    }

    try{

        const response =
            await fetch(
                "components/reportModal.html"
            );

        if(!response.ok){

            throw new Error(
                "Unable to load report modal."
            );

        }

        container.innerHTML =
            await response.text();

        console.log(
            "Report modal loaded successfully."
        );

    }

    catch(error){

        console.error(
            "Report Modal Error:",
            error
        );

    }

}


/* ==========================================
   Open Report
========================================== */

function openReportModal(result){

    const modal =
        document.getElementById(
            "reportModal"
        );

    if(!modal){

        console.error(
            "Report modal not found."
        );

        return;

    }

    if(!result){

        console.error(
            "No analysis result provided."
        );

        return;

    }


    /* ==========================================
       Prediction
    ========================================== */

    const predictionBadge =
        document.getElementById(
            "predictionBadge"
        );

    if(predictionBadge){

        const prediction =
            result.prediction || "Unknown";

        predictionBadge.textContent =
            prediction.toUpperCase();

        predictionBadge.className =
            prediction.toLowerCase() === "real"
            ? "prediction-badge real"
            : "prediction-badge fake";

    }


    /* ==========================================
       Confidence
    ========================================== */

    const confidence =
        Number(result.confidence) || 0;

    const confidenceFill =
        document.getElementById(
            "confidenceFill"
        );

    const confidenceText =
        document.getElementById(
            "confidenceText"
        );


    if(confidenceFill){

        confidenceFill.style.width =
            "0%";

    }

    if(confidenceText){

        confidenceText.textContent =
            "0%";

    }


    setTimeout(()=>{

        if(confidenceFill){

            confidenceFill.style.width =
                confidence + "%";

        }

        if(confidenceText){

            confidenceText.textContent =
                confidence + "%";

        }

    },100);


    /* ==========================================
       Risk
    ========================================== */

    const riskLevel =
        document.getElementById(
            "riskLevel"
        );

    if(riskLevel){

        riskLevel.textContent =
            result.riskLevel ||
            "Not available";

    }


    /* ==========================================
       Category
    ========================================== */

    const category =
        document.getElementById(
            "category"
        );

    if(category){

        category.textContent =
            result.category ||
            "Other";

    }


    /* ==========================================
       Sentiment
    ========================================== */

    const sentiment =
        document.getElementById(
            "sentiment"
        );

    if(sentiment){

        sentiment.textContent =
            result.sentiment ||
            "Neutral";

    }


    /* ==========================================
       Summary
    ========================================== */

    const summary =
        document.getElementById(
            "summary"
        );

    if(summary){

        summary.textContent =
            result.summary ||
            "No summary available.";

    }


    /* ==========================================
       Explanation
    ========================================== */

    const explanation =
        document.getElementById(
            "explanation"
        );

    if(explanation){

        explanation.textContent =
            result.aiExplanation ||
            result.explanation ||
            "No explanation available.";

    }


    /* ==========================================
       Show Modal
    ========================================== */

    modal.classList.add(
        "active"
    );


    /* ==========================================
       Close Button
    ========================================== */

    const closeButton =
        document.getElementById(
            "closeReport"
        );

    if(closeButton){

        closeButton.onclick =
            closeReportModal;

    }

}


/* ==========================================
   Close Report
========================================== */

function closeReportModal(){

    const modal =
        document.getElementById(
            "reportModal"
        );

    if(modal){

        modal.classList.remove(
            "active"
        );

    }

}


/* ==========================================
   Escape Key
========================================== */

document.addEventListener(
    "keydown",
    (event)=>{

        if(event.key === "Escape"){

            closeReportModal();

        }

    }
);


/* ==========================================
   Load Component
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    loadReportModal
);

/* ==========================================
   Report Actions
========================================== */

function saveCurrentReport(){

    const result =
        window.currentAnalysisResult;

    if(!result){

        showToast(
            "No Report Available",
            "There is no report available to save.",
            "error"
        );

        return;

    }

    const report = {

        date: new Date().toLocaleString(),

        prediction:
            result.prediction || "Unknown",

        confidence:
            result.confidence || 0,

        riskLevel:
            result.riskLevel || "Not available",

        category:
            result.category || "Other",

        sentiment:
            result.sentiment || "Neutral",

        summary:
            result.summary || "",

        explanation:
            result.aiExplanation ||
            result.explanation ||
            ""

    };


    const reports =
        JSON.parse(
            localStorage.getItem(
                "truthlens_saved_reports"
            )
        ) || [];


    reports.unshift(report);


    localStorage.setItem(
        "truthlens_saved_reports",
        JSON.stringify(reports)
    );


    showToast(
        "Report Saved",
        "Your analysis report has been saved successfully.",
        "success"
    );

}


/* ==========================================
   Download Report
========================================== */

function downloadCurrentReport(){

    const result =
        window.currentAnalysisResult;

    if(!result){

        showToast(
            "No Report Available",
            "Please analyze some news first.",
            "error"
        );

        return;

    }


    const reportText = `

TRUTHLENS AI
AI ANALYSIS REPORT
==============================

Prediction:
${result.prediction || "Unknown"}

Confidence:
${result.confidence || 0}%

Risk Level:
${result.riskLevel || "Not available"}

Category:
${result.category || "Other"}

Sentiment:
${result.sentiment || "Neutral"}

------------------------------

SUMMARY

${result.summary || "No summary available."}

------------------------------

AI EXPLANATION

${result.aiExplanation ||
  result.explanation ||
  "No explanation available."}

------------------------------

Generated:
${new Date().toLocaleString()}

Generated by TruthLens AI
`;


    const blob =
        new Blob(
            [reportText],
            {type:"text/plain"}
        );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href = url;

    link.download =
        "TruthLens_AI_Report.txt";


    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);


    URL.revokeObjectURL(url);

}


/* ==========================================
   Attach Report Buttons
========================================== */

document.addEventListener(
    "click",
    (event)=>{

        if(
            event.target.closest(
                "#saveReportBtn"
            )
        ){

            saveCurrentReport();

        }


        if(
            event.target.closest(
                "#downloadReportBtn"
            )
        ){

            downloadCurrentReport();

        }

    }
);

/* ==========================================
   Global Access
========================================== */

window.openReportModal =
    openReportModal;

window.closeReportModal =
    closeReportModal;