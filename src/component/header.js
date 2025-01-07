import React from 'react';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="flex items-center bg-black text-white p-4 shadow-lg">
      {/* Toggle Sidebar Button */}
      <button
        className="text-2xl text-white bg-black-900 rounded-lg p-2 hover:bg-gray-800 transition duration-300 ease-in-out"
        onClick={toggleSidebar}
      >
        ☰
      </button>

      {/* Centered Search Bar with Go Button */}
      <div className="flex-grow flex justify-center">
        <div className="flex items-center bg-gray-700 rounded-lg overflow-hidden">
          <input
            type="search"
            placeholder="Search..."
            className="bg-gray-700 text-white placeholder-gray-400 px-4 py-2 mr-4 focus:outline-none w-64"
          />
          
        </div>

        <button
            className="text-black font-bold bg-white ml-2 px-4 py-2 rounded-lg hover:bg-green-400 transition duration-300 ease-in-out"
            style={{ fontSize: 16 }}
          >
            Go
          </button>
      </div>
    </header>
  );
};

export default Header;
