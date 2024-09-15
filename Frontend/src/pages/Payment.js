// import React, { useState } from 'react';
// import {
//   Box,
//   TextField,
//   Button,
//   Grid,
//   Typography,
//   Divider,
//   InputAdornment,
//   CircularProgress,
//   Paper,
// } from '@mui/material';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import CreditCardIcon from '@mui/icons-material/CreditCard';
// import UpiIcon from '@mui/icons-material/AccountBalanceWallet';
// import CardIcon from '@mui/icons-material/Payment';
// import { motion } from 'framer-motion';

// const Payment = () => {
//   const [loading, setLoading] = useState(false);

//   // Formik for UPI
//   const formikUPI = useFormik({
//     initialValues: {
//       upiId: '',
//     },
//     validationSchema: Yup.object({
//       upiId: Yup.string().required('UPI ID is required').matches(/^([\w.-]+@[a-zA-Z]+)$/, 'Invalid UPI ID format'),
//     }),
//     onSubmit: (values) => {
//       setLoading(true);
//       setTimeout(() => {
//         setLoading(false);
//         alert(`UPI Payment Successful: ${values.upiId}`);
//       }, 2000);
//     },
//   });

//   // Formik for Credit/Debit Card
//   const formikCard = useFormik({
//     initialValues: {
//       cardNumber: '',
//       expiryDate: '',
//       cvv: '',
//     },
//     validationSchema: Yup.object({
//       cardNumber: Yup.string()
//         .required('Card number is required')
//         .matches(/^[0-9]{16}$/, 'Card number must be 16 digits'),
//       expiryDate: Yup.string()
//         .required('Expiry date is required')
//         .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Invalid expiry date format (MM/YY)'),
//       cvv: Yup.string()
//         .required('CVV is required')
//         .matches(/^[0-9]{3,4}$/, 'CVV must be 3 or 4 digits'),
//     }),
//     onSubmit: (values) => {
//       setLoading(true);
//       setTimeout(() => {
//         setLoading(false);
//         alert(`Card Payment Successful: **** **** **** ${values.cardNumber.slice(-4)}`);
//       }, 2000);
//     },
//   });

//   return (
//     <Box sx={{ backgroundColor: '#f0f2f5', minHeight: '100vh', padding: '40px 0' }}>
//       <Paper
//         sx={{
//           maxWidth: '600px',
//           margin: '0 auto',
//           padding: '30px',
//           borderRadius: '8px',
//           boxShadow: 3,
//           backgroundColor: 'white',
//         }}
//       >
//         <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
//           Payment Gateway
//         </Typography>

//         {/* UPI Payment Section */}
//         <motion.div
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <Typography variant="h6" sx={{ marginTop: 2, fontWeight: '600' }} align="center">
//             UPI Payment
//           </Typography>
//           <form onSubmit={formikUPI.handleSubmit}>
//             <TextField
//               fullWidth
//               id="upiId"
//               name="upiId"
//               label="UPI ID"
//               value={formikUPI.values.upiId}
//               onChange={formikUPI.handleChange}
//               error={formikUPI.touched.upiId && Boolean(formikUPI.errors.upiId)}
//               helperText={formikUPI.touched.upiId && formikUPI.errors.upiId}
//               margin="normal"
//               variant="outlined"
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <UpiIcon />
//                   </InputAdornment>
//                 ),
//               }}
//               sx={{ borderRadius: '8px', boxShadow: 1 }}
//             />
//             <Button
//               color="primary"
//               variant="contained"
//               type="submit"
//               fullWidth
//               sx={{
//                 marginTop: 2,
//                 borderRadius: '8px',
//                 '&:hover': {
//                   backgroundColor: '#1976d2',
//                 },
//               }}
//               disabled={loading}
//             >
//               {loading ? <CircularProgress size={24} /> : 'Pay via UPI'}
//             </Button>
//           </form>
//         </motion.div>

//         <Divider sx={{ marginY: 4, fontWeight: 'bold' }}>OR</Divider>

