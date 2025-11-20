import model from "../config/gemini.js";
import { quizPromptTemplate } from "../prompts/quiz.prompt.js";

// function to generate quiz using Gemini model
export async function generateQuiz(topic, questionCount, customMessage = "") {
     try {

          // Construct prompt
          const prompt = quizPromptTemplate({ topic, questionCount, customMessage });

        // Generate content using Gemini model
          const result = await model.generateContent(prompt);

          // Extract text from response
          const text = result.response.text();

          // Find JSON part only
          const start = text.indexOf("{");
          const end = text.lastIndexOf("}") + 1;
          const json = text.substring(start, end);

          const data = JSON.parse(json);

          return data.questions; 

     } catch (error) {
          console.error("Gemini Quiz Error:", error);
          return [];  
     }
}
