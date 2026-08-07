const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

async function analyzeNewsWithGroq(newsText) {

    const completion = await groq.chat.completions.create({

        model: "llama-3.3-70b-versatile",

        temperature: 0.2,

        response_format: {
            type: "json_object"
        },

        messages: [

            {
                role: "system",
                content: `You are an AI fake news detector.

Return ONLY valid JSON.

{
  "prediction":"Real",
  "confidence":95,
  "summary":"Short summary",
  "explanation":"Reason",
  "credibilityScore":95,
  "clickbaitScore":15,
  "bias":"Low"
}`
            },

            {
                role: "user",
                content: newsText
            }

        ]

    });

    return JSON.parse(
        completion.choices[0].message.content
    );

}

module.exports = {
    analyzeNewsWithGroq
};