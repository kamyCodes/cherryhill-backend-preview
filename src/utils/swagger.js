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
//     ],
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

    // ✅ Multiple servers
    servers: [
      {
        url: 'http://localhost:5000/api/v1',
        description: 'Local Development',
      },
      {
        url: 'http://localhost:3000/api/v1',
        description: 'Alt Local (if proxying)',
      },
      {
        url: 'https://investmentwebsite-backend.onrender.com/api/v1',
        description: 'Local IP',
      },
      {
        url: 'https://dev-api.yourdomain.com/api/v1',
        description: 'Development Server',
      },
      {
        url: 'https://staging-api.yourdomain.com/api/v1',
        description: 'Staging Server',
      },
      {
        url: 'https://api.yourdomain.com/api/v1',
        description: 'Production Server',
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