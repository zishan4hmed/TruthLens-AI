/* ==========================================
   TruthLens AI
   Premium Analyzer
   Part 1
========================================== */

const newsInput = document.getElementById("newsInput");
const analyzeBtn = document.getElementById("analyzeBtn");

const charCount = document.getElementById("charCount");

const resultPlaceholder =
document.getElementById("resultPlaceholder");

const analysisResult =
document.getElementById("analysisResult");

const explanationCard =
document.getElementById("explanationCard");

const summaryCard =
document.getElementById("summaryCard");

const metricsGrid =
document.getElementById("metricsGrid");

const sourcesCard =
document.getElementById("sourcesCard");

const reportActions =
document.getElementById("reportActions");

/* ==========================================
   Character Counter
========================================== */

if(newsInput){

    newsInput.addEventListener("input",()=>{

        charCount.textContent =
        `${newsInput.value.length} Characters`;

    });

}

/* ==========================================
   Analyze Button
========================================== */

if(analyzeBtn){

    analyzeBtn.addEventListener("click",startAnalysis);

}

/* ==========================================
   Start Analysis
========================================== */

async function startAnalysis() {

    const text = newsInput.value.trim();

    if (text.length < 20) {

        showToast(
            "Article Too Short",
            "Please paste a longer news article for accurate analysis.",
            "error"
        );

        return;

    }

    analyzeBtn.disabled = true;

    analyzeBtn.innerHTML = `
        <i class="ri-loader-4-line"></i>
        Analyzing...
    `;

    resultPlaceholder.style.display = "none";
    analysisResult.style.display = "block";
    explanationCard.style.display = "none";
    summaryCard.style.display = "none";
    metricsGrid.style.display = "none";
    sourcesCard.style.display = "none";
    reportActions.style.display = "none";

    try {

        simulateAI();

        const response = await APIService.analyzeNews(text);

        showResult(response);

    }

    catch (error) {

        showToast(
            "Analysis Failed",
            error.message,
            "error"
        );

        analyzeBtn.disabled = false;

        analyzeBtn.innerHTML = `
            <i class="ri-sparkling-2-line"></i>
            Analyze with AI
        `;

    }

}


/* ==========================================
   AI Thinking Animation
========================================== */

function simulateAI() {

    const steps = document.querySelectorAll(".thinking-step");

    resetSteps();

    let current = 0;

    const interval = setInterval(() => {

        if (current > 0) {

            const previous = steps[current - 1].children[1];

            previous.className = "step-complete";

            previous.innerHTML = `<i class="ri-check-line"></i>`;

        }

        if (current >= steps.length) {

            clearInterval(interval);

            return;

        }

        current++;

    }, 700);

}
/* ==========================================
   Reset Thinking Steps
========================================== */

function resetSteps() {

    document.querySelectorAll(".thinking-step").forEach(step => {

        const loader = step.children[1];

        loader.className = "step-loader";

        loader.innerHTML = "";

    });

}

/* ==========================================
   TruthLens AI
   Premium Analyzer
   Part 3
========================================== */

/* ==========================================
   Show Result
========================================== */

function showResult(response) {

    const result = response.analysis;
    window.currentAnalysisResult = result;

    animateConfidence(result.confidence);

    const badge = document.getElementById("newsStatus");

    badge.textContent = result.label;

    badge.textContent = result.prediction.toUpperCase();

    badge.className =
        result.prediction === "Real"
        ? "news-status"
        : "news-status fake";

    document.getElementById("analysisMessage").textContent =
        result.aiExplanation;

    document.getElementById("summaryText").textContent =
        result.summary;

    updateMetrics({

        confidence: result.confidence,

        isReal: result.prediction === "Real"

    });

    explanationCard.style.display = "block";
    summaryCard.style.display = "block";
    metricsGrid.style.display = "grid";
    sourcesCard.style.display = "block";
    reportActions.style.display = "flex";

    analyzeBtn.disabled = false;

    analyzeBtn.innerHTML = `
        <i class="ri-sparkling-2-line"></i>
        Analyze with AI
    `;
    /* Open Premium Report */

    if(typeof openReportModal === "function"){

        openReportModal(result);

    }

}

/* ==========================================
   Animate Confidence
========================================== */

function animateConfidence(target){

    const value =
    document.getElementById("confidenceValue");

    let current=0;

    const timer=setInterval(()=>{

        current++;

        value.textContent=current+"%";

        if(current>=target){

            clearInterval(timer);

        }

    },18);

}

/* ==========================================
   Update Metrics
========================================== */

function updateMetrics(result){

    const credibility =
    result.confidence;

    const clickbait =
    100-result.confidence;

    const sentiment =
    result.isReal ? 70 : 35;

    const bias =
    result.isReal ? 25 : 65;

    document.getElementById("credibilityValue").textContent =
    credibility+"%";

    document.getElementById("clickbaitValue").textContent =
    clickbait+"%";

    document.getElementById("biasValue").textContent =
    bias<40 ? "Low" : "High";

    document.getElementById("sentimentValue").textContent =
    result.isReal ? "Neutral" : "Negative";

    document.getElementById("credibilityBar").style.width =
    credibility+"%";

    document.getElementById("clickbaitBar").style.width =
    clickbait+"%";

    document.getElementById("biasBar").style.width =
    bias+"%";

    document.getElementById("sentimentBar").style.width =
    sentiment+"%";

}
/* ==========================================
   TruthLens AI
   Premium Analyzer
   Part 4
========================================== */

/* ==========================================
   Report Buttons
========================================== */

const saveButton =
document.querySelector(".report-btn.primary");

const downloadButton =
document.querySelector(".report-btn.secondary");

if(saveButton){

    saveButton.addEventListener("click",saveReport);

}

if(downloadButton){

    downloadButton.addEventListener("click",downloadReport);

}

/* ==========================================
   Save Report
========================================== */

function saveReport(){

    const report={

        date:new Date().toLocaleString(),

        article:newsInput.value,

        confidence:
        document.getElementById("confidenceValue").textContent,

        status:
        document.getElementById("newsStatus").textContent,

        explanation:
        document.getElementById("analysisMessage").textContent,

        summary:
        document.getElementById("summaryText").textContent

    };

    const history=
    JSON.parse(localStorage.getItem("truthlensHistory")) || [];

    history.unshift(report);

    localStorage.setItem(
        "truthlensHistory",
        JSON.stringify(history)
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

function downloadReport(){

    const reportText=`

TruthLens AI Report

----------------------------------

Status:
${document.getElementById("newsStatus").textContent}

Confidence:
${document.getElementById("confidenceValue").textContent}

----------------------------------

Explanation

${document.getElementById("analysisMessage").textContent}

----------------------------------

Summary

${document.getElementById("summaryText").textContent}

----------------------------------

Generated:
${new Date().toLocaleString()}

`;

    const blob=new Blob(
        [reportText],
        {type:"text/plain"}
    );

    const link=
    document.createElement("a");

    link.href=
    URL.createObjectURL(blob);

    link.download="TruthLens_Report.txt";

    link.click();

}

/* ==========================================
   Reset Analyzer
========================================== */

function resetAnalyzer(){

    resultPlaceholder.style.display="flex";

    analysisResult.style.display="none";

    explanationCard.style.display="none";

    summaryCard.style.display="none";

    metricsGrid.style.display="none";

    sourcesCard.style.display="none";

    reportActions.style.display="none";

}

/* ==========================================
   Placeholder Reset
========================================== */

if(newsInput){

    newsInput.addEventListener("focus",()=>{

        if(newsInput.value.trim()===""){

            resetAnalyzer();

        }

    });

}
