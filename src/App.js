import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login'; // Use PascalCase for components
import Home from './home'; // Use PascalCase for components
import MovieDetail from './component/MovieDetail';




function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Use JSX syntax for elements */}
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} /> {/* Use JSX syntax for elements */}
        {/* <Route path='/home' element={<home movies={movies} />} /> */}
        < Route path="/movie/:imdbID" element={<MovieDetail /> } />
      </Routes>
    </Router>
  );
}

export default App;
