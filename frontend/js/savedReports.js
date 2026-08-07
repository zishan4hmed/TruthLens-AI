"use strict";

/* ==========================================
   TruthLens AI
   Saved Reports
========================================== */


/* ==========================================
   Elements
========================================== */

const reportsContainer =
    document.getElementById("savedReportsContainer");

const totalReports =
    document.getElementById("totalReports");

const realReports =
    document.getElementById("realReports");

const fakeReports =
    document.getElementById("fakeReports");

const clearReportsBtn =
    document.getElementById("clearReportsBtn");

const viewReportModal =
    document.getElementById("viewReportModal");

const viewReportContent =
    document.getElementById("viewReportContent");

const closeViewReport =
    document.getElementById("closeViewReport");

const logoutBtn =
    document.getElementById("logoutBtn");


/* ==========================================
   Get Saved Reports
========================================== */

function getSavedReports(){

    return JSON.parse(
        localStorage.getItem(
            "truthlens_saved_reports"
        )
    ) || [];

}


/* ==========================================
   Load Reports
========================================== */

function loadSavedReports(){

    const reports =
        getSavedReports();

    updateSummary(reports);

    renderReports(reports);

}


/* ==========================================
   Summary
========================================== */

function updateSummary(reports){

    totalReports.textContent =
        reports.length;


    const real =
        reports.filter(
            report =>
                String(report.prediction)
                    .toLowerCase() === "real"
        ).length;


    const fake =
        reports.filter(
            report =>
                String(report.prediction)
                    .toLowerCase() === "fake"
        ).length;


    realReports.textContent =
        real;

    fakeReports.textContent =
        fake;

}


/* ==========================================
   Render Reports
========================================== */

