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
          description: 'Staging server',
        },
      ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerSpec };


















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
//     servers: [
//       {
//         url: 'http://localhost:5000/api/v1',
//         description: 'Development server',
//       },
//       {
//         url: 'https://investmentwebsite-backend.onrender.com/api/v1',
//         description: 'Staging server',
//       },
//     ],
//     components: {
//       securitySchemes: {
//         bearerAuth: {
//           type: 'http',
//           scheme: 'bearer',
//           bearerFormat: 'JWT',
//           description: 'Enter your JWT token in the format: Bearer <token>',
//         },
//       },
//     },
//     // Global security (applies to all endpoints by default)
//     // Remove or override this per-route if some endpoints should be public
//     security: [
//       {
//         bearerAuth: [],
//       },
//     ],
//   },
//   apis: ['./src/routes/*.js'], // Make sure this path correctly points to your route files
// };

// const swaggerSpec = swaggerJsdoc(options);

// module.exports = swaggerSpec;   // Usually exported directly (not as object)