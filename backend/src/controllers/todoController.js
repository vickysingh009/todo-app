const Todo = require('../models/Todo');
const Board = require('../models/Board');

// @desc    Get todos for a board
// @route   GET /api/boards/:boardId/todos
// @access  Private
const getTodos = async (req, res, next) => {
    try {
        const { boardId } = req.params;
        const { status } = req.query;

        // Verify board ownership
        const board = await Board.findById(boardId);
        if (!board) {
            res.status(404);
            throw new Error('Board not found');
        }

        if (board.userId !== req.user.uid) {
            res.status(401);
            throw new Error('User not authorized');
        }

        let query = { boardId };
        if (status && status !== 'all') {
            const statusFilter = status.toLowerCase(); // 'pending' or 'completed'
            if (['pending', 'completed'].includes(statusFilter)) {
                query.status = statusFilter;
            }
        }

        const todos = await Todo.find(query).sort({ createdAt: -1 });

        res.status(200).json({ success: true, data: todos });
    } catch (error) {
        next(error);
    }
};

// @desc    Create a todo
// @route   POST /api/boards/:boardId/todos
// @access  Private
const createTodo = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        const { boardId } = req.params;

        if (!title) {
            res.status(400);
            throw new Error('Please add a title');
        }

        const board = await Board.findById(boardId);
        if (!board) {
            res.status(404);
            throw new Error('Board not found');
        }

        if (board.userId !== req.user.uid) {
            res.status(401);
            throw new Error('User not authorized');
        }

        const todo = await Todo.create({
            title,
            description,
            boardId,
            userId: req.user.uid,
            status: 'pending'
        });

        res.status(201).json({ success: true, data: todo });
    } catch (error) {
        next(error);
    }
};

// @desc    Update a todo
// @route   PUT /api/todos/:id
// @access  Private
const updateTodo = async (req, res, next) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            res.status(404);
            throw new Error('Todo not found');
        }

        if (todo.userId !== req.user.uid) {
            res.status(401);
            throw new Error('User not authorized');
        }

        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json({ success: true, data: updatedTodo });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a todo
// @route   DELETE /api/todos/:id
// @access  Private
const deleteTodo = async (req, res, next) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            res.status(404);
            throw new Error('Todo not found');
        }

        if (todo.userId !== req.user.uid) {
            res.status(401);
            throw new Error('User not authorized');
        }

        await todo.deleteOne();

        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
};
