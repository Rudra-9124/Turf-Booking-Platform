import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Link as MuiLink } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login({ setUser }) {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const [loginError, setLoginError] = useState(''); // State for error message
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError(''); // Reset error message before each login attempt
    try {
      const response = await axios.post('http://127.0.0.1:8000/auth/login/', {
        username: loginData.username,
        password: loginData.password,
      });

      // Save token and user details in localStorage
      localStorage.setItem('token', response.data.access);
      localStorage.setItem('username', loginData.username);
      
      // Update user state in parent component
      setUser({ username: loginData.username });

      // Redirect to home page after successful login
      navigate('/'); // Replace with your home route
    } catch (error) {
      console.error('Login failed', error);
      // Set error message if login fails
      if (error.response && error.response.status === 401) {
        setLoginError('Incorrect username or password. Please try again.');
      } else {
        setLoginError('Login failed. Please try again later.');
      }
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ height: '100vh', backgroundColor: '#f5f5f5' }} // Optional: Add background color
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ px: 3, width: '100%', maxWidth: 400 }}
      >
        {/* Login Form */}
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <Typography component="h1" variant="h6" textAlign="center" mb={3} sx={{ fontWeight: 'bold' }}>
            Sign In
          </Typography>

          {/* Error Message */}
          {loginError && (
            <Typography color="error" mb={2} textAlign="center">
              {loginError}
            </Typography>
          )}

          {/* Username Field */}
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            value={loginData.username}
            onChange={handleChange}
          />

          {/* Password Field */}
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={loginData.password}
            onChange={handleChange}
          />

          {/* Login Button */}
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
            Login
          </Button>

          {/* Links for forgot password and sign up */}
          <Box display="flex" justifyContent="space-between">
            <MuiLink component={Link} to="/forgotpass" underline="none">
              Forgot password?
            </MuiLink>
            <MuiLink component={Link} to="/register" underline="none">
              New user?
            </MuiLink>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
