const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Tareas",
      version: "1.0.0",
      description: "API de Taskflow Mini",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        url: "https://taskflow-mini-back-production.up.railway.app/",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Usuario: {
          type: "object",
          properties: {
            _id: { type: "string" },
            nombre: { type: "string", minLength: 3, maxLength: 100 },
            email: { type: "string", format: "email" },
            role: { type: "string", enum: ["admin", "user"] },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        Tarea: {
          type: "object",
          properties: {
            _id: { type: "string" },
            text: { type: "string", minLength: 5, maxLength: 200 },
            prioridad: { type: "string", enum: ["baja", "media", "alta"] },
            completed: { type: "boolean" },
            usuario: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

module.exports = swaggerJsdoc(options);
