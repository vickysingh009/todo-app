import React, { useEffect, useState, useCallback } from 'react';
import api from '../api/axios';
import TodoItem from './TodoItem';
import { FaPlus, FaArrowLeft, FaTimes } from 'react-icons/fa';

const TodoList = ({ boardId, onBack }) => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, pending, completed
    const [newTodoTitle, setNewTodoTitle] = useState('');
    const [newTodoDescription, setNewTodoDescription] = useState('');
    const [isMobileAddOpen, setIsMobileAddOpen] = useState(false);

    const fetchTodos = useCallback(async () => {
        setLoading(true);
        try {
            const res = await api.get(`/boards/${boardId}/todos?status=${filter}`);
            setTodos(res.data.data);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    }, [boardId, filter]);

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    const handleCreateTodo = async (e) => {
        e.preventDefault();
        if (!newTodoTitle.trim()) return;

        try {
            const res = await api.post(`/boards/${boardId}/todos`, {
                title: newTodoTitle,
                description: newTodoDescription
            });
            if (filter !== 'completed') {
                setTodos([res.data.data, ...todos]);
            }
            setNewTodoTitle('');
            setNewTodoDescription('');
            setIsMobileAddOpen(false);
        } catch (err) {
            alert('Failed to create todo');
        }
    };

    const handleUpdateTodo = (updatedTodo) => {
        if (filter === 'all') {
            setTodos(todos.map(t => t._id === updatedTodo._id ? updatedTodo : t));
        } else {
            if (filter !== updatedTodo.status && filter !== 'all') {
                setTodos(todos.filter(t => t._id !== updatedTodo._id));
            } else {
                setTodos(todos.map(t => t._id === updatedTodo._id ? updatedTodo : t));
            }
        }
    };

    const handleDeleteTodo = (id) => {
        setTodos(todos.filter(t => t._id !== id));
    };

    return (
        <div className="md:max-w-4xl md:mx-auto md:px-4 md:py-6 pb-24 md:pb-6 relative">
            {/* Header: Sticky on Mobile, Flex Row on Desktop */}
            <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md md:static md:bg-transparent px-4 py-4 md:p-0 border-b border-gray-100 md:border-0 shadow-sm md:shadow-none mb-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
                    <div className="flex items-center">
                        {/* Back Button (Mobile Only) */}
                        <button
                            onClick={onBack}
                            className="mr-3 p-2 -ml-2 text-gray-600 md:hidden active:bg-gray-100 rounded-full"
                        >
                            <FaArrowLeft />
                        </button>
                        <div>
                            <h1 className="text-xl md:text-4xl font-extrabold text-gray-900 tracking-tight">Today's Tasks</h1>
                            <p className="hidden md:block text-gray-500 mt-1">Manage your daily goals efficiently</p>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex space-x-2 mt-0 md:bg-gray-100/50 md:p-1.5 md:rounded-full overflow-x-auto max-w-full pb-1 md:pb-0 scrollbar-hide">
                        {['all', 'pending', 'completed'].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-1.5 rounded-full text-sm font-semibold capitalize whitespace-nowrap transition-all duration-200 border md:border-transparent ${filter === f
                                    ? 'bg-indigo-600 text-white md:bg-white md:text-indigo-600 shadow-md md:shadow-sm transform md:scale-105 border-indigo-600'
                                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 md:hover:bg-white/50'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Desktop Add Form (Hidden on Mobile) */}
            <form onSubmit={handleCreateTodo} className="hidden md:block mb-8 relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaPlus className="text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                </div>
                <input
                    type="text"
                    placeholder="Add a new task..."
                    className="w-full pl-11 pr-4 py-4 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium text-lg placeholder-gray-400"
                    value={newTodoTitle}
                    onChange={(e) => setNewTodoTitle(e.target.value)}
                />
                <button
                    type="submit"
                    className="absolute right-2 top-2 bottom-2 bg-gray-900 text-white px-6 rounded-lg hover:bg-indigo-600 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform active:scale-95 flex items-center"
                >
                    Add Task
                </button>
            </form>

            {/* Mobile Add Task Modal */}
            {isMobileAddOpen && (
                <div className="fixed inset-0 z-50 flex items-end justify-center md:hidden">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileAddOpen(false)}></div>
                    <div className="bg-white w-full rounded-t-2xl p-6 shadow-xl animate-slideUp relative z-10">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-gray-900">New Task</h3>
                            <button onClick={() => setIsMobileAddOpen(false)} className="p-2 text-gray-500">
                                <FaTimes size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleCreateTodo}>
                            <input
                                type="text"
                                placeholder="What needs to be done?"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl mb-3 focus:ring-2 focus:ring-indigo-500/50 outline-none text-lg"
                                value={newTodoTitle}
                                onChange={(e) => setNewTodoTitle(e.target.value)}
                                autoFocus
                                required
                            />
                            <textarea
                                placeholder="Add details (optional)..."
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl mb-4 focus:ring-2 focus:ring-indigo-500/50 outline-none resize-none h-24"
                                value={newTodoDescription}
                                onChange={(e) => setNewTodoDescription(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold text-lg shadow-lg active:scale-95 transition-transform"
                            >
                                Create Task
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Task List */}
            <div className="space-y-3 px-4 md:px-0">
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
                    </div>
                ) : (
                    <div className="space-y-3 md:space-y-4">
                        {todos.length === 0 ? (
                            <div className="text-center py-20 bg-gray-50 md:bg-white rounded-2xl border-2 border-dashed border-gray-200 mx-4 md:mx-0">
                                <div className="text-gray-400 text-xl font-medium">No tasks yet</div>
                                <p className="text-gray-500 mt-2">Tap <span className="font-bold text-indigo-600">+</span> to add your first task.</p>
                            </div>
                        ) : (
                            todos.map(todo => (
                                <TodoItem
                                    key={todo._id}
                                    todo={todo}
                                    onUpdate={handleUpdateTodo}
                                    onDelete={handleDeleteTodo}
                                />
                            ))
                        )}
                    </div>
                )}
            </div>

            {/* Mobile FAB */}
            <button
                onClick={() => setIsMobileAddOpen(true)}
                className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-xl flex items-center justify-center hover:bg-indigo-700 active:scale-90 transition-all z-40"
            >
                <FaPlus size={24} />
            </button>
        </div>
    );
};

export default TodoList;
