import React, { useEffect, useState, useCallback } from 'react';
import api from '../api/axios';
import TodoItem from './TodoItem';
import { useLayout } from '../context/LayoutContext';
import { FaPlus, FaArrowLeft, FaTimes } from 'react-icons/fa';


// Circular Progress Component
const CircularProgress = ({ value }) => {
    const [animatedValue, setAnimatedValue] = useState(0);

    useEffect(() => {
        // Animate to new value
        const timer = setTimeout(() => {
            setAnimatedValue(value);
        }, 100);
        return () => clearTimeout(timer);
    }, [value]);

    const radius = 56;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (animatedValue / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center">
            <svg className="transform -rotate-90 w-32 h-32">
                <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#7C3AED" />
                        <stop offset="100%" stopColor="#EC4899" />
                    </linearGradient>
                </defs>
                <circle
                    cx="64"
                    cy="64"
                    r={radius}
                    stroke="#F3F4F6"
                    strokeWidth="8"
                    fill="transparent"
                />
                <circle
                    cx="64"
                    cy="64"
                    r={radius}
                    stroke="url(#progressGradient)"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-gray-900">{value}%</span>
                <span className="text-sm text-gray-500 font-medium">Complete</span>
            </div>
        </div>
    );
};

// Linear Progress Component (Mobile)
const LinearProgress = ({ value }) => {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setWidth(value);
        }, 100);
        return () => clearTimeout(timer);
    }, [value]);

    return (
        <div className="w-full">
            <div className="flex justify-between items-end mb-2">
                <div>
                    <span className="text-2xl font-bold text-gray-900">{value}%</span>
                    <span className="text-sm text-gray-500 font-medium ml-2">Complete</span>
                </div>
            </div>
            <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${width}%` }}
                ></div>
            </div>
        </div>
    );
};

const TodoList = ({ board, onBack }) => {
    const { setBoardStats } = useLayout();
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, pending, completed
    const [newTodoTitle, setNewTodoTitle] = useState('');
    const [newTodoDescription, setNewTodoDescription] = useState('');
    const [isMobileAddOpen, setIsMobileAddOpen] = useState(false);

    const fetchTodos = useCallback(async () => {
        setLoading(true);
        try {
            // Fetch all todos to calculate counts client-side
            const res = await api.get(`/boards/${board._id}/todos`);
            setTodos(res.data.data);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    }, [board._id]);

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    // Calculate counts & stats
    const totalTasks = todos.length;
    const completedTasks = todos.filter(t => t.status === 'completed').length;
    const pendingTasks = todos.filter(t => t.status === 'pending').length;
    const completionPercentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    // Sync stats to global layout context
    useEffect(() => {
        setBoardStats({ completion: completionPercentage });
        return () => setBoardStats(null); // Cleanup on unmount
    }, [completionPercentage, setBoardStats]);

    const handleCreateTodo = async (e) => {
        e.preventDefault();
        if (!newTodoTitle.trim()) return;

        try {
            const res = await api.post(`/boards/${board._id}/todos`, {
                title: newTodoTitle,
                description: newTodoDescription
            });
            // We can just add it to the top since we have all data now
            setTodos([res.data.data, ...todos]);
            setNewTodoTitle('');
            setNewTodoDescription('');
            setIsMobileAddOpen(false);
        } catch (err) {
            alert('Failed to create todo');
        }
    };

    const handleUpdateTodo = (updatedTodo) => {
        setTodos(todos.map(t => t._id === updatedTodo._id ? updatedTodo : t));
    };

    const handleDeleteTodo = (id) => {
        setTodos(todos.filter(t => t._id !== id));
    };

    const counts = {
        all: totalTasks,
        pending: pendingTasks,
        completed: completedTasks
    };

    // Filter for display
    const visibleTodos = todos.filter(t => {
        if (filter === 'all') return true;
        return t.status === filter;
    });


    return (
        <div className="max-w-6xl mx-auto px-6 py-4 md:py-8">
            {/* Stats Dashboard */}
            <div className="hidden md:flex flex-col md:flex-row items-center gap-6 mb-12">
                {/* 1. Progress Ring (Desktop) */}
                <div className="hidden md:block bg-transparent flex-shrink-0">
                    <CircularProgress value={completionPercentage} />
                </div>

                {/* 2. Stats Cards */}
                <div className="hidden md:grid flex-1 grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    {/* Total Tasks */}
                    <div className="bg-white rounded-xl p-6 shadow-sm flex items-center gap-4">
                        <div className="p-3 bg-purple-100/50 text-purple-600 rounded-xl">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <div>
                            <span className="block text-2xl font-bold text-gray-900 leading-none mb-1">{totalTasks}</span>
                            <span className="text-sm text-gray-500 font-medium">Total Tasks</span>
                        </div>
                    </div>

                    {/* Pending */}
                    <div className="bg-white rounded-xl p-6 shadow-sm flex items-center gap-4">
                        <div className="p-3 bg-orange-100/50 text-orange-500 rounded-xl">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <span className="block text-2xl font-bold text-gray-900 leading-none mb-1">{pendingTasks}</span>
                            <span className="text-sm text-gray-500 font-medium">Pending</span>
                        </div>
                    </div>

                    {/* Completed */}
                    <div className="bg-white rounded-xl p-6 shadow-sm flex items-center gap-4">
                        <div className="p-3 bg-green-100/50 text-green-500 rounded-xl">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <span className="block text-2xl font-bold text-gray-900 leading-none mb-1">{completedTasks}</span>
                            <span className="text-sm text-gray-500 font-medium">Completed</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                <div>
                    <div className="flex items-center gap-3">
                        <button onClick={onBack} className="md:hidden text-gray-500 hover:text-gray-700">
                            <FaArrowLeft />
                        </button>
                        <h1 className="text-3xl font-bold text-gray-900">{board.name}</h1>
                    </div>
                    <p className="text-gray-500 mt-1">Manage your daily goals efficiently</p>
                </div>

                {/* Filter Pills */}
                <div className="flex space-x-2 mt-4 md:mt-0 bg-white p-1 rounded-lg border border-gray-100 shadow-sm">
                    {['all', 'pending', 'completed'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${filter === f
                                ? 'bg-purple-600 text-white shadow-sm'
                                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                                }`}
                        >
                            <span className="capitalize">{f}</span>
                            <span className={`ml-2 text-xs py-0.5 px-1.5 rounded-full ${filter === f ? 'bg-white/20' : 'bg-gray-100 text-gray-500'}`} >
                                {counts[f]}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Desktop Add Form */}
            <form onSubmit={handleCreateTodo} className="hidden md:block mb-10">
                <div className="flex gap-4">
                    <div className="relative flex-1 group">
                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                            <FaPlus className="text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="What needs to be done today?"
                            className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 transition-all placeholder-gray-400 font-medium"
                            value={newTodoTitle}
                            onChange={(e) => setNewTodoTitle(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-purple-500 text-white px-8 py-3 rounded-2xl hover:bg-purple-600 font-bold shadow-lg shadow-purple-200 transition-all flex items-center space-x-2 transform active:scale-95"
                    >
                        {/* Lightning Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                        </svg>
                        <span>Add Task</span>
                    </button>
                </div>
            </form>

            {/* Mobile Add Task Modal */}
            {isMobileAddOpen && (
                <div className="fixed inset-0 z-50 flex items-end justify-center md:hidden">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileAddOpen(false)}></div>
                    <div className="bg-white w-full rounded-t-3xl p-6 shadow-2xl animate-slideUp relative z-10">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900">New Task</h3>
                            <button onClick={() => setIsMobileAddOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 bg-gray-50 rounded-full">
                                <FaTimes size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleCreateTodo}>
                            <input
                                type="text"
                                placeholder="What needs to be done?"
                                className="w-full px-5 py-4 bg-gray-50 border border-transparent rounded-2xl mb-4 focus:bg-white focus:ring-2 focus:ring-purple-500/50 outline-none text-lg font-medium transition-colors"
                                value={newTodoTitle}
                                onChange={(e) => setNewTodoTitle(e.target.value)}
                                autoFocus
                                required
                            />
                            <textarea
                                placeholder="Add details (optional)..."
                                className="w-full px-5 py-4 bg-gray-50 border border-transparent rounded-2xl mb-6 focus:bg-white focus:ring-2 focus:ring-purple-500/50 outline-none resize-none h-32 text-base transition-colors"
                                value={newTodoDescription}
                                onChange={(e) => setNewTodoDescription(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="w-full bg-purple-600 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-purple-200 active:scale-95 transition-transform flex items-center justify-center space-x-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                                </svg>
                                <span>Add Task</span>
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Task List */}
            <div className="space-y-4">
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600"></div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {visibleTodos.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-24 text-center">
                                <div className="w-20 h-20 bg-purple-100/50 rounded-3xl flex items-center justify-center mb-6 text-purple-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">No tasks yet</h3>
                                <p className="text-gray-500 max-w-sm mx-auto">
                                    Add your first task above to get started with organizing your day!
                                </p>
                            </div>
                        ) : (
                            visibleTodos.map(todo => (
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
                className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-purple-600 text-white rounded-full shadow-2xl shadow-purple-400/50 flex items-center justify-center hover:bg-purple-700 active:scale-90 transition-all z-40"
            >
                <FaPlus size={24} />
            </button>
        </div>
    );
};

export default TodoList;
