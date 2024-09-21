import React from 'react';
import { TextField, Button, Typography, Box, Link as MuiLink } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

// Validation schema using Yup
const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password1: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  password2: Yup.string()
    .oneOf([Yup.ref('password1'), null], "Passwords don't match")
    .required('Confirm Password is required'),
});

export default function SignupPage() {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, setErrors, setStatus }) => {
    // Prepare the data to be sent to the backend
    const userData = {
      username: values.username,
      email: values.email,
      password: values.password1,
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/auth/signup/', userData);
      setStatus({ success: response.data.message });
      navigate('/login');
    } catch (error) {
      setErrors({ submit: error.response.data.error });
    }
    setSubmitting(false);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ height: '100vh', backgroundColor: '#f5f5f5' }} 
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ px: 3, width: '100%', maxWidth: 400 }}
      >
        {/* Signup Form using Formik */}
        <Formik
          initialValues={{
            username: '',
            email: '',
            password1: '',
            password2: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, status, errors }) => (
            <Form>
              <Typography component="h1" variant="h6" textAlign="center" mb={3} sx={{ fontWeight: 'bold' }}>
                Sign Up
              </Typography>

              {/* Error Message */}
              {errors.submit && (
                <Typography color="error" mb={2} textAlign="center">
                  {errors.submit}
                </Typography>
              )}

              {/* Success Message */}
              {status && status.success && (
                <Typography color="success.main" mb={2} textAlign="center">
                  {status.success}
                </Typography>
              )}

              {/* Username Field */}
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                id="username"
                label="Create Username"
                name="username"
                error={Boolean(errors.username)}
                helperText={<ErrorMessage name="username" />}
              />

              {/* Email Field */}
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                error={Boolean(errors.email)}
                helperText={<ErrorMessage name="email" />}
              />

              {/* Password Field */}
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                id="password1"
                label="Password"
                name="password1"
                type="password"
                error={Boolean(errors.password1)}
                helperText={<ErrorMessage name="password1" />}
              />

              {/* Confirm Password Field */}
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                id="password2"
                label="Confirm Password"
                name="password2"
                type="password"
                error={Boolean(errors.password2)}
                helperText={<ErrorMessage name="password2" />}
              />

              {/* Signup Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
                disabled={isSubmitting}
              >
                Sign Up
              </Button>

              {/* Link to Login */}
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="body2">
                  Already have an account?{' '}
                  <MuiLink component={Link} to="/login" underline="none" sx={{ color: '#1976d2' }}>
                    Login
                  </MuiLink>
                </Typography>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}
