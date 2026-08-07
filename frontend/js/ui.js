"use strict";

/* ==========================================
   TruthLens AI
   Global UI Notifications
========================================== */

function showToast(title, message, type = "success") {

    // Remove existing toast
    const existingToast =
        document.querySelector(".truthlens-toast");

    if (existingToast) {
        existingToast.remove();
    }

    // Toast
    const toast =
        document.createElement("div");

    toast.className =
        `truthlens-toast ${type}`;

    const icon =
        type === "success"
            ? "ri-checkbox-circle-line"
            : type === "error"
            ? "ri-error-warning-line"
            : "ri-information-line";

    toast.innerHTML = `

        <div class="toast-icon">
            <i class="${icon}"></i>
        </div>

        <div class="toast-content">

            <strong>
                ${escapeToastHTML(title)}
            </strong>

            <p>
                ${escapeToastHTML(message)}
            </p>

        </div>

        <button
            class="toast-close"
            type="button"
            aria-label="Close"
        >
            <i class="ri-close-line"></i>
        </button>

    `;

    document.body.appendChild(toast);


    // Show animation
    requestAnimationFrame(() => {

        toast.classList.add("show");

    });


    // Close button
    const closeButton =
        toast.querySelector(".toast-close");

    closeButton.addEventListener(
        "click",
        () => {

            closeToast(toast);

        }
    );


    // Automatically disappear
    setTimeout(() => {

        closeToast(toast);

    }, 4000);

}


/* ==========================================
   Close Toast
========================================== */

function closeToast(toast) {

    if (!toast) return;

    toast.classList.remove("show");

    setTimeout(() => {

        if (toast && toast.parentNode) {

            toast.remove();

        }

    }, 300);

}


/* ==========================================
   Safe Toast Text
========================================== */

function escapeToastHTML(value) {

    const div =
        document.createElement("div");

    div.textContent =
        String(value ?? "");

    return div.innerHTML;

}


/* ==========================================
   Global Access
========================================== */

window.showToast =
    showToast;

window.closeToast =
    closeToast;