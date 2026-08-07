"use strict";

/* ==========================================
   Elements
========================================== */

const userName =
document.getElementById("userName");

const profileName =
document.getElementById("profileName");

const profileEmail =
document.getElementById("profileEmail");

const analysisCount =
document.getElementById("analysisCount");

const historyContainer =
document.getElementById("historyContainer");

const logoutBtn =
document.getElementById("logoutBtn");

let analysisChartInstance = null;

/* ==========================================
   Check Login
========================================== */

//if(!APIService.getToken()){

   // window.location.href = "index.html";

//}

/* ==========================================
   Initialize
========================================== */

document.addEventListener("DOMContentLoaded",()=>{

    loadDashboard();

});
/* ==========================================
   Load Dashboard
========================================== */

async function loadDashboard(){

    try{

        const profile =
        await APIService.getProfile();

        const history =
        await APIService.getHistory();

        showProfile(profile.user);

        showHistory(history.analyses);

    }

    catch(error){

        console.error(
            "Dashboard Error:",
            error
        );

        if(
            error.message ===
            "Please login first."
        ){

            return;

        }

        showToast(
            "Dashboard Error",
            error.message,
            "error"
        );

    }

}
/* ==========================================
   Profile
========================================== */

function showProfile(user){

    if(userName){
        userName.textContent = user.name;
    }

    if(profileName){
        profileName.textContent = user.name;
    }

    if(profileEmail){
        profileEmail.textContent = user.email;
    }

}
/* ==========================================
   History
========================================== */

function showHistory(history){

    if(!Array.isArray(history)){

        history = [];

    }


    /* ==========================================
       Total Analyses
    ========================================== */

    if(analysisCount){

        analysisCount.textContent =
            history.length;

    }


    /* ==========================================
       Real / Fake Counts
    ========================================== */

    let realCountValue = 0;
    let fakeCountValue = 0;
    let totalConfidence = 0;


    history.forEach(item => {

        const prediction =
            String(
                item.prediction || ""
            ).toLowerCase();


        if(prediction === "real"){

            realCountValue++;

        }

        else if(prediction === "fake"){

            fakeCountValue++;

        }


        totalConfidence +=
            Number(item.confidence) || 0;

    });


    /* ==========================================
       Real Count
    ========================================== */

    const realCount =
        document.getElementById(
            "realCount"
        );

    if(realCount){

        realCount.textContent =
            realCountValue;

    }


    /* ==========================================
       Fake Count
    ========================================== */

    const fakeCount =
        document.getElementById(
            "fakeCount"
        );

    if(fakeCount){

        fakeCount.textContent =
            fakeCountValue;

    }
/* ==========================================
    Draw Chart
========================================== */

    drawChart(
        realCountValue,
        fakeCountValue
    );

    /* ==========================================
       Average Confidence
    ========================================== */

    const avgConfidence =
        document.getElementById(
            "avgConfidence"
        );

    if(avgConfidence){

        const average =
            history.length > 0
            ? Math.round(
                totalConfidence /
                history.length
              )
            : 0;

        avgConfidence.textContent =
            average + "%";

    }


    /* ==========================================
       History Container
    ========================================== */

    if(!historyContainer){

        console.warn(
            "historyContainer not found."
        );

        return;

    }


    historyContainer.innerHTML = "";


    /* ==========================================
       No History
    ========================================== */

    if(history.length === 0){

        historyContainer.innerHTML = `

            <div class="history-item">

                <h3>No analyses yet</h3>

                <p>
                    Analyze some news using TruthLens AI
                    and your recent analyses will appear here.
                </p>

            </div>

        `;

        return;

    }


    /* ==========================================
       Display History
    ========================================== */

    history.forEach(item => {

        const prediction =
            item.prediction ||
            "Unknown";

        const summary =
            item.summary ||
            "No summary available.";

        const confidence =
            Number(item.confidence) || 0;


        const predictionClass =
            prediction.toLowerCase();


        historyContainer.innerHTML += `

            <div class="history-item">

                <div class="history-header">

                    <h3>
                        ${prediction.toUpperCase()}
                    </h3>

                    <span class="badge ${predictionClass}">
                        ${confidence}% Confidence
                    </span>

                </div>

                <p>
                    ${summary}
                </p>

            </div>

        `;

    });

}


/* ==========================================
   Logout
========================================== */

if(logoutBtn){

    logoutBtn.addEventListener("click",()=>{

        APIService.logout();

        localStorage.removeItem("truthlens_name");

        window.location.href="index.html";

    });

}
/* ==========================================
   Dashboard Chart
========================================== */

function drawChart(real, fake){

    const canvas =
        document.getElementById("analysisChart");

    if(!canvas) return;

    if(typeof Chart === "undefined"){

        console.warn("Chart.js is not loaded.");

        return;

    }

    if(analysisChartInstance){

        analysisChartInstance.destroy();

    }

    analysisChartInstance = new Chart(canvas, {

        type: "doughnut",

        data: {

            labels: [
                "Real News",
                "Fake News"
            ],

            datasets: [{

                data: [
                    real,
                    fake
                ],

                backgroundColor: [
                    "#22c55e",
                    "#ef4444"
                ],

                borderWidth: 0

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    position: "bottom",

                    labels: {

                        color: "#ffffff",

                        font: {
                            size: 14
                        },

                        padding: 20

                    }

                }

            }

        }

    });

}