import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Button, Card, CardMedia, CardContent, Breadcrumbs, Link } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CheckCircleOutlineSharpIcon from '@mui/icons-material/CheckCircleOutlineSharp';
import LeafletMap from '../components/LeafletMap'; // Adjust the path as needed


const VenueDetail = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });

  const getCoordinates = async (address) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
      const data = await response.json();
      if (data.length > 0) {
        setCoordinates({
          latitude: data[0].lat,
          longitude: data[0].lon,
        });
      } else {
        console.error('No results found');
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
    }
  };
  
  const handleBookNow = async () => {
    try {
      // Fetch the venue price and generate payment link from the Django backend
      console.log("Venue ID to send:", id);
      const response = await axios.post('http://127.0.0.1:8000/create-order/', {
        venue_id: id, // Sending the venue ID to get the price
      });
      
      // Extract payment link from the response
      console.log(response.data);
      const { payment_link } = response.data;

      // Redirect to Cashfree payment page
      window.location.href = payment_link;
    } catch (error) {
      console.error('Error in booking payment:', error);
    }
  };

  useEffect(() => {
    console.log("Fetching venue with id:", id);  // Debugging step
    const fetchVenue = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/venue/${id}/`);
        setVenue(response.data);
        getCoordinates(response.data.area); // Call the function with the venue's location
      } catch (error) {
        console.error('Failed to fetch venue details', error);
      }
    };

    fetchVenue();
  }, [id]);

  if (!venue) {
    return <Typography>Failed to load venue details. Please try again later.</Typography>;
  }

  const {
    name,
    area,
    location,
    price,
    image,
    facility,
    time,
    sports,
  } = venue;

  return (
    <>
    <Navbar />
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={4}>
        {/* Left Side */}
        <Grid item xs={12} md={8}>
            {/* Breadcrumb Navigation */}
            <Breadcrumbs aria-label="breadcrumb" sx={{ paddingLeft: 2, paddingBottom: 1 }}>
                <Link underline="hover" color="inherit" href="/book">
                  Venues
                </Link>
                <Link underline="hover" color="inherit" href={`/`}>
                  {area}
                </Link>
                <Typography color="text.primary">{name}</Typography>
              </Breadcrumbs>
          <Box sx={{ bgcolor: '#f9f9f9', padding: 3, borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom>
              {name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {area} . Ratings: ⭐
              <Button variant="text" sx={{ color: 'green', marginLeft: 1 }}>
                Rate Venue
              </Button>
            </Typography>
            <Card>
              <CardMedia
                component="img"
                height="500"
                image={image}
                alt={name}
                sx={{ objectFit: 'cover' }}
              />
            </Card>
            <Box sx={{ marginTop: 5, border: '1px solid',borderColor: '#d6d6d6', p:2, borderRadius: 3 }}>
              <Typography variant="h6">Facilities:</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', marginTop: 1 }}>
                {facility.split(',').map((fac, index) => (
                  <Box
                    key={index}
                    sx={{
                      borderRadius: 2,
                      padding: 1,
                      marginRight: 1,
                      marginBottom: 1, display: 'flex', gap: 1,
                    }}
                  >
                    <CheckCircleOutlineSharpIcon sx={{color: 'green'}} />{fac}
                  </Box>
                ))}
              </Box>
            </Box>
            <Box sx={{ marginTop: 5, border: '1px solid',borderColor: '#d6d6d6', p:2, borderRadius: 3 }}>
              <Typography variant="h6">Sports:</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', marginTop: 1 }}>
                {sports.split(',').map((fac, index) => (
                  <Box
                    key={index}
                    sx={{
                      borderRadius: 2,
                      padding: 1,
                      marginRight: 1,
                      marginBottom: 1, display: 'flex', gap: 1,
                    }}
                  >
                    <CheckCircleOutlineSharpIcon sx={{color: 'green'}} />{fac}
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* Right Side */}
        <Grid item xs={12} md={4}>
          <Box sx={{ padding: 3, borderRadius: 2 }}>
            <Box sx={{p:3}}>
              <Button variant="contained" color="success" fullWidth onClick={handleBookNow}>
                Book Now
              </Button>
            </Box>
            <Box sx={{ marginTop: 2, display: 'flex', alignItems: 'center', border: '1px solid',borderColor: '#e8e8e8', p:2, borderRadius: 3, gap: '2px' }}>
              <ShareIcon sx={{ marginRight: 1 }} />
              <Button variant="text" sx={{ color: 'black' }}>Share this Venue</Button>
            </Box>
            <Box sx={{ marginTop: 2, border: '1px solid',borderColor: '#e8e8e8', p:2, borderRadius: 3}}>
              <Typography variant="h6">Timings:</Typography>
              <Typography variant="body1">{time}</Typography>
            </Box>
            <Box sx={{ marginTop: 2, border: '1px solid',borderColor: '#e8e8e8', p:2, borderRadius: 3 }}>
              <Typography variant="h6">Location:</Typography>
              <Typography variant="body1">{location}</Typography>
              <Typography></Typography>
              <Box sx={{ mt: 3}}>
                {coordinates.latitude && coordinates.longitude && (
                  <LeafletMap latitude={coordinates.latitude} longitude={coordinates.longitude} />
                )}
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
    <Footer />
    </>
  );
};

export default VenueDetail;
