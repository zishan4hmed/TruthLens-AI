/* ==========================================
   TruthLens AI
   API Service
========================================== */

"use strict";

/* ==========================================
   Configuration
========================================== */

const API = {

    BASE_URL: "http://localhost:5000/api",

    ENDPOINTS: {

        ANALYZE: "/analyze",

        LOGIN: "/auth/login",

        REGISTER: "/auth/register",

        PROFILE: "/auth/me",

        HISTORY: "/analyze/history",

        HEALTH: "/health"

    }

};

/* ==========================================
   Generic Request Function
========================================== */

async function apiRequest(
    endpoint,
    options = {}
){

    const token =
        localStorage.getItem("truthlens_token");

    /* ==========================================
       Protected API Check
    ========================================== */

    const protectedEndpoints = [
        API.ENDPOINTS.ANALYZE,
        API.ENDPOINTS.PROFILE,
        API.ENDPOINTS.HISTORY
    ];

    const requiresToken =
        protectedEndpoints.includes(endpoint);

    if(requiresToken && !token){

        console.warn(
            "No authentication token found."
        );

        throw new Error(
            "Please login first."
        );

    }


    /* ==========================================
       Headers
    ========================================== */

    const headers = {

        "Content-Type":"application/json",

        ...options.headers

    };


    if(token){

        headers.Authorization =
            `Bearer ${token}`;

    }


    /* ==========================================
       Request
    ========================================== */

    try{

        const response =
            await fetch(

                API.BASE_URL + endpoint,

                {

                    ...options,

                    headers

                }

            );


        const data =
            await response.json();


        if(!response.ok){

            throw new Error(

                data.message ||

                "Something went wrong."

            );

        }


        return data;

    }


    catch(error){

        console.error(

            "API Error:",

            error.message

        );

        throw error;

    }

}

/* ==========================================
   Analyze News
========================================== */

async function analyzeNews(text){

    return apiRequest(

        API.ENDPOINTS.ANALYZE,

        {

            method:"POST",

            body: JSON.stringify({

                newsText: text,

                sourceUrl: ""

            })

        }

    );

}

/* ==========================================
   Login
========================================== */

async function loginUser(

    email,

    password

){

    return apiRequest(

        API.ENDPOINTS.LOGIN,

        {

            method:"POST",

            body:JSON.stringify({

                email,

                password

            })

        }

    );

}

/* ==========================================
   Register
========================================== */

async function registerUser(

    name,

    email,

    password

){

    return apiRequest(

        API.ENDPOINTS.REGISTER,

        {

            method:"POST",

            body:JSON.stringify({

                name,

                email,

                password

            })

        }

    );

}

/* ==========================================
   History
========================================== */

async function getHistory(){

    return apiRequest(

        API.ENDPOINTS.HISTORY

    );

}

/* ==========================================
   User Profile
========================================== */

async function getProfile(){

    return apiRequest(

        API.ENDPOINTS.PROFILE

    );

}

/* ==========================================
   Health Check
========================================== */

async function healthCheck(){

    try{

        const result = await fetch(

            "http://localhost:5000/"

        );

        return await result.json();

    }

    catch{

        return {

            success:false

        };

    }

}

/* ==========================================
   JWT Helpers
========================================== */

function saveToken(token){

    localStorage.setItem(

        "truthlens_token",

        token

    );

}

function getToken(){

    return localStorage.getItem(

        "truthlens_token"

    );

}

function logout(){

    localStorage.removeItem(

        "truthlens_token"

    );

}

/* ==========================================
   Loading Helpers
========================================== */

function showLoading(button){

    if(!button) return;

    button.disabled = true;

    button.dataset.original =

        button.innerHTML;

    button.innerHTML =

        `<i class="ri-loader-4-line"></i> Loading...`;

}

function hideLoading(button){

    if(!button) return;

    button.disabled = false;

    button.innerHTML =

        button.dataset.original;

}

/* ==========================================
   Network Status
========================================== */

window.addEventListener(

    "offline",

    ()=>{

        console.warn(

            "No Internet Connection"

        );

    }

);

window.addEventListener(

    "online",

    ()=>{

        console.log(

            "Internet Connected"

        );

    }

);

/* ==========================================
   Exports
========================================== */

window.APIService = {

    analyzeNews,

    loginUser,

    registerUser,

    getHistory,

    getProfile,

    saveToken,

    getToken,

    logout,

    healthCheck,

    showLoading,

    hideLoading

};