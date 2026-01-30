import React, { useState } from 'react';
import api from '../api/axios';
import { FaTrash, FaCheck, FaEdit, FaTimes, FaCalendarAlt } from 'react-icons/fa';
import ConfirmationModal from './ConfirmationModal';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(todo.title);
    const [description, setDescription] = useState(todo.description || '');
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const toggleStatus = async () => {
        try {
            const newStatus = todo.status === 'completed' ? 'pending' : 'completed';
            const res = await api.put(`/todos/${todo._id}`, { status: newStatus });
            onUpdate(res.data.data);
        } catch (err) {
            alert('Failed to update status');
        }
    };

    const confirmDelete = async () => {
        try {
            await api.delete(`/todos/${todo._id}`);
            onDelete(todo._id);
        } catch (err) {
            alert('Failed to delete task');
        }
        setShowDeleteModal(false);
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        if (title.trim() === todo.title && description.trim() === (todo.description || '')) {
            setIsEditing(false);
            return;
        }

        try {
            const res = await api.put(`/todos/${todo._id}`, { title, description });
            onUpdate(res.data.data);
            setIsEditing(false);
        } catch (err) {
            alert('Failed to update task');
        }
    };

    // Date formatting
    const date = new Date(todo.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
    });

    return (
        <div className={`group bg-white p-4 rounded-xl shadow-sm border border-transparent hover:shadow-md transition-all duration-200 relative overflow-hidden ${todo.status === 'completed' ? 'bg-gray-50 opacity-75' : 'hover:border-purple-100'}`}>

            {/* Accent Bar - Hidden when completed */}
            {todo.status !== 'completed' && (
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-purple-500 rounded-l-xl"></div>
            )}

            <div className="flex items-center pl-3">
                {/* Checkbox Circle */}
                <button
                    onClick={toggleStatus}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 transition-all duration-200 flex-shrink-0 ${todo.status === 'completed'
                        ? 'bg-purple-500 border-purple-500 text-white'
                        : 'border-gray-300 text-transparent hover:border-purple-400'
                        }`}
                >
                    <FaCheck size={10} />
                </button>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    {isEditing ? (
                        <form onSubmit={handleEdit} className="flex flex-col space-y-2">
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-3 py-1.5 border border-purple-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-gray-800 bg-purple-50/30 font-medium"
                                autoFocus
                            />
                            <div className="flex justify-end space-x-2">
                                <button type="submit" className="text-xs bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700">Save</button>
                                <button type="button" onClick={() => setIsEditing(false)} className="text-xs bg-gray-200 text-gray-600 px-3 py-1 rounded hover:bg-gray-300">Cancel</button>
                            </div>
                        </form>
                    ) : (
                        <div className="flex items-center justify-between">
                            <span
                                onClick={() => setIsEditing(true)}
                                className={`font-medium text-gray-900 truncate cursor-pointer select-none text-base ${todo.status === 'completed' ? 'text-gray-400 line-through' : ''}`}
                            >
                                {todo.title}
                            </span>
                        </div>
                    )}
                </div>

                {/* Meta & Actions */}
                {!isEditing && (
                    <div className="flex items-center ml-4 space-x-4">
                        <div className="flex items-center text-xs text-gray-400 font-medium bg-gray-50 px-2 py-1 rounded-md">
                            <FaCalendarAlt className="mr-1.5" size={12} />
                            <span>{date}</span>
                        </div>

                        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="p-1.5 text-gray-400 hover:text-purple-600 rounded hover:bg-purple-50 transition-colors"
                            >
                                <FaEdit size={14} />
                            </button>
                            <button
                                onClick={() => setShowDeleteModal(true)}
                                className="p-1.5 text-gray-400 hover:text-red-500 rounded hover:bg-red-50 transition-colors"
                            >
                                <FaTrash size={14} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <ConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={confirmDelete}
                title="Delete Task?"
                message="Are you sure you want to delete this task? This action cannot be undone."
            />
        </div>
    );
};

export default TodoItem;
