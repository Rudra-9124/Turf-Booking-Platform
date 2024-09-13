// import React from 'react';
// import { Box, Button, TextField, Typography } from '@mui/material';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';

// const Login = () => {
//   // Validation schema using Yup
//   const validationSchema = Yup.object({
//     email: Yup.string()
//       .email('Enter a valid email')
//       .required('Email is required'),
//     password: Yup.string()
//       .min(6, 'Password should be at least 6 characters')
//       .required('Password is required'),
//   });

//   // Formik for handling form and validation
//   const formik = useFormik({
//     initialValues: {
//       email: '',
//       password: '',
//     },
//     validationSchema: validationSchema,
//     onSubmit: (values) => {
//       // Handle login logic here (e.g., API call)
//       alert(JSON.stringify(values, null, 2));
//     },
//   });

//   return (
//     <Box sx={{ maxWidth: 400, mx: 'auto', mt: 30, boxShadow: 2, p: 4 }}>
//       <Typography variant="h5" component="h1" mb={2} textAlign="center">
//         Login
//       </Typography>
//       <form onSubmit={formik.handleSubmit}>
//         <TextField
//           label="Email"
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           id="email"
//           name="email"
//           value={formik.values.email}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           error={formik.touched.email && Boolean(formik.errors.email)}
//           helperText={formik.touched.email && formik.errors.email}
//         />
//         <TextField
//           label="Password"
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           id="password"
//           name="password"
//           type="password"
//           value={formik.values.password}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           error={formik.touched.password && Boolean(formik.errors.password)}
//           helperText={formik.touched.password && formik.errors.password}
//         />
//         <Button
//           variant="contained"
//           color="primary"
//           fullWidth
//           type="submit"
//           sx={{ mt: 2 }}
//         >
//           Login
//         </Button>
//       </form>
//     </Box>
//   );
// };

// export default Login;


import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    TextField,
    Typography,
    Grid,
    Paper,
} from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Validation schema using Yup
const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
    password: Yup.string()
        .required('Password is required'),
});

const Login = () => {
    const navigate = useNavigate();

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            const response = await axios.post('http://localhost:8000/auth/login/', {
                email: values.email,
                password: values.password,
            }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Login successful:', response.data);
            navigate('/dashboard');
        } catch (error) {
            console.error('Login error:', error);
            setErrors({ email: 'Invalid username or password.' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh', backgroundColor: '#f0f4f8' }}>
            <Grid item xs={12} sm={8} md={4}>
                <Paper elevation={3} style={{ padding: '20px' }}>
                    <Box textAlign="center" mb={2}>
                        {/* Logo or Icon */}
          
                    </Box>
                    <Typography variant="h5" component="h2" textAlign="center" gutterBottom>
                        Log in
                    </Typography>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <Field name="email">
                                    {({ field, meta }) => (
                                        <TextField
                                            {...field}
                                            label="Email"
                                            variant="outlined"
                                            fullWidth
                                            margin="normal"
                                            error={meta.touched && Boolean(meta.error)}
                                            helperText={meta.touched && meta.error}
                                        />
                                    )}
                                </Field>
                                <Field name="password">
                                    {({ field, meta }) => (
                                        <TextField
                                            {...field}
                                            label="Password"
                                            type="password"
                                            variant="outlined"
                                            fullWidth
                                            margin="normal"
                                            error={meta.touched && Boolean(meta.error)}
                                            helperText={meta.touched && meta.error}
                                        />
                                    )}
                                </Field>
                                <FormControlLabel
                                    control={
                                        <Field
                                            name="rememberMe"
                                            as={Checkbox}
                                            color="primary"
                                        />
                                    }
                                    label="Remember me"
                                />
                                <Grid container justifyContent="space-between">
                                    <Link to="#" style={{ textDecoration: 'none', color: '#1976d2' }}>
                                        Forgot your password?
                                    </Link>
                                </Grid>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    style={{ marginTop: '16px' }}
                                    disabled={isSubmitting}
                                >
                                    Sign in
                                </Button>
                            </Form>
                        )}
                    </Formik>
                    <Typography variant="body2" align="center" style={{ marginTop: '16px' }}>
                        Don't have an account? 
                        <Link to="/register" style={{ textDecoration: 'none', color: '#1976d2' }}>
                            Register
                        </Link>
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Login;
