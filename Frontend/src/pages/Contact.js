import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Box, Typography, TextField, Button, Grid, Paper } from '@mui/material';
import ContactMailIcon from '@mui/icons-material/ContactMail';

const Signup = () => {
  return (
    <div>
      <Navbar />
      <Box padding="20px" sx={{ bgcolor: '#E8E8E8', minHeight: '100vh' }}>
        <Grid container spacing={4} mt={1}>
          {/* Left Grid Item - Contact Information */}
          <Grid item xs={12} md={6}>
            <Paper elevation={4} sx={{ padding: 3, borderRadius: '12px', bgcolor: '#f9f9f9' }}>
              <Typography variant="h4" align="center" gutterBottom>
                <ContactMailIcon sx={{ fontSize: 40, color: '#4CAF50' }} />
              </Typography>
              <Typography variant="h4" align="center" gutterBottom>
                Let's Talk
              </Typography>
              <Typography variant="body1" align="center" sx={{ color: 'green' }} gutterBottom>
                contact@turfo.co
              </Typography>

              {['Ahmedabad', 'Bangalore', 'Agra'].map((city) => (
                <Box key={city} sx={{ mt: 4 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {city}
                  </Typography>
                  <Typography variant="body2">
                    Contact Number: <Typography variant="body2" component="span" sx={{ textDecoration: 'underline', color: 'green' }}>+91 {Math.floor(Math.random() * 90000 + 10000)} {Math.floor(Math.random() * 90000 + 10000)}</Typography>
                  </Typography>
                  <Typography variant="body2">Address: Address Line 1, {city}</Typography>
                </Box>
              ))}
            </Paper>
          </Grid>

          {/* Right Grid Item - Contact Form */}
          <Grid item xs={12} md={6}>
            <Paper elevation={4} sx={{ padding: 3, borderRadius: '12px', bgcolor: '#f9f9f9' }}>
              <Typography variant="h5" align="center" marginBottom="20px">
                Get in Touch
              </Typography>
              <TextField fullWidth label="Name" variant="outlined" margin="normal" required />
              <TextField fullWidth label="Email" variant="outlined" margin="normal" />
              <TextField fullWidth label="Mobile" variant="outlined" margin="normal" required />
              <TextField
                fullWidth
                label="Message"
                variant="outlined"
                margin="normal"
                multiline
                rows={4}
              />
              <Button variant="contained" color="primary" sx={{ mt: 2, borderRadius: '20px' }}>
                Send
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </div>
  );
};

export default Signup;
