import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './component/sidebar';
import Header from './component/header';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const [debounceTimeout, setDebounceTimeout] = useState(null); // Track the debounce
  const navigate = useNavigate();
  const API_KEY = process.env.REACT_APP_OMDB_API_KEY;
  const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

  useEffect(() => {
    const fetchDefaultMovies = async () => {
      try {
        const response = await axios.get(`${API_URL}&s=spider`);
        if (response.data.Search) {
          setMovies(response.data.Search);
        }
        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error('Error fetching default movies:', error);
        setLoading(false);
      }
    };

    fetchDefaultMovies();
  }, [API_URL]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);

     // Clear previous debounce timeout if there's any
     if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    

    if (value) {
      const timeout = setTimeout(async () => {
        try {
          const response = await axios.get(`${API_URL}&s=${value}`);
          if (response.data.Search) {
            setSuggestions(response.data.Search);
          } else {
            setSuggestions([]);
          }
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        }
      }, 500); // Wait 500ms after the user stops typing

      setDebounceTimeout(timeout);
    } else {
      setSuggestions([]);
    }
  };

   // Handle the search on Enter key press
   const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return; // If the query is empty, don't search

    try {
      const response = await axios.get(`${API_URL}&s=${query}`);
      if (response.data.Search) {
        setMovies(response.data.Search);
      } else {
        setMovies([]);
      }
      setSuggestions([]); // Hide suggestions after the search
      setIsFocused(false); // Remove focus after search
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleMovieClick = async (movie) => {
    try {
      setSelectedMovie(movie);
      navigate(`/movie/${movie.imdbID}`);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <Header
        toggleSidebar={toggleSidebar}
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
        handleSearchChange={handleSearchChange}
        handleKeyDown={handleKeyDown}
        setIsFocused={setIsFocused} // Pass setter for focus state
      />
      <div className="flex h-full">
        {isSidebarVisible && <Sidebar />}
        <div className="flex-grow p-4 relative">
          {/* Display loading spinner if movies are loading */}
          {loading ? (
            <div className="text-center text-white">Loading movies...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {movies.length > 0 ? (
                movies.map((movie) => (
                  <div
                    key={movie.imdbID}
                    className="bg-gray-800 p-4 rounded-lg shadow-lg hover:scale-105 transition duration-300"
                    onClick={() => handleMovieClick(movie)} // Trigger click event
                  >
                    <img
                      src={movie.Poster}
                      alt={movie.Title}
                      className="w-full h-64 object-cover mb-4 rounded"
                    />
                    <h3 className="text-xl font-semibold text-white">{movie.Title}</h3>
                    <p className="text-gray-400">{movie.Year}</p>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center text-white">No movies found. Try searching again!</div>
              )}
            </div>
          )}

          {/* Suggestions dropdown */}
          {suggestions.length > 0 && query && isFocused && (
            <div  className="absolute top-0 left-0 right-0 bg-gray-800 rounded-lg shadow-lg mt-2 z-10 max-h-60 overflow-y-auto">
              <ul>
                {suggestions.map((movie) => (
                  <li
                    
                     key={movie.imdbID}
                     className="text-gray-300 hover:text-white cursor-pointer px-4 py-2"

                  >
                  <button
                    onMouseDown={() => {
                      handleMovieClick(movie);
                      // console.log('Clicked movie:', movie);
                    }}
                  >
                    {movie.Title}
                  </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Movie Details Modal */}
          {selectedMovie && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
              <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-3/4 md:w-1/2">
                <button
                  className="absolute top-4 right-4 text-white font-bold text-xl"
                  onClick={() => setSelectedMovie(null)} // Close the modal
                >
                  &times;
                </button>
                <img
                  src={selectedMovie.Poster}
                  alt={selectedMovie.Title}
                  className="w-full h-96 object-cover mb-4 rounded"
                />
                <h2 className="text-3xl font-bold text-white">{selectedMovie.Title}</h2>
                <p className="text-gray-400">Release Date: {selectedMovie.Released}</p>
                <p className="text-gray-400">Genre: {selectedMovie.Genre}</p>
                <p className="text-gray-400">Director: {selectedMovie.Director}</p>
                <p className="text-gray-400">Actors: {selectedMovie.Actors}</p>
                <p className="text-gray-400">Rating: {selectedMovie.imdbRating}</p>
                <p className="text-white mt-4">{selectedMovie.Plot}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
