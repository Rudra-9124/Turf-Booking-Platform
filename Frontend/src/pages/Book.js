import React, { useEffect, useState, useCallback } from 'react';
import Navbar from '../components/Navbar';
import { Box, Grid, Typography, TextField, FormControl, InputLabel, Select, MenuItem, InputAdornment, Card, CardContent, CardMedia } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Footer from '../components/Footer';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const Book = () => {
  const location = useLocation();
  const [counts, setCounts] = useState({
    venues_count: 0,
    coaching_count: 0,
    events_count: 0,
    deals_count: 0,
  });
  const [places, setPlaces] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('Ahmedabad');

  const navigate = useNavigate();

  const handleCardClick = (venueId) => {
    navigate(`/venue/${venueId}`);
  };

  const fetchPlaces = useCallback(async (query = '', sport = '', location = 'Ahmedabad') => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/venue?search=${query}&sports=${sport}&location=${location}`);
      setPlaces(response.data);
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  }, []);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await axios.get('/get-counts');
        setCounts(response.data);
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    const params = new URLSearchParams(location.search);
    const sportFromQuery = params.get('sport') || '';

    if (sportFromQuery) {
      setSelectedSport(sportFromQuery);
    }

    fetchCounts();
    fetchPlaces(searchInput, sportFromQuery || selectedSport, selectedLocation);

  }, [searchInput, selectedSport, selectedLocation, location.search, fetchPlaces]);

  return (
    <div>
      <Navbar onLocationChange={setSelectedLocation} />
      <Box sx={{ p: 2, backgroundColor: '#f5f5f5', boxShadow: 1, borderRadius: 2, mb: 3 }}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
              Discover and Book Top Sports Complexes in {selectedLocation} Online
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              variant="outlined"
              label="Search Venue"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#1976d2' }} />
                  </InputAdornment>
                ),
                sx: {
                  backgroundColor: '#fff',
                  borderRadius: 2,
                },
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth variant="outlined" sx={{ backgroundColor: '#fff', borderRadius: 2 }}>
              <InputLabel>Select Sport</InputLabel>
              <Select
                value={selectedSport}
                onChange={(e) => {
                  const newSport = e.target.value;
                  setSelectedSport(newSport);
                  fetchPlaces(searchInput, newSport);
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              >
                <MenuItem value="">All Sports</MenuItem>
                <MenuItem value="Cricket">Cricket</MenuItem>
                <MenuItem value="Tennis">Tennis</MenuItem>
                <MenuItem value="Basketball">Basketball</MenuItem>
                <MenuItem value="Badminton">Badminton</MenuItem>
                <MenuItem value="Swimming">Swimming</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={4} sx={{ px: 4, pb: 6, bgcolor: '#f0f0f0' }}>
        {places.map((place, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              onClick={() => handleCardClick(place.id)}
              sx={{
                cursor: 'pointer',
                borderRadius: 2,
                boxShadow: 4,
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={place.image}
                alt={place.placeName}
                sx={{
                  borderTopLeftRadius: '8px',
                  borderTopRightRadius: '8px',
                  objectFit: 'cover',
                }}
              />
              <CardContent sx={{ textAlign: 'center', bgcolor: '#fff', borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px' }}>
                <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                  {place.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {place.area}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Footer />
    </div>
  );
};

export default Book;
