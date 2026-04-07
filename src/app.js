// const express = require('express');
// const cors = require('cors');
// const helmet = require('helmet');
// const rateLimit = require('express-rate-limit');
// const dotenv = require('dotenv');
// const swaggerUi = require('swagger-ui-express');
// const { swaggerSpec } = require('./utils/swagger');
// const database = require('./config/database');
// const routes = require('./routes');
// const errorMiddleware = require('./middlewares/error.middleware');
// const ApiError = require('./utils/ApiError');

// dotenv.config();

// const app = express();
// const PORT = parseInt(process.env.PORT || '5000', 10);

// // Middlewares
// app.use(helmet());
// app.use(cors({
//   origin: process.env.FRONTEND_URL || 'http://localhost:3000',
//   credentials: true,
// }));

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   message: 'Too many requests from this IP, please try again later.',
// });
// app.use('/api', limiter);

// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// // Swagger
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// // Health check
// app.get('/health', (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: 'Server is running',
//     timestamp: new Date().toISOString(),
//   });
// });

// // Routes
// app.use('/api/v1', routes);

// // 404 handler
// app.use((req, res, next) => {
//   next(new ApiError(404, `Route ${req.originalUrl} not found`));
// });

// // Error handler
// app.use(errorMiddleware);

// // Database connection and server start
// database.connect().then(() => {
//   app.listen(PORT, () => {
//     console.log(`🚀 Server is running on port ${PORT}`);
//     console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
//     console.log(`🏥 Health check: http://localhost:${PORT}/health`);
//   });
// }).catch((error) => {
//   console.error('Failed to connect to database:', error);
//   process.exit(1);
// });

// module.exports = app;


























const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./utils/swagger');   // Must export the spec directly
const database = require('./config/database');
const routes = require('./routes');
const errorMiddleware = require('./middlewares/error.middleware');
const ApiError = require('./utils/ApiError');

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '5000', 10);

// Multiple Frontend URLs for CORS
const allowedOrigins = process.env.FRONTEND_URLS
  ? process.env.FRONTEND_URLS.split(',')
      .map(url => url.trim())
      .filter(Boolean)
  : ['http://localhost:3000'];

// CORS Middleware
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    callback(new Error(`CORS Error: Origin ${origin} not allowed`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  exposedHeaders: ['Content-Range', 'X-Content-Range']
}));

// Security
app.use(helmet());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter);

// Body Parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ==================== SWAGGER SETUP ====================
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  explorer: true,
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
  },
}));

// Expose raw OpenAPI JSON spec (very useful for debugging)
app.get('/api-docs/json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
// =======================================================

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// Main API Routes
app.use('/api/v1', routes);

// 404 Handler
app.use((req, res, next) => {
  next(new ApiError(404, `Route ${req.originalUrl} not found`));
});

// Global Error Handler
app.use(errorMiddleware);

// Start Server
database.connect().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📚 Swagger UI: http://localhost:${PORT}/api-docs`);
    console.log(`📄 Raw Spec: http://localhost:${PORT}/api-docs/json`);
    console.log(`🏥 Health Check: http://localhost:${PORT}/health`);
    console.log(`✅ Allowed CORS Origins: ${allowedOrigins.join(', ')}`);
  });
}).catch((error) => {
  console.error('❌ Failed to connect to database:', error);
  process.exit(1);
});

module.exports = app;