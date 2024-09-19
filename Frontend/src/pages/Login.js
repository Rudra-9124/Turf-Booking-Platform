// import React, { useState } from 'react';
// import { TextField, Button, Grid, Typography, Box, Link as MuiLink } from '@mui/material';
// import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
// import axios from 'axios';

// export default function Login({ setUser }) {
//   const [loginData, setLoginData] = useState({
//     username: '',
//     password: '',
//   });

//   const navigate = useNavigate(); // Initialize useNavigate

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setLoginData({
//       ...loginData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://127.0.0.1:8000/auth/login/', {
//         username: loginData.username,
//         password: loginData.password,
//       });

//       // Save token and user details in localStorage
//       localStorage.setItem('token', response.data.access);
//       localStorage.setItem('username', loginData.username);
      
//       // Update user state in parent component
//       setUser({ username: loginData.username });

//       // Redirect to home page after successful login
//       navigate('/'); // Replace with your home route
//     } catch (error) {
//       console.error('Login failed', error);
//     }
//   };

//   return (
//     <Grid container component="main" sx={{ height: '100vh' }}>
//       <Grid
//         item
//         xs={12}
//         sm={6}
//         md={6}
//         display="flex"
//         flexDirection="column"
//         justifyContent="center"
//         alignItems="center"
//         sx={{ px: 5 }}
//       >
//         <Box display="flex" alignItems="center" mb={4}>
//           <i className="fas fa-crow fa-2x" style={{ color: '#709085' }}></i>
//           <Typography component="h1" variant="h5" ml={2} fontWeight="bold">
//             Logo
//           </Typography>
//         </Box>

//         <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 400 }}>
//           <Typography component="h3" variant="h6" textAlign="center" mb={3}>
//             Log in
//           </Typography>

//           <TextField
//             variant="outlined"
//             margin="normal"
//             fullWidth
//             id="username"
//             label="Username"
//             name="username"
//             autoComplete="username"
//             value={loginData.username}
//             onChange={handleChange}
//           />

//           <TextField
//             variant="outlined"
//             margin="normal"
//             fullWidth
//             name="password"
//             label="Password"
//             type="password"
//             id="password"
//             autoComplete="current-password"
//             value={loginData.password}
//             onChange={handleChange}
//           />

//           <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
//             Login
//           </Button>

//           <Box display="flex" justifyContent="space-between">
//             <MuiLink component={Link} to="/forgotpass" underline="none">
//               Forgot password?
//             </MuiLink>
//             <MuiLink component={Link} to="/signup" underline="none">
//               New user?
//             </MuiLink>
//           </Box>
//         </Box>
//       </Grid>

//       <Grid
//         item
//         xs={false}
//         sm={6}
//         md={6}
//         sx={{
//           backgroundImage: 'url(https://img.freepik.com/free-photo/top-view-set-gadgets-purple-neon-light-blue_155003-19114.jpg)',
//           backgroundRepeat: 'no-repeat',
//           backgroundSize: 'cover',
//           backgroundPosition: 'left',
//         }}
//       />
//     </Grid>
//   );
// }

import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Link as MuiLink } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../components/logo-removebg.png'; // Import your logo image


export default function Login({ setUser }) {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

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
          <Typography component="h1" variant="h6" textAlign="center" mb={3} sx={{fontWeight:'bold'}}>
            Sign In
          </Typography>

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
