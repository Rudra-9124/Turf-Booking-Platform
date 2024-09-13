import React, { useEffect, useState, useCallback } from 'react';
import Navbar from '../components/Navbar';
import { Box, Grid, Typography, TextField, FormControl, InputLabel, Select, MenuItem, InputAdornment, Card, CardContent, CardMedia } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Footer from '../components/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

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

  // Function to fetch places
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
      <Navbar onLocationChange={setSelectedLocation}/>
      <Box sx={{ p: 1, backgroundColor: '#fff', boxShadow: 1 }}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Discover and Book Top Sports Complexes in {selectedLocation} Online
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              variant="outlined"
              label="Search Venue"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)} // Update state on input change
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth variant="filled" sx={{fontSize: '12px'}}>
              <InputLabel>Select Sport</InputLabel>
              <Select
                value={selectedSport} // Apply the selected sport from state
                onChange={(e) => {
                  const newSport = e.target.value;
                  setSelectedSport(newSport); // Update the selected sport state
                  fetchPlaces(searchInput, newSport); // Fetch venues based on the newly selected sport 
                }} // Update state when sport is selected
              >
                <MenuItem value="">All Sports</MenuItem> {/* Option to show all venues */}
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

      <Grid container spacing={8} sx={{ pl: 6, pr: 6, pb: 6, bgcolor: '#E8E8E8', my: 0.5 }}>
        {places.map((place, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card onClick={() => handleCardClick(place.id)}>
              <CardMedia
                component="img"
                height="200"
                image={place.image}
                alt={place.placeName}
              />
              <CardContent>
                <Typography variant="h6">
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
