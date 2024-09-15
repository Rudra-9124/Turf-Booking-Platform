import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Grid, Box, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

export default function SignupPage() {
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    username: '',
    email: '',
    password1: '',
    password2: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (signupData.password1 !== signupData.password2) {
      setErrorMessage("Passwords didn't match");
      return;
    }

    // Prepare the data to be sent to the backend
    const userData = {
      username: signupData.username,
      email: signupData.email,
      password: signupData.password1,
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/auth/signup/', userData);
      setMessage(response.data.message);
      setSignupData({
        username: '',
        email: '',
        password1: '',
        password2: '',
      });
      navigate('/login');
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <Grid container component="main" sx={{ height: '100vh', backgroundColor: '#f5f5f5' }}>
      <Grid item xs={12} sm={6} md={6} display={{ xs: 'none', md: 'block' }}>
        {/* Left Section - Image */}
        <Box
          component="img"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          src="https://cdn.pixabay.com/photo/2017/07/31/18/29/laptop-2559792_640.jpg"
          alt="Signup"
        />
      </Grid>

      {/* Right Section - Signup Form */}
      <Grid item xs={12} sm={6} md={6} display="flex" justifyContent="center" alignItems="center">
        <Box sx={{ p: 4, width: '100%', maxWidth: 400 }}>
          <Typography variant="h3" component="h3" sx={{ textAlign: 'center', mb: 3 }}>
            Sign Up
          </Typography>

          <Typography color="error" sx={{ textAlign: 'center', mb: 2 }}>
            {errorMessage}
          </Typography>
          <Typography color="success.main" sx={{ textAlign: 'center', mb: 2 }}>
            {message}
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            {/* Username Input */}
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="username"
              label="Create Username"
              name="username"
              value={signupData.username}
              onChange={handleChange}
              required
            />

            {/* Email Input */}
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              value={signupData.email}
              onChange={handleChange}
              required
            />

            {/* Password Input */}
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="password1"
              label="Password"
              name="password1"
              type="password"
              value={signupData.password1}
              onChange={handleChange}
              required
            />

            {/* Confirm Password Input */}
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="password2"
              label="Confirm Password"
              name="password2"
              type="password"
              value={signupData.password2}
              onChange={handleChange}
              required
            />

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2">
              Already have an account?{' '}
              <Link to="/login" style={{ textDecoration: 'none', color: '#1976d2' }}>
                Login
              </Link>
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
