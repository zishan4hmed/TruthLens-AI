"use strict";


/* ==========================================
   Elements
========================================== */

const profileName =
    document.getElementById("profileName");

const profileEmail =
    document.getElementById("profileEmail");

const analysisCount =
    document.getElementById("analysisCount");

const logoutBtn =
    document.getElementById("logoutBtn");

const dashboardBtn =
    document.getElementById("dashboardBtn");


/* ==========================================
   Load Profile
========================================== */

async function loadProfile() {

    try {

        const profile =
            await APIService.getProfile();

        const user =
            profile.user;

        if(profileName) {

            profileName.textContent =
                user.name;

        }

        if(profileEmail) {

            profileEmail.textContent =
                user.email;

        }


        /* Get Analysis Count */

        try {

            const history =
                await APIService.getHistory();

            if(analysisCount) {

                analysisCount.textContent =
                    Array.isArray(history.analyses)
                    ? history.analyses.length
                    : 0;

            }

        }

        catch(error) {

            console.log(
                "History Error:",
                error
            );

        }

    }

    catch(error) {

        console.error(
            "Profile Error:",
            error
        );

        if(profileName) {

            profileName.textContent =
                "Unable to load";

        }

        if(profileEmail) {

            profileEmail.textContent =
                "Unable to load";

        }

    }

}


/* ==========================================
   Dashboard
========================================== */

if(dashboardBtn) {

    dashboardBtn.addEventListener(
        "click",
        () => {

            window.location.href =
                "dashboard.html";

        }
    );

}


/* ==========================================
   Logout
========================================== */

if(logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        () => {

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
    loadProfile
);