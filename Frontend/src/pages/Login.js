// import React, { useState } from 'react';
// import { Dialog, DialogContent, DialogTitle, Box, Typography, TextField, Button, Grid, Link } from '@mui/material';
// import axios from 'axios'; // Make sure to install axios
// import SignupDialog from './Register'; // Import the SignupDialog component

// const LoginDialog = ({ open, onClose }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [isSignupOpen, setIsSignupOpen] = useState(false); // State to control signup dialog

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Send login request to backend
//       const response = await axios.post('/auth/login', { email, password });
//       const token = response.data.token; // Get the JWT token from the response

//       localStorage.setItem('token', token); // Store the token in local storage
//       console.log('Logged in successfully:', response.data);

//       // Reset form fields after submission
//       setEmail('');
//       setPassword('');
//       setError(''); // Clear error on successful submission
//       onClose(); // Close login dialog
//     } catch (err) {
//       setError('Invalid email or password. Please try again.'); // Handle error
//       console.error('Login failed:', err);
//     }
//   };

//   const handleSignupOpen = () => {
//     setIsSignupOpen(true);
//     onClose(); // Close login dialog
//   };

//   const handleSignupClose = () => {
//     setIsSignupOpen(false);
//   };

//   return (
//     <>
//       <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
//         <DialogTitle sx={{ fontSize: '24px', fontWeight: 'bold' }}>Login</DialogTitle>
//         <DialogContent>
//           <Grid container spacing={2}>
//             {/* Left Side - Image */}
//             <Grid item xs={12} md={7}>
//               <Box
//                 sx={{
//                   backgroundImage: 'url(https://imgcdn.stablediffusionweb.com/2024/4/17/4e492bff-bdad-4eb6-bde9-f3d8934ce57f.jpg)',
//                   backgroundSize: 'cover',
//                   height: { xs: 300, md: 500 }, // Responsive height
//                   borderRadius: 2,
//                 }}
//               />
//             </Grid>

//             {/* Right Side - Login Form */}
//             <Grid item xs={12} md={5}>
//               <Box component="form" onSubmit={handleSubmit}>
//                 <Typography variant="h6">Login with Email</Typography>
//                 {error && <Typography color="error">{error}</Typography>} {/* Display error message */}
//                 <TextField
//                   fullWidth
//                   label="Email"
//                   variant="outlined"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   sx={{ marginTop: 2 }}
//                   required
//                 />
//                 <TextField
//                   fullWidth
//                   label="Password"
//                   variant="outlined"
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   sx={{ marginTop: 2 }}
//                   required
//                 />
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   color="primary"
//                   fullWidth
//                   sx={{ marginTop: 2 }}
//                 >
//                   Login
//                 </Button>
//                 <Typography align="center" sx={{ marginTop: 3 }}>
//                   Don't have an account?{' '}
//                   <Link href="#" onClick={handleSignupOpen} underline="hover">
//                     Sign up now
//                   </Link>
//                 </Typography>
//               </Box>
//             </Grid>
//           </Grid>
//         </DialogContent>
//       </Dialog>
//       <SignupDialog open={isSignupOpen} onClose={handleSignupClose} />
//     </>
//   );
// };

// export default LoginDialog;

import React, {useState} from 'react';
import { Dialog, DialogContent, DialogTitle, Box, Typography, TextField, Button, Grid, Link } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'; // Make sure to install axios
import SignupDialog from './Register'; // Import the SignupDialog component

const LoginDialog = ({ open, onClose }) => {
  const [isSignupOpen, setIsSignupOpen] = useState(false); // State to control signup dialog

  // Validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password should be at least 6 characters').required('Password is required'),
  });

  // Formik hook to handle form state and validation
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        // Send login request to backend
        const response = await axios.post('/auth/login', values);
        const token = response.data.token; // Get the JWT token from the response

        localStorage.setItem('token', token); // Store the token in local storage
        console.log('Logged in successfully:', response.data);

        // Reset form fields after submission
        resetForm();
        onClose(); // Close login dialog
      } catch (err) {
        formik.setFieldError('general', 'Invalid email or password. Please try again.');
        console.error('Login failed:', err);
      }
    },
  });

  const handleSignupOpen = () => {
    setIsSignupOpen(true);
    onClose(); // Close login dialog
  };

  const handleSignupClose = () => {
    setIsSignupOpen(false);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle sx={{ fontSize: '24px', fontWeight: 'bold' }}>Login</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {/* Left Side - Image */}
            <Grid item xs={12} md={7}>
              <Box
                sx={{
                  backgroundImage: 'url(https://imgcdn.stablediffusionweb.com/2024/4/17/4e492bff-bdad-4eb6-bde9-f3d8934ce57f.jpg)',
                  backgroundSize: 'cover',
                  height: { xs: 300, md: 500 }, // Responsive height
                  borderRadius: 2,
                }}
              />
            </Grid>

            {/* Right Side - Login Form */}
            <Grid item xs={12} md={5}>
              <Box component="form" onSubmit={formik.handleSubmit}>
                <Typography variant="h6">Login with Email</Typography>

                {/* General error message */}
                {formik.errors.general && (
                  <Typography color="error" align="center">
                    {formik.errors.general}
                  </Typography>
                )}

                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  sx={{ marginTop: 2 }}
                />

                <TextField
                  fullWidth
                  label="Password"
                  variant="outlined"
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  sx={{ marginTop: 2 }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ marginTop: 2 }}
                >
                  Login
                </Button>

                <Typography align="center" sx={{ marginTop: 3 }}>
                  Don't have an account?{' '}
                  <Link href="#" onClick={handleSignupOpen} underline="hover">
                    Sign up now
                  </Link>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      <SignupDialog open={isSignupOpen} onClose={handleSignupClose} />
    </>
  );
};

export default LoginDialog;
