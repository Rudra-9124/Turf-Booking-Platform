import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Button, Card, CardMedia, CardContent, Breadcrumbs, Link, Rating, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CheckCircleOutlineSharpIcon from '@mui/icons-material/CheckCircleOutlineSharp';
import LeafletMap from '../components/LeafletMap'; // Adjust the path as needed
import { Navigate } from 'react-router-dom';

const VenueDetail = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleShare = (platform) => {
    console.log(`Share on ${platform}`);
    // You can replace the console log with the actual share functionality.
    handleClose();
  };


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
    navigate('/review', { state: { venue } });
  };

  useEffect(() => {
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
      <Box sx={{ padding: 2, backgroundColor: '#f4f4f4' }}>
        <Grid container spacing={4}>
          {/* Left Side */}
          <Grid item xs={12} md={8}>
            {/* Breadcrumb Navigation */}
            <Breadcrumbs aria-label="breadcrumb" sx={{ paddingLeft: 2, paddingBottom: 1 }}>
              <Link underline="hover" color="inherit" href="/book">Venues</Link>
              <Link underline="hover" color="inherit" href={`/`}>{area}</Link>
              <Typography color="text.primary">{name}</Typography>
            </Breadcrumbs>
            <Box sx={{ bgcolor: '#fff', padding: 3, borderRadius: 2, boxShadow: 2 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                {name}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {area} . Ratings: <Rating value={venue.rating} readOnly size="small" sx={{ mt: 1 }} />
                <Button variant="text" sx={{ color: 'green', marginLeft: 1 }}>Rate Venue</Button>
              </Typography>
              <Card>
                <CardMedia component="img" height="500" image={image} alt={name} sx={{ objectFit: 'cover' }} />
              </Card>
              <Box sx={{ marginTop: 5, border: '1px solid', borderColor: '#d6d6d6', p: 2, borderRadius: 3 }}>
                <Typography variant="h6" fontWeight="bold">Facilities:</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', marginTop: 1 }}>
                  {facility.split(',').map((fac, index) => (
                    <Card key={index} sx={{ borderRadius: 2, display: 'flex', alignItems: 'center', margin: 1, padding: 1 }}>
                      <CheckCircleOutlineSharpIcon sx={{ color: 'green', marginRight: 1 }} />
                      <Typography>{fac}</Typography>
                    </Card>
                  ))}
                </Box>
              </Box>
              <Box sx={{ marginTop: 5, border: '1px solid', borderColor: '#d6d6d6', p: 2, borderRadius: 3 }}>
                <Typography variant="h6" fontWeight="bold">Sports:</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', marginTop: 1 }}>
                  {sports.split(',').map((sport, index) => (
                    <Card key={index} sx={{ borderRadius: 2, display: 'flex', alignItems: 'center', margin: 1, padding: 1 }}>
                      <CheckCircleOutlineSharpIcon sx={{ color: 'green', marginRight: 1 }} />
                      <Typography>{sport}</Typography>
                    </Card>
                  ))}
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Right Side */}
          <Grid item xs={12} md={4} mt={4}>
            <Box sx={{ padding: 3, bgcolor: '#fff', borderRadius: 2, boxShadow: 2 }}>
              <Box sx={{ p: 3 }}>
                <Button variant="contained" color="success" fullWidth onClick={handleBookNow} sx={{ '&:hover': { bgcolor: 'darkgreen' } }}>
                  Book Now
                </Button>
              </Box>
              <Box
                sx={{
                  marginTop: 2,
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid',
                  borderColor: '#e8e8e8',
                  p: 2,
                  borderRadius: 3,
                  gap: '2px',
                }}
                onClick={handleClickOpen}
              >
                <ShareIcon sx={{ marginRight: 1 }} />
                <Button variant="text" sx={{ color: 'black' }}>
                  Share this Venue
                </Button>
              </Box>

              <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ px:16 }}>Share this Venue</DialogTitle>
                <DialogContent>
                  {/* <Typography variant="body1">Choose a platform to share:</Typography> */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
                    <Button
                      onClick={() => handleShare('Facebook')}
                      sx={{ border: '1px solid #e8e8e8', borderRadius: '50%', minWidth: '40px' }}
                    >
                      <FacebookIcon />
                    </Button>
                    <Button
                      onClick={() => handleShare('X')}
                      sx={{ border: '1px solid #e8e8e8', borderRadius: '50%', minWidth: '40px', color: 'black' }}
                    >
                      <XIcon />
                    </Button>
                    <Box
                      sx={{
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center', border: '1px solid #e8e8e8', borderRadius: '50%', minWidth: '40px',
                      }}
                    >
                      <svg width="24" height="24">
                        <defs>
                          <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{ stopColor: 'orange', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: 'purple', stopOpacity: 1 }} />
                          </linearGradient>
                        </defs>
                        <InstagramIcon sx={{ fill: 'url(#gradient4)' }} />
                      </svg>
                    </Box>
                    <Button
                      onClick={() => handleShare('X')}
                      sx={{ border: '1px solid #e8e8e8', borderRadius: '50%', minWidth: '40px', color: 'black' }}
                    >
                      <EmailIcon />
                    </Button>
                    <Button
                      onClick={() => handleShare('WhatsApp')}
                      sx={{ border: '1px solid #e8e8e8', borderRadius: '50%', minWidth: '40px', color: 'green' }}
                    >
                      <WhatsAppIcon />
                    </Button>
      
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
              <Box sx={{ marginTop: 2, border: '1px solid', borderColor: '#e8e8e8', p: 2, borderRadius: 3 }}>
                <Typography variant="h6" fontWeight="bold">Timings:</Typography>
                <Typography variant="body1">{time}</Typography>
              </Box>
              <Box sx={{ marginTop: 2, border: '1px solid', borderColor: '#e8e8e8', p: 2, borderRadius: 3 }}>
                <Typography variant="h6" fontWeight="bold">Location:</Typography>
                <Typography variant="body1">{location}</Typography>
                <Box sx={{ mt: 3 }}>
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
