import React, { useState, useEffect, useRef } from 'react';
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

  const debounceRef = useRef(null);
  const navigate = useNavigate();
  const API_KEY = process.env.REACT_APP_OMDB_API_KEY;
  const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

  useEffect(() => {
    const fetchDefaultMovies = async () => {
      try {
        const response = await axios.get(`${API_URL}&s=spider`);
        setMovies(response.data.Search || []);
      } catch (error) {
        console.error('Error fetching default movies:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDefaultMovies();
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (value) {
      debounceRef.current = setTimeout(async () => {
        try {
          const response = await axios.get(`${API_URL}&s=${value}`);
          setSuggestions(response.data.Search || []);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        }
      }, 500);
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;
    try {
      const response = await axios.get(`${API_URL}&s=${query}`);
      setMovies(response.data.Search || []);
      setSuggestions([]);
      setIsFocused(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleMovieClick = async (movie) => {
    try {
      const response = await axios.get(`${API_URL}&i=${movie.imdbID}`);
      setSelectedMovie(response.data);
      navigate(`/movie/${movie.imdbID}`);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <Header
        toggleSidebar={() => setIsSidebarVisible(!isSidebarVisible)}
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
        handleSearchChange={handleSearchChange}
        setIsFocused={setIsFocused}
      />
      <div className="flex h-full">
        {isSidebarVisible && <Sidebar />}
        <div className="flex-grow p-4 relative">
          {loading ? (
            <div className="text-center text-white">Loading movies...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {movies.length > 0 ? (
                movies.map((movie) => (
                  <div
                    key={movie.imdbID}
                    className="bg-gray-800 p-4 rounded-lg shadow-lg hover:scale-105 transition duration-300"
                    onClick={() => handleMovieClick(movie)}
                  >
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

export default Home;
