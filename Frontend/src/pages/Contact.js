// import React from 'react'
// import Navbar from '../components/Navbar'
// import { Box, Typography, TextField, Button } from '@mui/material';
// import Footer from '../components/Footer'
// const Signup = () => {
//   return (
//     <div>
//       <Navbar/>
//       <Box display="flex" justifyContent="space-between" padding="20px">
//       {/* Left Box - Contact Information */}
//       <Box width="45%" bgcolor="#f9f9f9" padding="20px" borderRadius="8px">
//         <Typography variant="h3" align="center">
//           Let's talk
//         </Typography>
//         <Typography variant="body1" align="center" sx={{color:'green'}}>
//           contact@turfo.co
//         </Typography>
        
//         <Typography variant="h6" sx={{mt:10, fontWeight:'bold'}}>Ahmedabad </Typography>
//         <Typography variant="body2">Contact Number: <Typography variant="body5" sx={{textDecoration:'underline',color:'green'}}>+91 12345 67890</Typography></Typography>
//         <Typography variant="body3">Address: Address Line 1, Ahmedabad</Typography>

//         <Typography variant="h6" marginTop="20px" sx={{fontWeight:'bold'}}>Bangalore </Typography>
//         <Typography variant="body2">Contact Number:<Typography variant="body5" sx={{textDecoration:'underline',color:'green'}}>+91 12396 54266</Typography></Typography>
//         <Typography variant="body3">Address: Address Line 1, Bangalore</Typography>

//         <Typography variant="h6" marginTop="20px" sx={{fontWeight:'bold'}}>Agra </Typography>
//         <Typography variant="body2">Contact Number: <Typography variant="body5" sx={{textDecoration:'underline',color:'green'}}>+91 15622 78951</Typography></Typography>
//         <Typography variant="body3">Address: Address Line 1, Agra</Typography>
//       </Box>

//       {/* Right Box - Contact Form */}
//       <Box width="45%" bgcolor="#f9f9f9" padding="20px" borderRadius="8px">
//         <Typography variant="h5" align="center" marginBottom="20px">
//           Get in Touch
//         </Typography>
//         <TextField fullWidth label="Name" variant="outlined" margin="normal" required={true}/>
//         <TextField fullWidth label="Email" variant="outlined" margin="normal" />
//         <TextField fullWidth label="Mobile" variant="outlined" margin="normal" required={true}/>
//         <TextField
//           fullWidth
//           label="Message"
//           variant="outlined"
//           margin="normal"
//           multiline
//           rows={4}
//         />
//         <Button variant="contained" color="primary">
//           Send
//         </Button>
//       </Box>
//     </Box>
//     <Footer />
//     </div>
//   )
// }

// export default Signup

import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Box, Typography, TextField, Button, Grid } from '@mui/material';

const Signup = () => {
  return (
    <div>
      <Navbar />
      <Box padding="20px">
        <Grid container spacing={2}>
          {/* Left Grid Item - Contact Information */}
          <Grid item xs={12} md={6}>
            <Box bgcolor="#f9f9f9" padding="20px" borderRadius="8px">
              <Typography variant="h4" align="center" gutterBottom>
                Let's talk
              </Typography>
              <Typography variant="body1" align="center" sx={{ color: 'green' }} gutterBottom>
                contact@turfo.co
              </Typography>

              <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>Ahmedabad</Typography>
              <Typography variant="body2">
                Contact Number: <Typography variant="body2" component="span" sx={{ textDecoration: 'underline', color: 'green' }}>+91 12345 67890</Typography>
              </Typography>
              <Typography variant="body2">Address: Address Line 1, Ahmedabad</Typography>

              <Typography variant="h6" sx={{ mt: 4, fontWeight: 'bold' }}>Bangalore</Typography>
              <Typography variant="body2">
                Contact Number: <Typography variant="body2" component="span" sx={{ textDecoration: 'underline', color: 'green' }}>+91 12396 54266</Typography>
              </Typography>
              <Typography variant="body2">Address: Address Line 1, Bangalore</Typography>

              <Typography variant="h6" sx={{ mt: 4, fontWeight: 'bold' }}>Agra</Typography>
              <Typography variant="body2">
                Contact Number: <Typography variant="body2" component="span" sx={{ textDecoration: 'underline', color: 'green' }}>+91 15622 78951</Typography>
              </Typography>
              <Typography variant="body2">Address: Address Line 1, Agra</Typography>
            </Box>
          </Grid>

          {/* Right Grid Item - Contact Form */}
          <Grid item xs={12} md={6}>
            <Box bgcolor="#f9f9f9" padding="20px" borderRadius="8px">
              <Typography variant="h5" align="center" marginBottom="20px">
                Get in Touch
              </Typography>
              <TextField fullWidth label="Name" variant="outlined" margin="normal" required />
              <TextField fullWidth label="Email" variant="outlined" margin="normal" />
              <TextField fullWidth label="Mobile" variant="outlined" margin="normal" required />
              <TextField
                fullWidth
                label="Message"
                variant="outlined"
                margin="normal"
                multiline
                rows={4}
              />
              <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Send
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </div>
  );
};

export default Signup;
