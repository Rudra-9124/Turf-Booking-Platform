import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  TextField,
  Paper,
  CircularProgress,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentPage = () => {
  const [paymentMode, setPaymentMode] = useState('upi'); 
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();
  const location = useLocation();
  const { bookingData } = location.state || {}; // Retrieve booking data passed from VenueReviewPage
  
  const handlePaymentSuccess = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You need to log in first.');
      return;
    }
    
    try {
      const response = await axios.post('http://localhost:8000/booking/', {
        ...bookingData, // Include the booking data from VenueReviewPage
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Booking and payment successful!');
      navigate('/');
    } catch (error) {
      console.error('There was an error processing the booking:', error.response.data);
    }
  };

  // Formik for UPI
  const formikUPI = useFormik({
    initialValues: { upiId: '' },
    validationSchema: Yup.object({
      upiId: Yup.string()
        .required('UPI ID is required')
        .matches(/^([\w.-]+@[a-zA-Z]+)$/, 'Invalid UPI ID format'),
    }),
    onSubmit: (values) => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        alert(`UPI Payment Successful: ${values.upiId}`);
        handlePaymentSuccess()
        navigate('/');
      }, 2000);
    },
  });

  // Formik for Credit/Debit Card
  const formikCard = useFormik({
    initialValues: { cardNumber: '', expiryDate: '', cvv: '' },
    validationSchema: Yup.object({
      cardNumber: Yup.string()
        .required('Card number is required')
        .matches(/^[0-9]{16}$/, 'Card number must be 16 digits'),
      expiryDate: Yup.string()
        .required('Expiry date is required')
        .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Invalid expiry date format (MM/YY)'),
      cvv: Yup.string()
        .required('CVV is required')
        .matches(/^[0-9]{3,4}$/, 'CVV must be 3 or 4 digits'),
    }),
    onSubmit: (values) => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        alert(`Card Payment Successful: **** **** **** ${values.cardNumber.slice(-4)}`);
        handlePaymentSuccess()
        navigate('/');
      }, 2000);
    },
  });

  // Formik for PayPal
  const formikPayPal = useFormik({
    initialValues: { email: '' },
    validationSchema: Yup.object({
      email: Yup.string().required('Email is required').email('Invalid email format'),
    }),
    onSubmit: (values) => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        alert(`PayPal Payment Successful: ${values.email}`);
        handlePaymentSuccess()
        navigate('/');
      }, 2000);
    },
  });

  // Formik for Wallet
  const formikWallet = useFormik({
    initialValues: { walletId: '' },
    validationSchema: Yup.object({
      walletId: Yup.string().required('Wallet ID is required'),
    }),
    onSubmit: (values) => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        alert(`Wallet Payment Successful: ${values.walletId}`);
        handlePaymentSuccess()
        navigate('/');
      }, 2000);
    },
  });

  return (
    <Box sx={{ padding: '40px 20px', backgroundColor: '#f5f5f5' }}>
      <Paper
        sx={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '40px',
          borderRadius: '16px',
          boxShadow: 5,
          backgroundColor: '#ffffff',
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{ fontWeight: 'bold', marginBottom: 4, color: '#333' }}
        >
          Payment
        </Typography>

        <Grid container spacing={4}>
          {/* Left Side: Payment Mode Selection */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              align="center"
              sx={{ fontWeight: 600, marginBottom: 3, color: '#555' }}
            >
              Select Payment Mode
            </Typography>
            <Button
              variant={paymentMode === 'upi' ? 'contained' : 'outlined'}
              onClick={() => setPaymentMode('upi')}
              fullWidth
              sx={{ marginBottom: 2, backgroundColor: paymentMode === 'upi' ? '#1976d2' : 'white' }}
            >
              UPI
            </Button>
            <Button
              variant={paymentMode === 'card' ? 'contained' : 'outlined'}
              onClick={() => setPaymentMode('card')}
              fullWidth
              sx={{ marginBottom: 2, backgroundColor: paymentMode === 'card' ? '#1976d2' : 'white' }}
            >
              Credit/Debit Card
            </Button>
            <Button
              variant={paymentMode === 'paypal' ? 'contained' : 'outlined'}
              onClick={() => setPaymentMode('paypal')}
              fullWidth
              sx={{ marginBottom: 2, backgroundColor: paymentMode === 'paypal' ? '#1976d2' : 'white' }}
            >
              PayPal
            </Button>
            <Button
              variant={paymentMode === 'wallet' ? 'contained' : 'outlined'}
              onClick={() => setPaymentMode('wallet')}
              fullWidth
              sx={{ backgroundColor: paymentMode === 'wallet' ? '#1976d2' : 'white' }}
            >
              Wallet
            </Button>
          </Grid>

          {/* Right Side: Payment Form Fields */}
          <Grid item xs={12} md={8}>
            {paymentMode === 'upi' && (
              <form onSubmit={formikUPI.handleSubmit}>
                <TextField
                  fullWidth
                  id="upiId"
                  name="upiId"
                  label="UPI ID"
                  value={formikUPI.values.upiId}
                  onChange={formikUPI.handleChange}
                  error={formikUPI.touched.upiId && Boolean(formikUPI.errors.upiId)}
                  helperText={formikUPI.touched.upiId && formikUPI.errors.upiId}
                  margin="normal"
                  variant="outlined"
                  sx={{ paddingBottom: 2 }}
                />
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  fullWidth
                  sx={{
                    marginTop: 2,
                    padding: '12px',
                    backgroundColor: '#1976d2',
                    '&:hover': { backgroundColor: '#155a9e' },
                  }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Pay via UPI'}
                </Button>
              </form>
            )}

            {paymentMode === 'card' && (
              <form onSubmit={formikCard.handleSubmit}>
                <TextField
                  fullWidth
                  id="cardNumber"
                  name="cardNumber"
                  label="Card Number"
                  value={formikCard.values.cardNumber}
                  onChange={formikCard.handleChange}
                  error={formikCard.touched.cardNumber && Boolean(formikCard.errors.cardNumber)}
                  helperText={formikCard.touched.cardNumber && formikCard.errors.cardNumber}
                  margin="normal"
                  variant="outlined"
                  sx={{ paddingBottom: 2 }}
                />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="expiryDate"
                      name="expiryDate"
                      label="Expiry Date (MM/YY)"
                      value={formikCard.values.expiryDate}
                      onChange={formikCard.handleChange}
                      error={formikCard.touched.expiryDate && Boolean(formikCard.errors.expiryDate)}
                      helperText={formikCard.touched.expiryDate && formikCard.errors.expiryDate}
                      margin="normal"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="cvv"
                      name="cvv"
                      label="CVV"
                      type="password"
                      value={formikCard.values.cvv}
                      onChange={formikCard.handleChange}
                      error={formikCard.touched.cvv && Boolean(formikCard.errors.cvv)}
                      helperText={formikCard.touched.cvv && formikCard.errors.cvv}
                      margin="normal"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  fullWidth
                  sx={{
                    marginTop: 2,
                    padding: '12px',
                    backgroundColor: '#1976d2',
                    '&:hover': { backgroundColor: '#155a9e' },
                  }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Pay via Card'}
                </Button>
              </form>
            )}

            {paymentMode === 'paypal' && (
              <form onSubmit={formikPayPal.handleSubmit}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="PayPal Email"
                  value={formikPayPal.values.email}
                  onChange={formikPayPal.handleChange}
                  error={formikPayPal.touched.email && Boolean(formikPayPal.errors.email)}
                  helperText={formikPayPal.touched.email && formikPayPal.errors.email}
                  margin="normal"
                  variant="outlined"
                  sx={{ paddingBottom: 2 }}
                />
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  fullWidth
                  sx={{
                    marginTop: 2,
                    padding: '12px',
                    backgroundColor: '#1976d2',
                    '&:hover': { backgroundColor: '#155a9e' },
                  }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Pay via PayPal'}
                </Button>
              </form>
            )}

            {paymentMode === 'wallet' && (
              <form onSubmit={formikWallet.handleSubmit}>
                <TextField
                  fullWidth
                  id="walletId"
                  name="walletId"
                  label="Wallet ID"
                  value={formikWallet.values.walletId}
                  onChange={formikWallet.handleChange}
                  error={formikWallet.touched.walletId && Boolean(formikWallet.errors.walletId)}
                  helperText={formikWallet.touched.walletId && formikWallet.errors.walletId}
                  margin="normal"
                  variant="outlined"
                  sx={{ paddingBottom: 2 }}
                />
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  fullWidth
                  sx={{
                    marginTop: 2,
                    padding: '12px',
                    backgroundColor: '#1976d2',
                    '&:hover': { backgroundColor: '#155a9e' },
                  }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Pay via Wallet'}
                </Button>
              </form>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default PaymentPage;
