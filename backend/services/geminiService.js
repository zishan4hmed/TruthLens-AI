const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function analyzeNewsWithGemini(newsText) {

    const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash"
    });

    const prompt = `
You are an AI fake news detection assistant.

Analyze the following news carefully.

Return ONLY valid JSON in this exact format:

{
  "prediction":"Real" or "Fake",
  "confidence":95,
  "summary":"short summary",
  "explanation":"why you think this",
  "credibilityScore":95,
  "clickbaitScore":20,
  "bias":"Low"
}

News:

${newsText}
`;

    const result = await model.generateContent(prompt);

    const response = await result.response;

    return response.text();

}

module.exports = {
    analyzeNewsWithGemini
};