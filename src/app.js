const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const { swaggerSpec } = require('./utils/swagger');
const database = require('./config/database');
const routes = require('./routes');
const errorMiddleware = require('./middlewares/error.middleware');
const ApiError = require('./utils/ApiError');

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '7000', 10);

/**
 * ✅ Allowed origins (supports ENV or fallback)
 * Example .env:
 * FRONTEND_URLS=http://localhost:5173,http://localhost:3000,https://yourdomain.com
 */
const allowedOrigins = process.env.FRONTEND_URLS
  ? process.env.FRONTEND_URLS.split(',')
  : [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://cherry.dealdrivetechnology.com',
      'http://localhost:5000',
      'https://investmentwebsite-backend.onrender.com',
      'https://samp2.dealdrivetechnology.com',
      'https://samples.dealdrivetechnology.com',
      'http://localhost:7000',
      'https://localhost:7000',
      'https://cherryhillsportfolio.com',
      'https://cadmin.cherryhillsportfolio.com'
    ];

// Security middleware
app.use(helmet());

// ✅ CORS configuration (multiple origins)
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without origin (Postman, curl, mobile apps)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api', limiter);

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use('/api/v1', routes);

// 404 handler
app.use((req, res, next) => {
  next(new ApiError(404, `Route ${req.originalUrl} not found`));
});

// Global error handler
app.use(errorMiddleware);

// Start server after DB connects
database
  .connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📚 API Docs: http://localhost:${PORT}/api-docs`);
      console.log(`🏥 Health: http://localhost:${PORT}/health`);
    });
  })
  .catch((error) => {
    console.error('❌ Failed to connect to database:', error);
    process.exit(1);
  });

module.exports = app;