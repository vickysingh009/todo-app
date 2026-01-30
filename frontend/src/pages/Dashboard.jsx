import React, { useState } from 'react';
import BoardList from '../components/BoardList';
import TodoList from '../components/TodoList';

const Dashboard = () => {
    const [selectedBoard, setSelectedBoard] = useState(null);

    return (
        <div className="flex h-[calc(100vh-64px)] bg-gray-100 overflow-hidden">
            {/* Sidebar - Desktop Fixed Width, Mobile Full Width */}
            <div className={`
                md:w-72 bg-white border-r border-gray-200 overflow-y-auto scrollbar-hide flex-shrink-0
                ${selectedBoard ? 'hidden md:block' : 'w-full block'}
            `}>
                <BoardList
                    selectedBoardId={selectedBoard?._id}
                    onSelectBoard={setSelectedBoard}
                />
            </div>

            {/* Main Content */}
            <div className={`
                flex-1 overflow-y-auto bg-gray-50/50 scrollbar-hide
                ${selectedBoard ? 'block' : 'hidden md:block'}
            `}>
                {selectedBoard ? (
                    <TodoList
                        board={selectedBoard}
                        onBack={() => setSelectedBoard(null)}
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <p className="text-lg font-medium">Select a board from the sidebar</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
