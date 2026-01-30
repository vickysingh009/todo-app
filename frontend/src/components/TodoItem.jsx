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
        <div className={`bg-white p-4 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 ${todo.status === 'completed' ? 'opacity-60 bg-gray-50' : ''}`}>
            <div className="flex flex-col md:flex-row md:items-center">
                {/* Mobile: Top Row (Check + Title) */}
                <div className="flex items-start md:items-center flex-1">
                    <button
                        onClick={toggleStatus}
                        className={`mt-1 md:mt-0 w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center mr-3 transition-all duration-300 ${todo.status === 'completed'
                            ? 'bg-indigo-500 border-transparent text-white'
                            : 'border-gray-300 text-transparent hover:border-indigo-400'
                            }`}
                    >
                        <FaCheck size={12} />
                    </button>

                    {isEditing ? (
                        <div className="flex-1 w-full">
                            <form onSubmit={handleEdit} className="flex flex-col space-y-2">
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full px-3 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-gray-800 bg-indigo-50/30"
                                    autoFocus
                                />
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full px-3 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm text-gray-600 bg-indigo-50/30 h-20 resize-none"
                                />
                                <div className="flex justify-end space-x-2 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => { setTitle(todo.title); setDescription(todo.description || ''); setIsEditing(false); }}
                                        className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                                    >
                                        <FaTimes />
                                    </button>
                                    <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium text-sm">
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className="flex-1 min-w-0">
                            <h3
                                onClick={() => setIsEditing(true)}
                                className={`font-bold text-gray-900 leading-snug mb-1 cursor-pointer hover:text-indigo-600 transition-colors ${todo.status === 'completed' ? 'line-through text-gray-400' : ''}`}
                            >
                                {todo.title}
                            </h3>
                            {todo.description && (
                                <p className="text-sm text-gray-500 line-clamp-2 md:hidden mb-2">
                                    {todo.description}
                                </p>
                            )}
                            <div className="flex items-center text-xs text-gray-400 md:hidden">
                                <FaCalendarAlt className="mr-1" size={10} />
                                {date}
                            </div>
                        </div>
                    )}
                </div>

                {/* Mobile: Bottom Actions / Desktop: Right Actions */}
                {!isEditing && (
                    <div className="flex justify-end mt-3 md:mt-0 md:ml-4 border-t border-gray-100 pt-2 md:border-0 md:pt-0">
                        {/* Desktop Date - Hidden on mobile */}
                        <span className="hidden md:flex items-center text-xs text-gray-400 mr-4 whitespace-nowrap">
                            <FaCalendarAlt className="mr-1.5" size={12} />
                            {date}
                        </span>

                        <div className="flex space-x-1 opacity-100 transition-opacity">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="text-gray-400 hover:text-indigo-600 p-2 rounded-lg hover:bg-indigo-50 transition-colors"
                                title="Edit Task"
                            >
                                <FaEdit size={16} />
                            </button>
                            <button
                                onClick={() => setShowDeleteModal(true)}
                                className="text-gray-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-colors"
                                title="Delete Task"
                            >
                                <FaTrash size={15} />
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
