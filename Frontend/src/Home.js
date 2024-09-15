import React from 'react';
import { Grid, Typography, Box, Card, CardMedia } from '@mui/material';
import img1 from './pages/img/home.webp';
import Container from '@mui/material/Container';
import BookVenues from './components/BookVenue';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const popularSports = [
    {
      id: 1,
      image: 'https://cdn.pixabay.com/photo/2016/05/31/23/21/badminton-1428047_640.jpg',
      sport_name: 'Badminton',
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/3657154/pexels-photo-3657154.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      sport_name: 'Cricket',
    },
    {
      id: 3,
      image: 'https://www.rockstaracademy.com/lib/images/news/basketball.jpeg',
      sport_name: 'Basketball',
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1622629797619-c100e3e67e2e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      sport_name: 'Swimming',
    },
    {
      id: 5,
      image: 'https://imageio.forbes.com/specials-images/imageserve/61290485e59b1a3c399d34e7/0x0.jpg?format=jpg&crop=2699,1519,x0,y0,safe&height=900&width=1600&fit=bounds',
      sport_name: 'Tennis',
    },
  ];
  const navigate = useNavigate();
  
  return (
    <>
      <Navbar />
      <Grid container spacing={2} alignItems="center" justifyContent="center" style={{ minHeight: '100vh' }}>
        {/* Left Side: Text */}
        <Grid item xs={12} md={6}>
          <Box sx={{ textAlign: 'left', p: 3 }}>
            <Typography variant="h3" color="textPrimary" sx={{ fontWeight: 'bold', mb: 1 }}>
              FIND PLAYERS & VENUES NEARBY
            </Typography>
            <Typography variant="h6" color="textSecondary" sx={{ fontWeight: 'medium' }}>
              Seamlessly explore sports venues and play with sports enthusiasts just like you!
            </Typography>
          </Box>
        </Grid>

        {/* Right Side: Image */}
        <Grid item xs={12} md={6}>
          <Box sx={{ textAlign: 'center', p: 5 }}>
            <img
              src={img1}
              alt="Venue or Players"
              style={{ maxWidth: '100%', borderRadius: '20px', height: 'auto', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)' }}
            />
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ bgcolor: '#F5F5F5', minHeight: '100vh', pb: 5 }}>
        <Container fixed sx={{ p: 3 }}>
          <Box
            sx={{
              bgcolor: '#fff',
              height: 'auto',
              borderRadius: '20px',
              mt: 2,
              boxShadow: 3,
              paddingTop: 2,
              paddingBottom: 2,
            }}
          >
            <BookVenues />

            <Box sx={{ padding: 2, mt: 4 }}>
              <Typography variant="h4" gutterBottom>
                Popular Sports
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap', // Allow wrapping for smaller screens
                  justifyContent: 'space-between',
                  overflowX: 'hidden',
                }}
              >
                {popularSports.map((sport) => (
                  <Card
                    key={sport.id}
                    onClick={() => navigate(`/book?sport=${sport.sport_name}`)}
                    sx={{
                      flex: '0 0 auto',
                      width: { xs: '100%', sm: '48%', md: '30%', lg: '200px' },
                      height: '250px',
                      margin: '10px',
                      borderRadius: '20px',
                      boxShadow: 3,
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'transform 0.3s',
                      '&:hover': {
                        transform: 'scale(1.05)', // Scale effect on hover
                        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)', // More pronounced shadow
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="250"
                      image={sport.image}
                      alt={sport.sport_name}
                      sx={{
                        borderTopLeftRadius: '20px',
                        borderTopRightRadius: '20px',
                        objectFit: 'cover', // Ensures image covers the card area
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        bgcolor: 'rgba(0, 0, 0, 0.7)', // Darker background for contrast
                        color: 'white',
                        textAlign: 'center',
                        padding: '12px 0',
                        borderBottomLeftRadius: '20px',
                        borderBottomRightRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography variant="h6" sx={{ fontSize: '18px' }}>
                        {sport.sport_name}
                      </Typography>
                    </Box>
                  </Card>
                ))}
              </Box>
            </Box>
          </Box>
          <Footer />
        </Container>
      </Box>
    </>
  );
};

export default App;
