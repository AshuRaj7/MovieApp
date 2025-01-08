import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './component/sidebar';
import Header from './component/header';

const App = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  // Fetch default movies (e.g., trending or popular movies) on component mount
  useEffect(() => {
    const fetchDefaultMovies = async () => {
      try {
        const response = await axios.get(`http://www.omdbapi.com/?s=Batman&apikey=YOUR_API_KEY`);
        if (response.data.Search) {
          setMovies(response.data.Search);
        }
        setLoading(false);  // Set loading to false after fetching data
      } catch (error) {
        console.error('Error fetching default movies:', error);
        setLoading(false);
      }
    };

    fetchDefaultMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;  // If the query is empty, don't search

    try {
      const response = await axios.get(`http://www.omdbapi.com/?s=${query}&apikey=64bfe6bb`);
      if (response.data.Search) {
        setMovies(response.data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <Header toggleSidebar={toggleSidebar} query={query} setQuery={setQuery} handleSearch={handleSearch} />
      <div className="flex h-full">
        {isSidebarVisible && <Sidebar />}
        <div className="flex-grow p-4">
          {/* Display loading spinner if movies are loading */}
          {loading ? (
            <div className="text-center text-white">Loading movies...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {movies.length > 0 ? (
                movies.map((movie) => (
                  <div key={movie.imdbID} className="bg-gray-800 p-4 rounded-lg shadow-lg hover:scale-105 transition duration-300">
                    <img src={movie.Poster} alt={movie.Title} className="w-full h-64 object-cover mb-4 rounded" />
                    <h3 className="text-xl font-semibold text-white">{movie.Title}</h3>
                    <p className="text-gray-400">{movie.Year}</p>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center text-white">No movies found. Try searching again!</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
