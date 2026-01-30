const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const boardRoutes = require('./routes/boardRoutes');
const todoRoutes = require('./routes/todoRoutes');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Health Check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

// Routes
// Note: todoRoutes is also mounted within boardRoutes
app.use('/api/boards', boardRoutes);
// Direct access to todos if needed (e.g. for PUT/DELETE by ID where boardId isn't critical for routing)
app.use('/api/todos', todoRoutes);

// Error Handler
app.use(errorHandler);

module.exports = app;