function renderReports(reports){

    reportsContainer.innerHTML = "";


    if(reports.length === 0){

        reportsContainer.innerHTML = `

            <div class="empty-state">

                <i class="ri-bookmark-line"></i>

                <h3>
                    No Saved Reports
                </h3>

                <p>
                    Analyze some news and save your reports here.
                </p>

            </div>

        `;

        return;

    }


    reports.forEach(
        (report,index)=>{

            const prediction =
                String(
                    report.prediction ||
                    "Unknown"
                );


            const predictionClass =
                prediction.toLowerCase();


            const card =
                document.createElement("div");


            card.className =
                "saved-report-card";


            card.innerHTML = `

                <div class="saved-report-top">

                    <div class="saved-report-info">

                        <div>

                            <h3>
                                ${prediction.toUpperCase()}
                            </h3>

                            <span class="saved-report-date">
                                ${escapeHTML(
                                    report.date ||
                                    "Unknown date"
                                )}
                            </span>

                        </div>

                    </div>


                    <span
                        class="saved-prediction ${predictionClass}"
                    >
                        ${prediction.toUpperCase()}
                    </span>

                </div>


                <div class="saved-report-details">


                    <div class="saved-detail">

                        <span>
                            Confidence
                        </span>

                        <strong>
                            ${report.confidence || 0}%
                        </strong>

                    </div>


                    <div class="saved-detail">

                        <span>
                            Risk Level
                        </span>

                        <strong>
                            ${escapeHTML(
                                report.riskLevel ||
                                "Not available"
                            )}
                        </strong>

                    </div>


                    <div class="saved-detail">

                        <span>
                            Category
                        </span>

                        <strong>
                            ${escapeHTML(
                                report.category ||
                                "Other"
                            )}
                        </strong>

                    </div>

                </div>


                <p class="saved-report-summary">

                    ${escapeHTML(
                        report.summary ||
                        "No summary available."
                    )}

                </p>


                <div class="saved-report-actions">


                    <button
                        type="button"
                        class="view-report"
                        data-index="${index}"
                    >

                        <i class="ri-eye-line"></i>

                        View Report

                    </button>


                    <button
                        type="button"
                        class="delete-report"
                        data-index="${index}"
                    >

                        <i class="ri-delete-bin-line"></i>

                        Delete

                    </button>


                </div>

            `;


            reportsContainer.appendChild(card);

        }
    );

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
   View Report
========================================== */

function viewReport(index){

    const reports =
        getSavedReports();

    const report =
        reports[index];


    if(!report) return;


    viewReportContent.innerHTML = `

        <div class="report-detail-block">

            <h3>
                Prediction
            </h3>

            <p>
                ${escapeHTML(
                    report.prediction ||
                    "Unknown"
                )}
            </p>

        </div>


        <div class="report-detail-block">

            <h3>
                Confidence
            </h3>

            <p>
                ${report.confidence || 0}%
            </p>

        </div>


        <div class="report-detail-block">

            <h3>
                Risk Level
            </h3>

            <p>
                ${escapeHTML(
                    report.riskLevel ||
                    "Not available"
                )}
            </p>

        </div>


        <div class="report-detail-block">

            <h3>
                Category
            </h3>

            <p>
                ${escapeHTML(
                    report.category ||
                    "Other"
                )}
            </p>

        </div>


        <div class="report-detail-block">

            <h3>
                Sentiment
            </h3>

            <p>
                ${escapeHTML(
                    report.sentiment ||
                    "Neutral"
                )}
            </p>

        </div>


        <div class="report-detail-block">

            <h3>
                Summary
            </h3>

            <p>
                ${escapeHTML(
                    report.summary ||
                    "No summary available."
                )}
            </p>

        </div>


        <div class="report-detail-block">

            <h3>
                AI Explanation
            </h3>

            <p>
                ${escapeHTML(
                    report.explanation ||
                    "No explanation available."
                )}
            </p>

        </div>


        <div class="report-detail-block">

            <h3>
                Generated
            </h3>

            <p>
                ${escapeHTML(
                    report.date ||
                    "Unknown"
                )}
            </p>

        </div>

    `;


    viewReportModal.classList.add("active");

}


/* ==========================================
   Delete Report
========================================== */

function deleteReport(index){

    const reports =
        getSavedReports();


    if(!reports[index]) return;


    const confirmDelete =
        confirm(
            "Delete this saved report?"
        );


    if(!confirmDelete) return;


    reports.splice(index,1);


    localStorage.setItem(
        "truthlens_saved_reports",
        JSON.stringify(reports)
    );


    loadSavedReports();

}


/* ==========================================
   Clear All
========================================== */

if(clearReportsBtn){

    clearReportsBtn.addEventListener(
        "click",
        ()=>{

            const reports =
                getSavedReports();


            if(reports.length === 0){

                return;

            }


            const confirmed =
                confirm(
                    "Are you sure you want to delete all saved reports?"
                );


            if(!confirmed) return;


            localStorage.removeItem(
                "truthlens_saved_reports"
            );


            loadSavedReports();

        }
    );

}


/* ==========================================
   Report Buttons
========================================== */

if(reportsContainer){

    reportsContainer.addEventListener(
        "click",
        (event)=>{

            const viewButton =
                event.target.closest(
                    ".view-report"
                );


            const deleteButton =
                event.target.closest(
                    ".delete-report"
                );


            if(viewButton){

                viewReport(
                    Number(
                        viewButton.dataset.index
                    )
                );

            }


            if(deleteButton){

                deleteReport(
                    Number(
                        deleteButton.dataset.index
                    )
                );

            }

        }
    );

}


/* ==========================================
   Close View Modal
========================================== */

if(closeViewReport){

    closeViewReport.addEventListener(
        "click",
        ()=>{

            viewReportModal.classList.remove(
                "active"
            );

        }
    );

}


/* ==========================================
   Close Modal Outside
========================================== */

if(viewReportModal){

    viewReportModal.addEventListener(
        "click",
        (event)=>{

            if(
                event.target ===
                viewReportModal
            ){

                viewReportModal.classList.remove(
                    "active"
                );

            }

        }
    );

}


/* ==========================================
   Escape Key
========================================== */

document.addEventListener(
    "keydown",
    (event)=>{

        if(event.key === "Escape"){

            if(viewReportModal){

                viewReportModal.classList.remove(
                    "active"
                );

            }

        }

    }
);


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
    ()=>{

        loadSavedReports();

    }
);