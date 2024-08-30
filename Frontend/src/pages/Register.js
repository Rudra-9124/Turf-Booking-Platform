import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
import axios from 'axios'; // Make sure to install axios

const SignupDialog = ({ open, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // State to hold success messages
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      // Send signup request to backend
      const response = await axios.post('/signup', {
        name,
        email,
        mobile,
        password,
      });
      const token = response.data.token; // Get the JWT token from the response

      localStorage.setItem('token', token); // Store the token in local storage
      setSuccess('Registration successful!'); // Set success message
      setError(''); // Clear error message

      // Reset form fields after submission
      setName('');
      setEmail('');
      setMobile('');
      setPassword('');
      setConfirmPassword('');

      // Optionally, you can close the dialog after successful signup
      // onClose(); 
    } catch (err) {
      setError('Registration failed. Please try again.'); // Handle error
      console.error('Signup failed:', err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm"> {/* Change maxWidth to "sm" */}
      <DialogTitle sx={{ fontSize: '24px', fontWeight: 'bold' }}>Sign Up</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h6">Create an Account</Typography>
          {error && <Typography color="error">{error}</Typography>} {/* Display error message */}
          {success && <Typography color="success.main">{success}</Typography>} {/* Display success message */}
          
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ marginTop: 2 }}
            required
          />
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ marginTop: 2 }}
            required
          />
          <TextField
            fullWidth
            label="Mobile Number"
            variant="outlined"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            sx={{ marginTop: 2 }}
            required
          />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginTop: 2 }}
            required
          />
          <TextField
            fullWidth
            label="Confirm Password"
            variant="outlined"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{ marginTop: 2 }}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Sign Up
          </Button>
          {/* <Typography align="center" sx={{ marginTop: 3 }}>
             Already have an account?{' '}
             <Link href="#" onClick={handleLoginRedirect} underline="hover">
               Login now
             </Link>
           </Typography> */}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SignupDialog;
