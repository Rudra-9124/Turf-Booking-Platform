import React from 'react';
import { Container, Typography, Grid, Paper, Box, Avatar, Button } from '@mui/material';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const teamMembers = [
  {
    name: 'Jignesh Solanki',
    role: 'Founder',
    image: 'https://t4.ftcdn.net/jpg/06/40/07/03/360_F_640070383_9LJ3eTRSvOiwKyrmBYgcjhSlckDnNcxl.jpg',
  },
  {
    name: 'Aarav Kapadiya',
    role: 'Project Manager',
    image: 'https://static.vecteezy.com/system/resources/thumbnails/037/495/402/small_2x/ai-generated-executive-arrival-confident-indian-business-professional-with-tablet-photo.jpg',
  },
  {
    name: 'Diya Vora',
    role: 'Developer',
    image: 'https://t3.ftcdn.net/jpg/03/17/91/74/360_F_317917475_h4sM0jHpoLYNm4vfjtAL53Gx5yYWFbNn.jpg',
  },
  {
    name: 'Aisha Sharma',
    role: 'Designer',
    image: 'https://t3.ftcdn.net/jpg/06/36/69/86/360_F_636698674_DroChEj5eWmZiaZOSDMnj8hcDqqw74Fp.jpg',
  },
];

const About = () => {
  return (
    <>
      <Navbar />
      <Box sx={{ bgcolor: '#E8E8E8', minHeight: '100vh', paddingBottom: 4 }}>
        <Container fixed sx={{ p: 3 }}>
          <Box
            sx={{
              bgcolor: '#fff',
              height: 'auto',
              borderRadius: '15px',
              mt: 2,
              boxShadow: 3,
              p: 3,
              textAlign: 'center',
            }}
          >
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
              About TurfO
            </Typography>
            <Typography variant="h6" paragraph sx={{ color: '#666' }}>
              Welcome to TurfO, your ultimate destination for booking sports turfs online!
            </Typography>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <SportsSoccerIcon sx={{ fontSize: 60, color: '#4CAF50' }} />
            </Box>
            <Typography variant="h5" gutterBottom sx={{ color: '#4CAF50', fontWeight: 'bold' }}>
              Our Mission
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: '#444' }}>
              At TurfO, we aim to simplify the process of booking sports facilities, providing athletes and sports enthusiasts with a seamless experience to find and reserve turfs for their favorite sports. We believe that everyone deserves access to quality sports facilities, and we are committed to making that happen!
            </Typography>
            <Typography variant="h5" gutterBottom sx={{ color: '#4CAF50', fontWeight: 'bold' }}>
              Meet Our Team
            </Typography>
            <Grid container spacing={4}>
              {teamMembers.map((member) => (
                <Grid item xs={12} sm={6} md={3} key={member.name}>
                  <Paper elevation={6} sx={{ padding: 2, textAlign: 'center', borderRadius: '10px', transition: '0.3s', '&:hover': { transform: 'scale(1.05)', boxShadow: 10 } }}>
                    <Avatar
                      alt={member.name}
                      src={member.image}
                      sx={{ width: 100, height: 100, margin: '0 auto', boxShadow: 1, border: '2px solid #4CAF50' }}
                    />
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
                      {member.name}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {member.role}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Button variant="contained" color="primary" href="/contact" sx={{ padding: '10px 20px', borderRadius: '20px' }}>
                Contact Us
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default About;
