const Header = ({ toggleSidebar, query, setQuery, handleSearch, handleSearchChange, handleKeyDown, setIsFocused }) => {
  return (
    <header className="flex items-center bg-black text-white p-4 shadow-lg">
      {/* Toggle Sidebar Button */}
      <button
        className="text-2xl text-white bg-black-900 rounded-lg p-2 hover:bg-gray-800 transition duration-300 ease-in-out"
        onClick={toggleSidebar}
      >
        ☰
      </button>

      {/* Responsive Centered Search Bar with Go Button */}
      <div className="flex-grow flex justify-center items-center">
        <div className="flex flex-col sm:flex-row items-center bg-gray-700 rounded-lg overflow-hidden p-2 sm:p-0">
          <input
            type="search"
            value={query}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            placeholder="Search for a movie..."
            className="bg-gray-700 text-white placeholder-gray-400 px-4 py-2 focus:outline-none w-full sm:w-64"
            onFocus={() => setIsFocused(true)} // Set focus on input
            onBlur={() => setIsFocused(false)}  // Set focus off input
          />
        </div>
        <button
          className="text-black font-bold bg-white mt-2 sm:mt-0 sm:ml-2 px-4 py-2 rounded-lg hover:bg-green-400 transition duration-300 ease-in-out"
          style={{ fontSize: 16 }}
          onClick={handleSearch}
        >
          Go
        </button>
      </div>
    </header>
  );
};

export default Header;
