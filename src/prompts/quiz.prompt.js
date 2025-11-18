export const quizPromptTemplate = ({
     topic,
     questionCount,
     customMessage = ""
}) => `
You are an expert quiz generator. Create a high-quality quiz based on the topic: "${topic}".

Number of questions: ${questionCount}
${customMessage ? `Additional instructions: ${customMessage}` : ""}

Strict Output Requirements:
1. Produce ONLY valid JSON.
2. Use exactly this format:
{
  "questions": [
    {
      "questionText": "string",
      "options": ["string", "string", "string", "string"],
      "correctAnswer": "string"
    }
  ]
}
3. Each question must be clear, correct, and non-repetitive.
4. Each question MUST have exactly 4 answer options.
5. The correctAnswer MUST match one of the options exactly.
6. No explanations, no descriptions, no markdown, no extra text outside JSON.
7. All content must be accurate and relevant to the topic.
`;
