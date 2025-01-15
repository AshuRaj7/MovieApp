import React, { useEffect, useState } from 'react';
import { useParams,Link } from 'react-router-dom';
import axios from 'axios';

const MovieDetail = () => {
  const { imdbID } = useParams();  // Extract imdbID from the URL
  console.log(imdbID)
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`http://www.omdbapi.com/?i=${imdbID}&apikey=64bfe6bb`);
        setMovie(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [imdbID]);  // Run the effect whenever imdbID changes

  if (loading) {
    return <div className="text-center text-white">Loading movie details...</div>;
  }

  if (!movie) {
    return <div className="text-center text-white">No movie details available.</div>;
  }

// const MovieDetail = () => {
//   const { id } = useParams();
//   const [movie, setMovie] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchMovieDetails = async () => {
//       try {
//         const response = await axios.get(`http://www.omdbapi.com/?i=${id}&apikey=64bfe6bb`);
//         setMovie(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching movie details:', error);
//         setLoading(false);
//       }
//     };

//     fetchMovieDetails();
//   }, [id]);

//   if (loading) {
//     return <div className="text-center text-white">Loading movie details...</div>;
//   }

  return (
    <div className="flex flex-col bg-gray-900 text-white p-4 ">
      <Link to="/home" className="text-white hover:text-green-300 font-bold mb-4 w-40">
        {"<-"}<u>Back-to-Search</u>
      </Link>
      <div className="flex flex-col sm:flex-row items-center bg-gray-800 p-4 rounded-lg shadow-lg">
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="w-full sm:w-64 h-96 object-cover rounded-lg mb-4 sm:mb-0 sm:mr-4"
        />
        <div className="flex flex-col sm:w-1/2">
          <h2 className="text-3xl font-bold">{movie.Title}</h2>
          <p className="text-lg text-gray-400">{movie.Year}</p>
          <p className="text-xl mt-2 font-semibold">Rating: {movie.imdbRating} /10.0</p>
          <p className="mt-2">{movie.Plot}</p>
          <p className="mt-2"><strong>Actors:</strong> {movie.Actors}</p>
          <p className="mt-2"><strong>Genre:</strong> {movie.Genre}</p>
          <p className="mt-2"><strong>Released:</strong> {movie.Released}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
