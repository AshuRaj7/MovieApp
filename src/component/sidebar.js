import React, { useState } from 'react';

const Sidebar = () => {
  const [showAppMenu, setShowAppMenu] = useState(false);
  const [showHomeMenu, setShowHomeMenu] = useState(false);

  return (
    <div className="bg-gray-900 text-white h-screen w-64 p-4 flex flex-col shadow-lg">
      {/* Workspace Section */}
      <h3 className="text-lg font-bold uppercase mb-6 text-pink">My Workspace</h3>
      <ul className="space-y-2">
        <li>
          <a
            className="flex items-center justify-between cursor-pointer text-gray-400 py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200 ease-in-out"
          >
            Tasks
            <span className="bg-blue px-2 py-1 rounded-full text-xs text-white"></span>
          </a>
        </li>
        <li>
          <a
            className="flex items-center justify-between cursor-pointer text-gray-400 py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200 ease-in-out"
          >
            Channel
            <span className="bg-green px-2 py-1 rounded-full text-xs text-white"></span>
          </a>
        </li>
      </ul>

      {/* Technology Section */}
      <h3 className="text-lg font-bold uppercase mt-10 mb-6 text-pink">Technology</h3>
      <ul className="space-y-2">
        <li>
          <button
            onClick={() => setShowAppMenu(!showAppMenu)}
            className="flex items-center justify-between cursor-pointer text-gray-200 py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200 ease-in-out"
          >
            App
            <span>{showAppMenu ? '-' : '+'}</span>
          </button>
          {showAppMenu && (
            <ul className="pl-6 mt-2 space-y-2">
              <li>
                <a href="#architecture" className="block text-sm text-gray-400 hover:text-white">
                  Architecture
                </a>
              </li>
              <li>
                <a href="#frontend" className="block text-sm text-gray-400 hover:text-white">
                  Frontend
                </a>
              </li>
              <li>
                <a href="#backend" className="block text-sm text-gray-400 hover:text-white">
                  Backend
                </a>
              </li>
            </ul>
          )}
        </li>

        <li>
          <a
            onClick={() => setShowHomeMenu(!showHomeMenu)}
            className="flex items-center justify-between cursor-pointer text-gray-200 py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200 ease-in-out"
          >
            Home
            <span>{showHomeMenu ? '-' : '+'}</span>
          </a>
          {showHomeMenu && (
            <ul className="pl-6 mt-2 space-y-2">
              <li>
                <a href="#frontend" className="block text-sm text-gray-400 hover:text-white">
                  Frontend
                </a>
              </li>
              <li>
                <a href="#backend" className="block text-sm text-gray-400 hover:text-white">
                  Backend
                </a>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;