//         {/* Credit/Debit Card Payment Section */}
//         <motion.div
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.5 }}
//         >
//           <Typography variant="h6" align="center" sx={{ fontWeight: '600' }}>
//             Credit/Debit Card Payment
//           </Typography>
//           <form onSubmit={formikCard.handleSubmit}>
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   id="cardNumber"
//                   name="cardNumber"
//                   label="Card Number"
//                   value={formikCard.values.cardNumber}
//                   onChange={formikCard.handleChange}
//                   error={formikCard.touched.cardNumber && Boolean(formikCard.errors.cardNumber)}
//                   helperText={formikCard.touched.cardNumber && formikCard.errors.cardNumber}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <CardIcon />
//                       </InputAdornment>
//                     ),
//                   }}
//                   sx={{ borderRadius: '8px', boxShadow: 1 }}
//                 />
//               </Grid>
//               <Grid item xs={6}>
//                 <TextField
//                   fullWidth
//                   id="expiryDate"
//                   name="expiryDate"
//                   label="Expiry Date (MM/YY)"
//                   value={formikCard.values.expiryDate}
//                   onChange={formikCard.handleChange}
//                   error={formikCard.touched.expiryDate && Boolean(formikCard.errors.expiryDate)}
//                   helperText={formikCard.touched.expiryDate && formikCard.errors.expiryDate}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <CreditCardIcon />
//                       </InputAdornment>
//                     ),
//                   }}
//                   sx={{ borderRadius: '8px', boxShadow: 1 }}
//                 />
//               </Grid>
//               <Grid item xs={6}>
//                 <TextField
//                   fullWidth
//                   id="cvv"
//                   name="cvv"
//                   label="CVV"
//                   type="password"
//                   value={formikCard.values.cvv}
//                   onChange={formikCard.handleChange}
//                   error={formikCard.touched.cvv && Boolean(formikCard.errors.cvv)}
//                   helperText={formikCard.touched.cvv && formikCard.errors.cvv}
//                   sx={{ borderRadius: '8px', boxShadow: 1 }}
//                 />
//               </Grid>
//             </Grid>
//             <Button
//               color="primary"
//               variant="contained"
//               type="submit"
//               fullWidth
//               sx={{
//                 marginTop: 2,
//                 borderRadius: '8px',
//                 '&:hover': {
//                   backgroundColor: '#1976d2',
//                 },
//               }}
//               disabled={loading}
//             >
//               {loading ? <CircularProgress size={24} /> : 'Pay via Card'}
//             </Button>
//           </form>
//         </motion.div>
//       </Paper>
//     </Box>
//   );
// };

// export default Payment;

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
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const [paymentMode, setPaymentMode] = useState('upi'); // Set UPI as the default payment mode
  const [loading, setLoading] = useState(false); // State for loading
  const navigate = useNavigate()
  // Formik for UPI
  const formikUPI = useFormik({
    initialValues: {
      upiId: '',
    },
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
        navigate('/')
      }, 2000);
    },
  });

  // Formik for Credit/Debit Card
  const formikCard = useFormik({
    initialValues: {
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    },
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
        navigate('/')
      }, 2000);
    },
  });

  // Formik for PayPal
  const formikPayPal = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Email is required')
        .email('Invalid email format'),
    }),
    onSubmit: (values) => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        alert(`PayPal Payment Successful: ${values.email}`);
        navigate('/')
      }, 2000);
    },
  });

  // Formik for Wallet
  const formikWallet = useFormik({
    initialValues: {
      walletId: '',
    },
    validationSchema: Yup.object({
      walletId: Yup.string()
        .required('Wallet ID is required'),
    }),
    onSubmit: (values) => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        alert(`Wallet Payment Successful: ${values.walletId}`);
        navigate('/')
      }, 2000);
    },
  });

  return (
    <Box sx={{ padding: '40px 20px', backgroundColor: '#f0f2f5' }}>
      <Paper
        sx={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '30px',
          borderRadius: '8px',
          boxShadow: 3,
          backgroundColor: 'white',
        }}
      >
        <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', marginBottom: 3 }}>
          Payment
        </Typography>

        <Grid container spacing={2}>
          {/* Left Side: Payment Mode Selection */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" align="center" sx={{ fontWeight: '600', marginBottom: 2 }}>
              Select Payment Mode
            </Typography>
            <Button
              variant={paymentMode === 'upi' ? 'contained' : 'outlined'}
              onClick={() => setPaymentMode('upi')}
              fullWidth
              sx={{ marginBottom: 2 }}
            >
              UPI
            </Button>
            <Button
              variant={paymentMode === 'card' ? 'contained' : 'outlined'}
              onClick={() => setPaymentMode('card')}
              fullWidth
              sx={{ marginBottom: 2 }}
            >
              Credit/Debit Card
            </Button>
            <Button
              variant={paymentMode === 'paypal' ? 'contained' : 'outlined'}
              onClick={() => setPaymentMode('paypal')}
              fullWidth
              sx={{ marginBottom: 2 }}
            >
              PayPal
            </Button>
            <Button
              variant={paymentMode === 'wallet' ? 'contained' : 'outlined'}
              onClick={() => setPaymentMode('wallet')}
              fullWidth
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
                />
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  fullWidth
                  sx={{ marginTop: 2 }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Pay via UPI'}
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
                  sx={{ marginTop: 2 }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Pay via Card'}
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
                />
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  fullWidth
                  sx={{ marginTop: 2 }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Pay via PayPal'}
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
                />
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  fullWidth
                  sx={{ marginTop: 2 }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Pay via Wallet'}
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
