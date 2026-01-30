import React, { useState } from 'react';
import BoardList from '../components/BoardList';
import TodoList from '../components/TodoList';

const Dashboard = () => {
    const [selectedBoardId, setSelectedBoardId] = useState(null);

    return (
        <div className="flex h-[calc(100vh-64px)] bg-gray-100 overflow-hidden">
            {/* Sidebar - Mobile: Hidden when board selected, Desktop: Always visible */}
            <div className={`w-full md:w-1/4 md:min-w-[250px] bg-white border-r border-gray-200 overflow-y-auto scrollbar-hide ${selectedBoardId ? 'hidden md:block' : 'block'}`}>
                <BoardList
                    selectedBoardId={selectedBoardId}
                    onSelectBoard={setSelectedBoardId}
                />
            </div>

            {/* Main Content - Mobile: Hidden when NO board selected, Desktop: Always visible */}
            <div className={`flex-1 overflow-y-auto scrollbar-hide p-4 md:p-8 ${selectedBoardId ? 'block' : 'hidden md:block'}`}>
                {selectedBoardId ? (
                    <TodoList
                        boardId={selectedBoardId}
                        onBack={() => setSelectedBoardId(null)}
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                        Select a board to view tasks, or create a new one.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
