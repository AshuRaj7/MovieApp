import React from 'react';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="flex items-center justify-between bg-black text-white p-4 shadow-lg">
      {/* Toggle Sidebar Button */}
      <button
        className="text-2xl text-white bg-black-900 rounded-lg p-2 hover:bg-gray-800 transition duration-300 ease-in-out"
        onClick={toggleSidebar}
      >
        ☰

      </button>

      {/* Search Bar */}
      <div className="flex items-center bg-gray-700 rounded-lg overflow-hidden mx-auto">
        <input
          type="search"
          placeholder="Search..."
          className="bg-gray-700 text-white placeholder-gray-400 px-6 py-2 focus:outline-none w-64"
        />
        <i className="fas fa-search text-gray-400 px-3"></i>
      </div>
    </header>
  );
};

export default Header;