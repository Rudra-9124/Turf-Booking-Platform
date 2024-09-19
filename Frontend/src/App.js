import {React , useState , useEffect} from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Play from './pages/Play';
import Book from './pages/Book';
import About from './pages/About';
import Contact from './pages/Contact';
import Home from './Home'
import VenueDetail from './pages/VenueDetail'
import Login from './pages/Login'; 
import Register from './pages/Register';
import Payment from './pages/Payment'; 
import 'leaflet/dist/leaflet.css';
import Review from './pages/Review'
import Profile from './pages/Profile'

function App() {
  const [user, setUser] = useState(null);

    // Load user details from localStorage when the app is initialized
    useEffect(() => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');

        if (token && username) {
            setUser({ username });
        }
    }, []);

  return (
    <Router>
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/play" element={<Play />} />
         <Route path="/book" element={<Book />} />
         <Route path="/about" element={<About />} />
         <Route path="/contact" element={<Contact />} />
         <Route path="/login" element={<Login setUser={setUser} />} />
         <Route path="/register" element={<Register />} />
         <Route path="/venue/:id" element={<VenueDetail />} />
         <Route path="/payment" element={<Payment />} />
         <Route path="/review" element={<Review user={user} />} />
         <Route path="/profile" element={<Profile user={user} />} />
       </Routes>
    </Router>
  );
}

export default App;