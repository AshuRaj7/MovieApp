import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login'; // Use PascalCase for components
import Home from './home'; // Use PascalCase for components

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Use JSX syntax for elements */}
        <Route path="/home" element={<Home />} /> {/* Use JSX syntax for elements */}
      </Routes>
    </Router>
  );
}

export default App;
