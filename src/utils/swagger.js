// const swaggerJsdoc = require('swagger-jsdoc');
//
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
//
//     // ✅ Multiple servers
//     servers: [
//       {
//         url: 'http://localhost:5000/api/v1',
//         description: 'Local Development',
//       },
//
//       {
//         url: 'http://localhost:7000/api/v1',
//         description: 'Local Development',
//       },
//
//       {
//         url: 'https://cherry.dealdrivetechnology.com/api/v1',
//         description: 'staging',
//       },
//
//     ],
//
//     components: {
//       securitySchemes: {
//         bearerAuth: {
//           type: 'http',
//           scheme: 'bearer',
//           bearerFormat: 'JWT',
//         },
//       },
//     },
//
//     security: [
//       {
//         bearerAuth: [],
//       },
//     ],
//   },
//
//   apis: ['./src/routes/*.js'],
// };
//
// const swaggerSpec = swaggerJsdoc(options);
//
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
        description: 'Local Development',
      },
      {
        url: 'http://localhost:7000/api/v1',
        description: 'Local Development',
      },
      {
        url: 'https://cherry.dealdrivetechnology.com/api/v1',
        description: 'Staging',
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

    // ✅ Removed global security here
    // security: [{ bearerAuth: [] }],   // ← Do NOT keep this
  },

  apis: ['./src/routes/*.js'],   // Make sure this includes both public and admin route files
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerSpec };