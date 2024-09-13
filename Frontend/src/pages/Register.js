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
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});

const Register = () => {
    const navigate = useNavigate();

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            const response = await axios.post('http://localhost:8000/auth/register/', {
                name: values.username,
                email: values.email,
                password: values.password,
            }, {
                withCredentials: true,
                // headers: {
                //     'Content-Type': 'application/json',
                // },
            });
            console.log('Registration successful:', response.data);
            navigate('/login');
        } catch (error) {
            console.error('Registration error:', error);
            setErrors({ email: 'Registration failed. Please try again.' });
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
                        Create an account
                    </Typography>
                    <Formik
                        initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <Field name="username">
                                    {({ field, meta }) => (
                                        <TextField
                                            {...field}
                                            label="Username"
                                            variant="outlined"
                                            fullWidth
                                            margin="normal"
                                            error={meta.touched && Boolean(meta.error)}
                                            helperText={meta.touched && meta.error}
                                        />
                                    )}
                                </Field>
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
                                <Field name="confirmPassword">
                                    {({ field, meta }) => (
                                        <TextField
                                            {...field}
                                            label="Confirm Password"
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
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    style={{ marginTop: '16px' }}
                                    disabled={isSubmitting}
                                >
                                    Register
                                </Button>
                                <Typography variant="body2" align="center" style={{ marginTop: '16px' }}>
                                    Already have an account? 
                                    <Link to="/login" style={{ textDecoration: 'none', color: '#1976d2' }}>
                                        Sign in
                                    </Link>
                                </Typography>
                            </Form>
                        )}
                    </Formik>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Register;
