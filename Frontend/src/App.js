import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Play from './pages/Play';
import Book from './pages/Book';
import About from './pages/About';
import Contact from './pages/Contact';
import Home from './Home'
import VenueDetail from './pages/VenueDetail'
import Login from './pages/Login'; 
import Register from './pages/Register'; 
import 'leaflet/dist/leaflet.css';


function App() {
  return (
    <Router>
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/play" element={<Play />} />
         <Route path="/book" element={<Book />} />
         <Route path="/about" element={<About />} />
         <Route path="/contact" element={<Contact />} />
         <Route path="/login" element={<Login />} />
         <Route path="/register" element={<Register />} />
         <Route path="/venue/:id" element={<VenueDetail />} />
       </Routes>
    </Router>
  );
}

export default App;