import swaggerAutogen from "swagger-autogen";

const doc = {
     info: {
          title: "QuizRadix API",
          description: "API documentation for QuizRadix backend",
     },
     host: "localhost:4000",
     schemes: ["http"],
};

const outputFile = "./swagger-output.json";         // <- generated file
const endpointsFiles = ["./src/routes/*.js"];   // <- main routes file (see note below)

swaggerAutogen()(outputFile, endpointsFiles).then(() => {
     console.log("📘 Swagger documentation generated!");
});
