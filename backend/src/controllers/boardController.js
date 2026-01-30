const Board = require('../models/Board');
const Todo = require('../models/Todo');

// @desc    Get all boards for user
// @route   GET /api/boards
// @access  Private
const getBoards = async (req, res, next) => {
    try {
        const boards = await Board.find({ userId: req.user.uid }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: boards });
    } catch (error) {
        next(error);
    }
};

// @desc    Create a new board
// @route   POST /api/boards
// @access  Private
const createBoard = async (req, res, next) => {
    try {
        const { name } = req.body;

        if (!name) {
            res.status(400);
            throw new Error('Please add a board name');
        }

        const board = await Board.create({
            name,
            userId: req.user.uid
        });

        res.status(201).json({ success: true, data: board });
    } catch (error) {
        next(error);
    }
};

// @desc    Update a board
// @route   PUT /api/boards/:id
// @access  Private
const updateBoard = async (req, res, next) => {
    try {
        const board = await Board.findById(req.params.id);

        if (!board) {
            res.status(404);
            throw new Error('Board not found');
        }

        // Check user
        if (board.userId !== req.user.uid) {
            res.status(401);
            throw new Error('User not authorized');
        }

        const updatedBoard = await Board.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json({ success: true, data: updatedBoard });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a board
// @route   DELETE /api/boards/:id
// @access  Private
const deleteBoard = async (req, res, next) => {
    try {
        const board = await Board.findById(req.params.id);

        if (!board) {
            res.status(404);
            throw new Error('Board not found');
        }

        // Check user
        if (board.userId !== req.user.uid) {
            res.status(401);
            throw new Error('User not authorized');
        }

        // Cascade delete todos
        await Todo.deleteMany({ boardId: board._id });
        await board.deleteOne();

        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getBoards,
    createBoard,
    updateBoard,
    deleteBoard
};
