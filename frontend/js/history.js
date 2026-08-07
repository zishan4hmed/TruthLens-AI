"use strict";

/* ==========================================
   TruthLens AI
   Analysis History
========================================== */


/* ==========================================
   Elements
========================================== */

const historyContainer =
    document.getElementById("historyContainer");

const logoutBtn =
    document.getElementById("logoutBtn");


/* ==========================================
   Load History
========================================== */

async function loadHistory(){

    if(!historyContainer) return;

    try{

        historyContainer.innerHTML = `
            <div class="history-item">
                <h3>Loading history...</h3>
            </div>
        `;


        const response =
            await APIService.getHistory();


        const analyses =
            Array.isArray(response.analyses)
            ? response.analyses
            : [];


        renderHistory(analyses);

    }

    catch(error){

        console.error(
            "History Error:",
            error
        );


        historyContainer.innerHTML = `

            <div class="history-item">

                <h3>
                    Unable to load history
                </h3>

                <p>
                    ${escapeHTML(error.message)}
                </p>

            </div>

        `;

    }

}


/* ==========================================
   Render History
========================================== */

function renderHistory(analyses){

    historyContainer.innerHTML = "";


    if(analyses.length === 0){

        historyContainer.innerHTML = `

            <div class="history-empty">

                <h3>
                    No analyses yet
                </h3>

                <p>
                    Analyze some news using TruthLens AI
                    and your results will appear here.
                </p>

            </div>

        `;

        return;

    }


    analyses.forEach(item => {

        const prediction =
            String(
                item.prediction ||
                "Unknown"
            );


        const confidence =
            Number(
                item.confidence
            ) || 0;


        const summary =
            item.summary ||
            "No summary available.";


        const predictionClass =
            prediction.toLowerCase();


        const card =
            document.createElement("div");


        card.className =
            "history-card";


        card.innerHTML = `

            <div class="history-card-top">

                <div>

                    <h3>
                        ${escapeHTML(
                            prediction.toUpperCase()
                        )}
                    </h3>

                    <p class="history-date">
                        ${escapeHTML(
                            item.date ||
                            item.createdAt ||
                            "Unknown date"
                        )}
                    </p>

                </div>


                <span
                    class="history-confidence ${predictionClass}"
                >
                    ${confidence}% Confidence
                </span>

            </div>


            <p>
                ${escapeHTML(summary)}
            </p>

        `;


        historyContainer.appendChild(card);

    });

}


/* ==========================================
   Escape HTML
========================================== */

function escapeHTML(value){

    const div =
        document.createElement("div");

    div.textContent =
        String(value);

    return div.innerHTML;

}


/* ==========================================
   Logout
========================================== */

if(logoutBtn){

    logoutBtn.addEventListener(
        "click",
        ()=>{

            APIService.logout();

            localStorage.removeItem(
                "truthlens_name"
            );

            window.location.href =
                "index.html";

        }
    );

}


/* ==========================================
   Initialize
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    loadHistory
);