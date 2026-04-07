// const swaggerJsdoc = require('swagger-jsdoc');

// const options = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Corporate Investment Platform API',
//       version: '1.0.0',
//       description: 'Backend API for Corporate Investment Platform',
//       contact: {
//         name: 'API Support',
//         email: 'support@corporateinvestment.com',
//       },
//     },
//       servers: [
//         {
//           url: 'http://localhost:5000/api/v1',
//           description: 'Development server',
//         },
//         {
//           url: 'https://investmentwebsite-backend.onrender.com/api/v1',
//           description: 'Staging server',
//         },
//       ],
//     components: {
//       securitySchemes: {
//         bearerAuth: {
//           type: 'http',
//           scheme: 'bearer',
//           bearerFormat: 'JWT',
//         },
//       },
//     },
//     security: [
//       {
//         bearerAuth: [],
//       },
//     ],
//   },
//   apis: ['./src/routes/*.js'],
// };

// const swaggerSpec = swaggerJsdoc(options);

// module.exports = { swaggerSpec };


















const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Corporate Investment Platform API',
      version: '1.0.0',
      description: 'Backend API for Corporate Investment Platform',
      contact: {
        name: 'API Support',
        email: 'support@corporateinvestment.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000/api/v1',
        description: 'Development server',
      },
      {
        url: 'https://investmentwebsite-backend.onrender.com/api/v1',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter JWT token as: Bearer <your-token>',
        },
      },
    },
    security: [{ bearerAuth: [] }],   // Global security (you can override per route)
  },
  apis: ['./src/routes/*.js'],   // Ensure this path matches your actual route files
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;   // ← Export the spec directly (not wrapped in an object)