import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
     definition: {
          openapi: "3.0.0",
          info: {
               title: "QuizRadix API Documentation",
               version: "1.0.0",
               description: "API documentation for QuizRadix backend",
          },
          servers: [
               {
                    url: "http://localhost:4000",
                    description: "Development server",
               }
          ],
          components: {
               securitySchemes: {
                    bearerAuth: {
                         type: "http",
                         scheme: "bearer",
                         bearerFormat: "JWT",
                    },
               },
          },
          security: [{ bearerAuth: [] }],
     },

     // Path to the API docs 
     apis: ["../routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export function swaggerDocs(app) {
     app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

     console.log("📘 Swagger Docs available at: http://localhost:4000/api-docs");
}