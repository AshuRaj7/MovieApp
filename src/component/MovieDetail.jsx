import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const MovieDetail = () => {
  const { imdbID } = useParams();  // Extract imdbID from the URL
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Track errors

  const API_KEY = process.env.REACT_APP_OMDB_API_KEY; // Read from env
  const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}&i=${imdbID}`);
        
        if (response.data && response.data.Response !== "False") {
          setMovie(response.data);
        } else {
          setError("Movie details not found!");
        }
      } catch (err) {
        console.error('Error fetching movie details:', err);
        setError("Failed to fetch movie details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [imdbID]);  // Run the effect whenever imdbID changes

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-white text-xl">Loading movie details...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 font-bold mt-4">{error}</div>;
  }

  if (!movie) {
    return <div className="text-center text-white">No movie details available.</div>;
  }

  return (
    <div className="flex flex-col bg-gray-900 text-white p-4 min-h-screen">
      <Link to="/home" className="text-white hover:text-green-300 font-bold mb-4">
        {"←"} <u>Back to Search</u>
      </Link>
      
      <div className="flex flex-col sm:flex-row items-center bg-gray-800 p-6 rounded-lg shadow-lg">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder-image.jpg"} // Handle missing posters
          alt={movie.Title}
          className="w-full sm:w-64 h-96 object-cover rounded-lg mb-4 sm:mb-0 sm:mr-6"
        />
        <div className="flex flex-col sm:w-2/3">
          <h2 className="text-3xl font-bold">{movie.Title}</h2>
          <p className="text-lg text-gray-400">{movie.Year}</p>
          <p className="text-xl mt-2 font-semibold">⭐ {movie.imdbRating} / 10</p>
          <p className="mt-4">{movie.Plot}</p>
          <p className="mt-2"><strong>Actors:</strong> {movie.Actors}</p>
          <p className="mt-2"><strong>Genre:</strong> {movie.Genre}</p>
          <p className="mt-2"><strong>Released:</strong> {movie.Released}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
