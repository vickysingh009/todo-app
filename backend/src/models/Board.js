const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Board name is required'],
        minlength: [3, 'Board name must be at least 3 characters'],
        trim: true
    },
    userId: {
        type: String,
        required: true,
        index: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Board', boardSchema);
