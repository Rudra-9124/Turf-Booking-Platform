import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, CircularProgress, TextField, MenuItem, Button, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { DatePicker } from '@mui/x-date-pickers'; 
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'; 
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'; 
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VenueReviewPage = () => {
  const [loading, setLoading] = useState(true);
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const location = useLocation();
  const { venue } = location.state || {};
  const unavailableSlots = ['10:00 AM', '11:00 AM', '2:00 PM'];
  const navigate = useNavigate();
  const[userdata,setUserdata] = useState(
    {
      username:'',
       email:''
    }
  )
  // Static time slots between 6 AM to 12 AM (1-hour intervals)
  const timeSlots = Array.from({ length: 18 }, (_, i) => {
    const hour = 6 + i;
    const formattedHour = hour <= 12 ? `${hour} AM` : `${hour - 12} PM`;
    return formattedHour;
  });

  // Simulating data fetching or loading
  useEffect(() => {
    if (venue) {
      setLoading(false);
    } else {
      setLoading(false);
    }
    setUserdata({
      username:localStorage.getItem('username'),
      email:localStorage.getItem('email')
    })
  }, [venue]);

  // Handle form submission
  const handleBooking = async () => {
    const token = localStorage.getItem('token'); 
    if (!token) {
      alert('You need to log in first.');
      return;
    }
  
    if (selectedSport && selectedTime && selectedDate) {
      const bookingData = {
        user: userdata.username,
        venue_name: venue.name,
        sport: selectedSport,
        date: selectedDate.toISOString().split('T')[0],
        time: selectedTime,
        price: venue.price,
        email: userdata.email, 
      };
      console.log(bookingData);  // Log the data before making the request

      navigate('/payment', {state: {bookingData}})
    } else {
      alert('Please select a sport, time, and date.');
    }
  };
  

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!venue) {
    return <Typography variant="h6">Venue details not available.</Typography>;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)',
          padding: '40px 20px',
        }}
      >
        <Paper
          elevation={10}
          sx={{
            maxWidth: '900px',
            margin: '0 auto',
            padding: '40px',
            borderRadius: '15px',
            backgroundColor: 'white',
          }}
        >
          {/* Venue Title Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h3"
              align="center"
              sx={{ fontWeight: 'bold', color: '#333', marginBottom: '20px' }}
            >
              {venue.name}
            </Typography>
            <Typography variant="h6" align="center" color="textSecondary">
              {venue.location}
            </Typography>
          </motion.div>

          {/* Price Display Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Typography variant="h6" align="center" sx={{ fontWeight: '600', marginTop: '30px', marginBottom: '20px' }}>
              Venue Price
            </Typography>
            <Typography variant="body1" align="center" sx={{ marginBottom: '20px', fontSize: '20px' }}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <CurrencyRupeeIcon sx={{ marginRight: '5px' }} />
                {venue.price}
              </Box>
            </Typography>
          </motion.div>

          {/* Date, Sport & Time Selection Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Grid container spacing={3} sx={{ marginTop: '40px' }}>
              <Grid item xs={12} md={4} sm={4} mt={2}>
                {/* Date Picker for selecting booking date */}
                <DatePicker
                  label="Choose Date"
                  value={selectedDate}
                  onChange={(newDate) => setSelectedDate(newDate)}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth margin="normal" variant="outlined" />
                  )}
                  minDate={new Date()} // Prevent past dates selection
                />
              </Grid>

              <Grid item xs={12} md={4} sm={4}>
                <TextField
                  select
                  fullWidth
                  label="Choose Sport"
                  value={selectedSport}
                  onChange={(e) => setSelectedSport(e.target.value)}
                  variant="outlined"
                  margin="normal"
                  sx={{ backgroundColor: 'white', borderRadius: '8px' }}
                  InputProps={{
                    startAdornment: (
                      <SportsSoccerIcon sx={{ color: 'primary.main', marginRight: 1 }} />
                    ),
                  }}
                >
                  {venue.sports && venue.sports.length > 0
                    ? venue.sports.split(',').map((sport, index) => (
                        <MenuItem key={index} value={sport.trim()}>
                          {sport.trim()}
                        </MenuItem>
                      ))
                    : (
                      <MenuItem disabled>No sports available</MenuItem>
                    )}
                </TextField>
              </Grid>

              <Grid item xs={12} md={4} sm={4}>
                <TextField
                  select
                  fullWidth
                  label="Choose Time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  variant="outlined"
                  margin="normal"
                  sx={{ backgroundColor: 'white', borderRadius: '8px' }}
                  InputProps={{
                    startAdornment: (
                      <AccessTimeIcon sx={{ color: 'primary.main', marginRight: 1 }} />
                    ),
                  }}
                >
                  {timeSlots.map((time) => (
                    <MenuItem key={time} value={time} disabled={unavailableSlots.includes(time)}>
                      {time} {unavailableSlots.includes(time) && '(Unavailable)'}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </motion.div>

          {/* Booking Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{ marginTop: '40px', padding: '15px 0', borderRadius: '8px', fontSize: '18px' }}
              onClick={handleBooking}
            >
              Book Now
            </Button>
          </motion.div>
        </Paper>
      </Box>
    </LocalizationProvider>
  );
};

export default VenueReviewPage;
