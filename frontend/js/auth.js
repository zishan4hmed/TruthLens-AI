/* ==========================================
   TruthLens AI
   Authentication
   Part 1
========================================== */

"use strict";

/* ==========================================
   Premium Toast Notification
========================================== */

function showToast(title, message, type = "success") {

    let toast =
        document.getElementById("truthlensToast");

    if (!toast) {

        toast = document.createElement("div");

        toast.id = "truthlensToast";

        toast.innerHTML = `
            <div class="toast-icon"></div>

            <div class="toast-content">
                <strong id="toastTitle"></strong>
                <span id="toastMessage"></span>
            </div>

            <button
                type="button"
                class="toast-close"
                onclick="closeToast()"
            >
                <i class="ri-close-line"></i>
            </button>
        `;

        document.body.appendChild(toast);
    }

    const icon =
        toast.querySelector(".toast-icon");

    const toastTitle =
        document.getElementById("toastTitle");

    const toastMessage =
        document.getElementById("toastMessage");

    toast.className =
        `truthlens-toast ${type}`;

    toastTitle.textContent = title;

    toastMessage.textContent = message;

    icon.innerHTML =
        type === "success"
        ? `<i class="ri-check-line"></i>`
        : `<i class="ri-error-warning-line"></i>`;

    requestAnimationFrame(() => {

        toast.classList.add("show");

    });

    clearTimeout(
        window.truthlensToastTimer
    );

    window.truthlensToastTimer =
        setTimeout(() => {

            closeToast();

        }, 3500);

}


function closeToast(){

    const toast =
        document.getElementById(
            "truthlensToast"
        );

    if(toast){

        toast.classList.remove("show");

    }

}

/* ==========================================
   Elements
========================================== */

const authModal = document.getElementById("authModal");

const authForm = document.getElementById("authForm");

const authTitle = document.getElementById("authTitle");

const toggleAuth = document.getElementById("toggleAuth");

const switchText = document.getElementById("switchText");

const closeAuth = document.getElementById("closeAuth");

const authSubmit =
document.querySelector(".auth-submit");

const nameInput =
document.getElementById("name");

const emailInput =
document.getElementById("email");

const passwordInput =
document.getElementById("password");

/* ==========================================
   State
========================================== */

let registerMode = false;

/* ==========================================
   Navbar Buttons
========================================== */

const loginButton =
document.getElementById("loginBtn");

const getStartedButton =
document.getElementById("dashboardBtn");

/* ==========================================
   Open Modal
========================================== */

function openAuthModal(){

    authModal.classList.add("active");

}

/* ==========================================
   Close Modal
========================================== */

function closeAuthModal(){

    authModal.classList.remove("active");

}

/* ==========================================
   Events
========================================== */


if(loginButton){

    loginButton.addEventListener("click",()=>{

        if(APIService.getToken()){

            window.location.href = "dashboard.html";

            return;

        }

        registerMode = false;

        updateAuthMode();

        openAuthModal();

    });

}

if(getStartedButton){

    getStartedButton.addEventListener("click",()=>{

        if(APIService.getToken()){

            window.location.href = "dashboard.html";

            return;

        }

        registerMode = true;

        updateAuthMode();

        openAuthModal();

    });

}

if(closeAuth){

    closeAuth.addEventListener("click", closeAuthModal);

}

/* ==========================================
   Update Auth Mode
========================================== */

function updateAuthMode(){

    if(registerMode){

        authTitle.textContent =
        "Create Account";

        authSubmit.textContent =
        "Register";

        switchText.textContent =
        "Already have an account?";

        toggleAuth.textContent =
        "Login";

        nameInput.style.display =
        "block";

    }

    else{

        authTitle.textContent =
        "Welcome Back";

        authSubmit.textContent =
        "Login";

        switchText.textContent =
        "Don't have an account?";

        toggleAuth.textContent =
        "Register";

        nameInput.style.display =
        "none";

    }

}

/* ==========================================
   Toggle Login/Register
========================================== */

toggleAuth.addEventListener("click",(e)=>{

    e.preventDefault();

    registerMode = !registerMode;

    updateAuthMode();

});

/* ==========================================
   Submit Form
========================================== */

authForm.addEventListener(

    "submit",

    async(e)=>{

        e.preventDefault();

        try{

            APIService.showLoading(authSubmit);

            let response;

            if(registerMode){

                response = await APIService.registerUser(

                    nameInput.value,

                    emailInput.value,

                    passwordInput.value

                );

                showToast(
                    "Registration Successful",
                    "Your TruthLens AI account has been created.",
                    "success"
                );

                registerMode = false;

                updateAuthMode();

            }

            else{

                response = await APIService.loginUser(

                    emailInput.value,

                    passwordInput.value

                );
                console.log("LOGIN RESPONSE:", response);

                APIService.saveToken(

                    response.token

                );
                localStorage.setItem(
                    "truthlens_name",
                    response.user.name
                );

                showToast(
                    "Login Successful",
                    "Welcome back to TruthLens AI.",
                    "success"
                );

                closeAuthModal();

                loadCurrentUser();

            }

        }

        catch(error){

            showToast(
                "Something went wrong",
                error.message,
                "error"
            );


        }

        finally{

            APIService.hideLoading(authSubmit);

        }

    }

);

/* ==========================================
   Current User
========================================== */

async function loadCurrentUser(){

    try{

        const user = await APIService.getProfile();

        updateNavbar(user.user);

    }

    catch(error){

        console.log(error);

    }

}

/* ==========================================
   Navbar
========================================== */

function updateNavbar(user){

    if(loginButton){

        loginButton.textContent = user.name;

        localStorage.setItem("truthlens_name", user.name);

    }

    if(getStartedButton){

        getStartedButton.textContent = "Dashboard";

    }

}


/* ==========================================
   Outside Click
========================================== */

window.addEventListener("click",(event)=>{

    if(event.target===authModal){

        closeAuthModal();

    }

});

/* ==========================================
   Auto Login
========================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        updateAuthMode();

        if(APIService.getToken()){

            loadCurrentUser();

        }

        else{

            if(loginButton){

                loginButton.innerHTML =
                "Login";

            }

            if(getStartedButton){

                getStartedButton.innerHTML =
                "Get Started";

            }

        }

    }

);