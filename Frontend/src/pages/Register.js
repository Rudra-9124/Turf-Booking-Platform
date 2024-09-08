// import React, { useState } from 'react';
// import { Dialog, DialogContent, DialogTitle, Box, Typography, TextField, Button } from '@mui/material';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
// import axios from 'axios'; // Make sure to install axios

// const SignupDialog = ({ open, onClose }) => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [mobile, setMobile] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(''); // State to hold success messages
//   const navigate = useNavigate(); // Initialize useNavigate

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       setError("Passwords don't match");
//       return;
//     }

//     try {
//       // Send signup request to backend
//       const response = await axios.post('/signup', {
//         name,
//         email,
//         mobile,
//         password,
//       });
//       const token = response.data.token; // Get the JWT token from the response

//       localStorage.setItem('token', token); // Store the token in local storage
//       setSuccess('Registration successful!'); // Set success message
//       setError(''); // Clear error message

//       // Reset form fields after submission
//       setName('');
//       setEmail('');
//       setMobile('');
//       setPassword('');
//       setConfirmPassword('');

//       // Optionally, you can close the dialog after successful signup
//       // onClose(); 
//     } catch (err) {
//       setError('Registration failed. Please try again.'); // Handle error
//       console.error('Signup failed:', err);
//     }
//   };

//   return (
//     <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm"> {/* Change maxWidth to "sm" */}
//       <DialogTitle sx={{ fontSize: '24px', fontWeight: 'bold' }}>Sign Up</DialogTitle>
//       <DialogContent>
//         <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//           <Typography variant="h6">Create an Account</Typography>
//           {error && <Typography color="error">{error}</Typography>} {/* Display error message */}
//           {success && <Typography color="success.main">{success}</Typography>} {/* Display success message */}
          
//           <TextField
//             fullWidth
//             label="Name"
//             variant="outlined"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             sx={{ marginTop: 2 }}
//             required
//           />
//           <TextField
//             fullWidth
//             label="Email"
//             variant="outlined"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             sx={{ marginTop: 2 }}
//             required
//           />
//           <TextField
//             fullWidth
//             label="Mobile Number"
//             variant="outlined"
//             value={mobile}
//             onChange={(e) => setMobile(e.target.value)}
//             sx={{ marginTop: 2 }}
//             required
//           />
//           <TextField
//             fullWidth
//             label="Password"
//             variant="outlined"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             sx={{ marginTop: 2 }}
//             required
//           />
//           <TextField
//             fullWidth
//             label="Confirm Password"
//             variant="outlined"
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             sx={{ marginTop: 2 }}
//             required
//           />
//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             fullWidth
//             sx={{ marginTop: 2 }}
//           >
//             Sign Up
//           </Button>
//           {/* <Typography align="center" sx={{ marginTop: 3 }}>
//              Already have an account?{' '}
//              <Link href="#" onClick={handleLoginRedirect} underline="hover">
//                Login now
//              </Link>
//            </Typography> */}
//         </Box>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default SignupDialog;

import React from 'react';
import { Dialog, DialogContent, DialogTitle, Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
import axios from 'axios'; // Make sure to install axios
import { Formik, Form, Field } from 'formik'; // Import Formik and Field
import * as Yup from 'yup'; // Import Yup for validation

// Yup validation schema
const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  mobile: Yup.string()
    .matches(/^\d{10}$/, 'Mobile number must be exactly 10 digits')
    .required('Mobile number is required'),
  password: Yup.string()
    .min(6, 'Password should be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm your password'),
});

const SignupDialog = ({ open, onClose }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (values, { setSubmitting, setErrors, setStatus, resetForm }) => {
    try {
      // Send signup request to backend
      const response = await axios.post('http://localhost:8000/auth/signup/', {  // Update the URL as per your Django settings
        name: values.name,
        email: values.email,
        mobile: values.mobile,
        password: values.password,
      });
      const token = response.data.token; // Get the JWT token from the response

      localStorage.setItem('token', token); // Store the token in local storage
      setStatus({ success: 'Registration successful!' }); // Set success message

      resetForm(); // Reset the form after submission

      // Optionally, you can close the dialog after successful signup
      // onClose(); 
    } catch (err) {
      // Log the full error response for better debugging
      if (err.response) {
        console.error('Signup failed:', err.response.data);
        setErrors({ general: err.response.data.error || 'Registration failed. Please try again.' }); // Update error message
      } else {
        console.error('Signup failed:', err);
        setErrors({ general: 'Registration failed. Please try again.' }); // Handle other errors
      }
    }
    setSubmitting(false);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm"> {/* Change maxWidth to "sm" */}
      <DialogTitle sx={{ fontSize: '24px', fontWeight: 'bold' }}>Sign Up</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            name: '',
            email: '',
            mobile: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting, status }) => (
            <Form>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h6">Create an Account</Typography>
                
                {errors.general && <Typography color="error">{errors.general}</Typography>} {/* Display general error */}
                {status?.success && <Typography color="success.main">{status.success}</Typography>} {/* Display success message */}
                
                <Field
                  as={TextField}
                  fullWidth
                  name="name"
                  label="Name"
                  variant="outlined"
                  sx={{ marginTop: 2 }}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
                
                <Field
                  as={TextField}
                  fullWidth
                  name="email"
                  label="Email"
                  variant="outlined"
                  sx={{ marginTop: 2 }}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                
                <Field
                  as={TextField}
                  fullWidth
                  name="mobile"
                  label="Mobile Number"
                  variant="outlined"
                  sx={{ marginTop: 2 }}
                  error={touched.mobile && Boolean(errors.mobile)}
                  helperText={touched.mobile && errors.mobile}
                />
                
                <Field
                  as={TextField}
                  fullWidth
                  name="password"
                  label="Password"
                  variant="outlined"
                  type="password"
                  sx={{ marginTop: 2 }}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
                
                <Field
                  as={TextField}
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  variant="outlined"
                  type="password"
                  sx={{ marginTop: 2 }}
                  error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                />
                
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ marginTop: 2 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default SignupDialog;
