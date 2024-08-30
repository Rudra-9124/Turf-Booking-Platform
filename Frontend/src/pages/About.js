import React from 'react';
import { Container, Typography, Grid, Paper, Box, Avatar, Button } from '@mui/material';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const teamMembers = [
  {
    name: 'Rudra Patel',
    role: 'Founder',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Aarav Kapadiya',
    role: 'Project Manager',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Diya Vora',
    role: 'Developer',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Aisha Sharma',
    role: 'Designer',
    image: 'https://via.placeholder.com/150',
  },
];

const About = () => {
  return (
    <>
    <Navbar />
    <Box sx={{ bgcolor: '#E8E8E8', minHeight: '100vh' }}>
        <Container fixed sx={{ p: 3 }}>
          <Box sx={{ bgcolor: '#fff', height: 'auto', borderRadius: '10px', mt: 2, boxShadow: 3, p:3}}>
            <Typography variant="h3" align="center" gutterBottom>
              About TurfO
            </Typography>
            <Typography variant="h6" align="center" paragraph>
              Welcome to TurfO, your ultimate destination for booking sports turfs online!
            </Typography>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <SportsSoccerIcon sx={{ fontSize: 80, color: '#4CAF50' }} />
            </Box>
            <Typography variant="h5" gutterBottom>
              Our Mission
            </Typography>
            <Typography variant="body1" paragraph>
              At TurfO, we aim to simplify the process of booking sports facilities, providing athletes and sports enthusiasts with a seamless experience to find and reserve turfs for their favorite sports. We believe that everyone deserves access to quality sports facilities, and we are committed to making that happen!
            </Typography>
            <Typography variant="h5" gutterBottom>
              Meet Our Team
            </Typography>
            <Grid container spacing={4}>
              {teamMembers.map((member) => (
                <Grid item xs={12} sm={6} md={3} key={member.name}>
                  <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
                    <Avatar
                      alt={member.name}
                      src={member.image}
                      sx={{ width: 100, height: 100, margin: '0 auto' }}
                    />
                    <Typography variant="h6" gutterBottom>
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
             <Button variant="contained" color="primary" href="/contact">
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
