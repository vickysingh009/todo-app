const express = require('express');
const router = express.Router();
const {
    getBoards,
    createBoard,
    updateBoard,
    deleteBoard
} = require('../controllers/boardController');
const { protect } = require('../middleware/authMiddleware');

// Include other resource routers
const todoRouter = require('./todoRoutes');

// Re-route into other resource routers
router.use('/:boardId/todos', todoRouter);

router.route('/')
    .get(protect, getBoards)
    .post(protect, createBoard);

router.route('/:id')
    .put(protect, updateBoard)
    .delete(protect, deleteBoard);

module.exports = router;
