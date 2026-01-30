const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Todo title is required'],
        trim: true
    },
    description: {
        type: String,
        trim: true,
        default: ''
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    },
    boardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board',
        required: true,
        index: true
    },
    userId: {
        type: String,
        required: true,
        index: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Todo', todoSchema);
