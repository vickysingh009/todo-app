import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { FaPlus, FaTrash, FaPen } from 'react-icons/fa';
import ConfirmationModal from './ConfirmationModal';

const BoardList = ({ selectedBoardId, onSelectBoard }) => {
    const [boards, setBoards] = useState([]);
    const [newBoardName, setNewBoardName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editingBoardId, setEditingBoardId] = useState(null);
    const [editName, setEditName] = useState('');
    const [editError, setEditError] = useState('');
    const [deleteModal, setDeleteModal] = useState({ open: false, id: null });

    useEffect(() => {
        fetchBoards();
    }, []);

    const fetchBoards = async () => {
        try {
            const res = await api.get('/boards');
            setBoards(res.data.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching boards:", err.response?.data || err.message);
            setError('Failed to load boards');
            setLoading(false);
        }
    };

    const handleCreateBoard = async (e) => {
        e.preventDefault();
        if (!newBoardName.trim()) return;

        try {
            const res = await api.post('/boards', { name: newBoardName });
            setBoards([res.data.data, ...boards]);
            setNewBoardName('');
            onSelectBoard(res.data.data);
        } catch (err) {
            alert(err.response?.data?.error || 'Failed to create board');
        }
    };

    const startEditing = (board) => {
        setEditingBoardId(board._id);
        setEditName(board.name);
        setEditError('');
    };

    const handleEditChange = (e) => {
        setEditName(e.target.value);
        if (e.target.value.trim().length < 3) {
            setEditError('Min 3 chars');
        } else {
            setEditError('');
        }
    };

    const saveEditing = async () => {
        if (!editName.trim() || editName.trim().length < 3) {
            setEditError('Min 3 chars');
            return;
        }

        try {
            await api.put(`/boards/${editingBoardId}`, { name: editName });
            setBoards(boards.map(b => b._id === editingBoardId ? { ...b, name: editName } : b));
            setEditingBoardId(null);
            setEditError('');
        } catch (err) {
            setEditError('Failed to save');
        }
    };

    const cancelEditing = () => {
        setEditingBoardId(null);
        setEditName('');
        setEditError('');
    };

    const confirmDeleteBoard = async () => {
        if (!deleteModal.id) return;
        try {
            await api.delete(`/boards/${deleteModal.id}`);
            setBoards(boards.filter(b => b._id !== deleteModal.id));
            if (selectedBoardId === deleteModal.id) {
                onSelectBoard(null);
            }
        } catch (err) {
            alert('Failed to delete board');
        }
        setDeleteModal({ open: false, id: null });
    };

    const handleDeleteClick = (e, id) => {
        e.stopPropagation();
        setDeleteModal({ open: true, id });
    };

    if (loading) return <div className="p-4 text-center">Loading boards...</div>;
    if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

    return (
        <div className="p-5 h-full flex flex-col">
            <div className="flex items-center space-x-2 mb-6">
                <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">My Boards</h2>
            </div>

            <form onSubmit={handleCreateBoard} className="mb-6">
                <div className="flex shadow-sm rounded-lg overflow-hidden border border-gray-200 focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-purple-500">
                    <input
                        type="text"
                        placeholder="New Board Name"
                        className="flex-1 px-3 py-2 text-sm text-gray-700 focus:outline-none bg-white"
                        value={newBoardName}
                        onChange={(e) => setNewBoardName(e.target.value)}
                        minLength={3}
                        required
                    />
                    <button
                        type="submit"
                        className="bg-purple-600 text-white px-3 py-2 hover:bg-purple-700 transition-colors flex items-center justify-center"
                    >
                        <FaPlus size={12} />
                    </button>
                </div>
            </form>

            <div className="space-y-1 flex-1 overflow-y-auto">
                {boards.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-400 text-xs">No boards yet.</p>
                    </div>
                ) : (
                    boards.map(board => (
                        <div
                            key={board._id}
                            onClick={() => {
                                if (editingBoardId !== board._id) {
                                    onSelectBoard(board);
                                }
                            }}
                            className={`group flex items-center justify-between px-4 py-3 rounded-r-full cursor-pointer transition-all duration-200 mr-2 ${selectedBoardId === board._id
                                ? 'bg-purple-50 border-l-4 border-purple-600 text-purple-900 shadow-sm'
                                : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent hover:text-gray-900'
                                }`}
                        >
                            <div className="flex items-center flex-1 min-w-0">
                                <span className={`mr-3 ${selectedBoardId === board._id ? 'text-purple-600' : 'text-gray-400'}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                                    </svg>
                                </span>
                                {editingBoardId === board._id ? (
                                    <div className="flex-1 mr-2 relative">
                                        <input
                                            type="text"
                                            value={editName}
                                            onChange={handleEditChange}
                                            onBlur={saveEditing}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') saveEditing();
                                                if (e.key === 'Escape') cancelEditing();
                                            }}
                                            autoFocus
                                            className={`w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 ${editError ? 'border-red-500 focus:ring-red-200' : 'border-purple-300 focus:ring-purple-200'}`}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    </div>
                                ) : (
                                    <span className={`text-sm truncate flex-1 ${selectedBoardId === board._id ? 'font-bold' : 'font-medium'}`}>
                                        {board.name}
                                    </span>
                                )}
                            </div>

                            <div className={`flex items-center space-x-1 ${editingBoardId === board._id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-200`}>
                                {editingBoardId !== board._id && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            startEditing(board);
                                        }}
                                        className="text-gray-400 hover:text-purple-600 p-1.5 rounded-full hover:bg-purple-50"
                                    >
                                        <FaPen size={10} />
                                    </button>
                                )}
                                <button
                                    onClick={(e) => handleDeleteClick(e, board._id)}
                                    className="text-gray-400 hover:text-red-500 p-1.5 rounded-full hover:bg-red-50"
                                >
                                    <FaTrash size={10} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <ConfirmationModal
                isOpen={deleteModal.open}
                onClose={() => setDeleteModal({ open: false, id: null })}
                onConfirm={confirmDeleteBoard}
                title="Delete Board?"
                message="Are you sure you want to delete this board? All tasks within it will be permanently lost."
            />
        </div>
    );
};

export default BoardList;
