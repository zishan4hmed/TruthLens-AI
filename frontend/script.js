const analyzeBtn = document.getElementById("analyzeBtn");
const newsInput = document.getElementById("newsInput");
const result = document.getElementById("result");

analyzeBtn.addEventListener("click", async () => {

    const news = newsInput.value.trim();

    if (!news) {
        showToast(
            "News Required",
            "Please enter some news to analyze.",
            "error"
        );
        return;
    }

    result.style.display = "block";
    result.innerHTML = "⏳ AI is analyzing...";

    try {

        const response = await fetch("http://localhost:5000/api/analyze", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ news })
        });

        const data = await response.json();

        result.innerHTML = `
            <h2>Analysis Complete ✅</h2>

            <p><strong>Prediction:</strong> ${data.prediction}</p>

            <p><strong>Confidence:</strong> ${data.confidence}</p>

            <p><strong>Characters:</strong> ${data.newsLength}</p>

            <p>${data.message}</p>
        `;

    } catch (error) {

        result.innerHTML = `
            <h2 style="color:red;">Server Error ❌</h2>

            <p>Unable to connect to backend.</p>
        `;

        console.error(error);
    }

});