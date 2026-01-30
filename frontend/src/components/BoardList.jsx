import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { FaPlus, FaTrash } from 'react-icons/fa';
import ConfirmationModal from './ConfirmationModal';

const BoardList = ({ selectedBoardId, onSelectBoard }) => {
    const [boards, setBoards] = useState([]);
    const [newBoardName, setNewBoardName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
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
            onSelectBoard(res.data.data._id);
        } catch (err) {
            alert(err.response?.data?.error || 'Failed to create board');
        }
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
        <div className="p-4 md:p-4">
            <h2 className="text-xl font-bold mb-4 text-gray-800">My Boards</h2>

            <form onSubmit={handleCreateBoard} className="mb-6 flex">
                <input
                    type="text"
                    placeholder="New Board Name"
                    className="flex-1 px-4 py-3 md:py-2 border border-gray-300 rounded-l-xl md:rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-base"
                    value={newBoardName}
                    onChange={(e) => setNewBoardName(e.target.value)}
                    minLength={3}
                    required
                />
                <button
                    type="submit"
                    className="bg-indigo-600 text-white px-5 py-3 md:px-3 md:py-2 rounded-r-xl md:rounded-r-md hover:bg-indigo-700 font-bold"
                >
                    <FaPlus />
                </button>
            </form>

            <div className="space-y-3 md:space-y-2">
                {boards.length === 0 ? (
                    <p className="text-gray-500 text-sm text-center">No boards yet.</p>
                ) : (
                    boards.map(board => (
                        <div
                            key={board._id}
                            onClick={() => onSelectBoard(board._id)}
                            className={`group flex items-center justify-between p-4 md:p-3 rounded-xl md:rounded-r-lg cursor-pointer transition-all duration-200 ease-in-out shadow-sm md:shadow-none border md:border-0 ${selectedBoardId === board._id
                                ? 'bg-indigo-50 text-indigo-700 border-indigo-200 md:border-l-4 md:border-indigo-600 md:pl-2'
                                : 'bg-white md:bg-transparent hover:bg-gray-50 text-gray-700 md:text-gray-600 hover:text-gray-900 border-gray-100 md:border-l-4 md:border-transparent md:pl-3'
                                }`}
                        >
                            <span className={`font-medium text-base truncate ${selectedBoardId === board._id ? 'font-bold' : ''}`}>
                                {board.name}
                            </span>
                            <button
                                onClick={(e) => handleDeleteClick(e, board._id)}
                                className="opacity-100 md:opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 p-2 md:p-1.5 rounded-full hover:bg-red-50 transition-all duration-200"
                                title="Delete Board"
                            >
                                <FaTrash size={14} />
                            </button>
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
