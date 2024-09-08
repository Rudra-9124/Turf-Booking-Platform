import React from 'react';
import { Box, Grid, Typography, Link } from '@mui/material';
import Logo from './logo-removebg.png'; // Import your logo image

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'inherit', padding: 4 }}>
      <Grid container spacing={2}>
        {/* Left Side: Logo and Copyright */}
        <Grid item xs={12} md={5}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <img src={Logo} alt="Company Logo" style={{ height: '100px', marginBottom: '5px' }} />
            <Typography variant="body2" color="text.secondary">
              &copy; {new Date().getFullYear()} TurfO. All rights reserved.
            </Typography>
          </Box>
        </Grid>

        {/* Right Side: Three Columns */}
        <Grid item xs={12} md={7}>
          <Grid container spacing={2}>
            {/* Column 1: Company */}
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Company</Typography>
              <Link href="/about" color="inherit" sx={{ textDecoration: 'none' }}>About Us</Link><br />
              <Link href="/contact" color="inherit" sx={{ textDecoration: 'none' }}>Contact</Link><br />
              <Link href="/careers" color="inherit" sx={{ textDecoration: 'none' }}>Careers</Link><br />
              <Link href="/partners" color="inherit" sx={{ textDecoration: 'none' }}>Partner with Us</Link>
            </Grid>

            {/* Column 2: Social Media */}
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Social Media</Typography>
              <Link href="https://instagram.com" color="inherit" sx={{ textDecoration: 'none' }}>Instagram</Link><br />
              <Link href="https://facebook.com" color="inherit" sx={{ textDecoration: 'none' }}>Facebook</Link><br />
              <Link href="https://twitter.com" color="inherit" sx={{ textDecoration: 'none' }}>Twitter</Link><br />
              <Link href="https://linkedin.com" color="inherit" sx={{ textDecoration: 'none' }}>LinkedIn</Link>
            </Grid>

            {/* Column 3: Privacy & Terms */}
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Privacy & Terms</Typography>
              <Link href="/faqs" color="inherit" sx={{ textDecoration: 'none' }}>FAQs</Link><br />
              <Link href="/privacy-policy" color="inherit" sx={{ textDecoration: 'none' }}>Privacy Policy</Link><br />
              <Link href="/terms-of-service" color="inherit" sx={{ textDecoration: 'none' }}>Terms of Service</Link><br />
              <Link href="/cancellation-policy" color="inherit" sx={{ textDecoration: 'none' }}>Cancellation Policy</Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;