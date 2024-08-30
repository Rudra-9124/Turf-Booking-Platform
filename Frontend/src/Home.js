// import React from 'react';
// import { Grid, Typography, Box, Card, CardMedia } from '@mui/material';
// import img1 from './pages/img/home.webp'
// import Container from '@mui/material/Container';
// import BookVenues from './components/BookVenue';
// import Footer from './components/Footer';
// import Navbar from './components/Navbar';


// const App = () => {
//   const popularSports = [
//     {
//       id: 1,
//       image: 'https://cdn.pixabay.com/photo/2016/05/31/23/21/badminton-1428047_640.jpg', // Replace with an actual image URL for Badminton
//       sport_name: 'Badminton',
//     },
//     {
//       id: 2,
//       image: 'https://images.pexels.com/photos/3657154/pexels-photo-3657154.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', // Replace with an actual image URL for Cricket
//       sport_name: 'Cricket',
//     },
//     {
//       id: 3,
//       image: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?cs=srgb&dl=pexels-pixabay-46798.jpg&fm=jpg', // Replace with an actual image URL for Football
//       sport_name: 'Football',
//     },
//     {
//       id: 4,
//       image: 'https://images.unsplash.com/photo-1622629797619-c100e3e67e2e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Replace with an actual image URL for Swimming
//       sport_name: 'Swimming',
//     },
//     {
//       id: 5,
//       image: 'https://imageio.forbes.com/specials-images/imageserve/61290485e59b1a3c399d34e7/0x0.jpg?format=jpg&crop=2699,1519,x0,y0,safe&height=900&width=1600&fit=bounds', // Replace with an actual image URL for Tennis
//       sport_name: 'Tennis',
//     },
//   ];
//   return (
//     <>
//     <Navbar />
//     <Grid container spacing={2} alignItems="center" justifyContent="center" style={{ minHeight: '100vh' }}>
//       {/* Left Side: Text */}
//       <Grid item xs={12} md={6}>
//         <Box sx={{ textAlign: 'left', p: 3 }}>
//           <Typography variant="h3" color="textprimary" sx={{ fontWeight: 'bold' }}>
//             FIND PLAYERS & VENUES NEARBY
//           </Typography>
//           <Typography variant="body1" color="textprimary" sx={{ fontWeight: 'bold' }}>
//             Seamlessly explore sports venues and play with sports enthusiasts just like you!
//           </Typography>
//         </Box>
//       </Grid>

//       {/* Right Side: Image */}
//       <Grid item xs={12} md={6}>
//         <Box sx={{ textAlign: 'center', paddingRight: 3, paddingBottom: 3 }}>
//           <img src={img1} alt="Venue or Players" style={{ maxWidth: '100%', borderRadius: '10px', height: '700px' }} />
//         </Box>
//       </Grid>
//     </Grid>

//     <Box sx={{ bgcolor: '#E8E8E8', minHeight: '100vh' }}> {/* Full-screen grey background */}
//       <Container fixed sx={{ p:3 }}>
//         <Box
//           sx={{
//             bgcolor: '#fff',
//             height: 'auto', // Adjust height to auto for dynamic content
//             borderRadius: '10px',
//             mt: 2, // Margin-top for some spacing
//             boxShadow: 3, // Optional: adds shadow for better visibility
//             paddingTop: 2, // Optional: add some padding inside the box
//             paddingBottom: 2, // Optional: add some padding inside the box
//           }}
//         >
//           <BookVenues /> 

//           <Box sx={{ padding: 2, mt: 4 }}>
//           <Typography variant="h4" gutterBottom>
//             Popular Sports
//           </Typography>
//           <Box sx={{ display: 'flex',
//               justifyContent: 'space-between', // Space between cards
//               overflowX: 'hidden', // Allows horizontal scrolling if needed
//             }}>
//             {popularSports.map((sport) => (
//               <Card
//                 key={sport.id}
//                 sx={{
//                   position: 'relative',
//                   flex: '0 0 auto', // Prevent shrinking, allow auto width
//                   width: '200px', // Slim card width
//                   height: '200px', // Set card height
//                   margin: '0 10px', // Horizontal gap between cards
//                   borderRadius: '10px', // Rounded corners
//                   boxShadow: 3, // Optional: Adds shadow for better visibility
//                 }}>
//                 <CardMedia
//                   component="img"
//                   height="200" // Set the image height
//                   image={sport.image}
//                   alt={sport.sport_name}
//                   sx={{
//                     borderTopLeftRadius: '10px',
//                     borderTopRightRadius: '10px', // Rounded corners for image
//                   }}
//                 />
//                 <Box sx={{ position: 'absolute', bottom: 0, left: 0, width: '100%',
//                       bgcolor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
//                       color: 'white',
//                       textAlign: 'center',
//                       padding: '5px 0',
//                       borderBottomLeftRadius: '10px', // Matching rounded corners
//                       borderBottomRightRadius: '10px',
//                     }}
//                   >
//                     <Typography variant="body1" sx={{ fontSize: '14px' }}>
//                       {sport.sport_name}
//                     </Typography>
//                   </Box>
//                 </Card>
//               ))}
//             </Box>
//           </Box>
//         </Box>
//         <Footer/>
//       </Container>
//     </Box>
//     </>
//   );
// };

// export default App;

import React from 'react';
import { Grid, Typography, Box, Card, CardMedia } from '@mui/material';
import img1 from './pages/img/home.webp';
import Container from '@mui/material/Container';
import BookVenues from './components/BookVenue';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

const App = () => {
  const popularSports = [
    {
      id: 1,
      image: 'https://cdn.pixabay.com/photo/2016/05/31/23/21/badminton-1428047_640.jpg',
      sport_name: 'Badminton',
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/3657154/pexels-photo-3657154.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      sport_name: 'Cricket',
    },
    {
      id: 3,
      image: 'https://www.rockstaracademy.com/lib/images/news/basketball.jpeg',
      sport_name: 'Basketball',
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1622629797619-c100e3e67e2e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      sport_name: 'Swimming',
    },
    {
      id: 5,
      image: 'https://imageio.forbes.com/specials-images/imageserve/61290485e59b1a3c399d34e7/0x0.jpg?format=jpg&crop=2699,1519,x0,y0,safe&height=900&width=1600&fit=bounds',
      sport_name: 'Tennis',
    },
  ];

  return (
    <>
      <Navbar />
      <Grid container spacing={2} alignItems="center" justifyContent="center" style={{ minHeight: '100vh' }}>
        {/* Left Side: Text */}
        <Grid item xs={12} md={6}>
          <Box sx={{ textAlign: 'left', p: 3 }}>
            <Typography variant="h3" color="textPrimary" sx={{ fontWeight: 'bold' }}>
              FIND PLAYERS & VENUES NEARBY
            </Typography>
            <Typography variant="body1" color="textPrimary" sx={{ fontWeight: 'bold' }}>
              Seamlessly explore sports venues and play with sports enthusiasts just like you!
            </Typography>
          </Box>
        </Grid>

        {/* Right Side: Image */}
        <Grid item xs={12} md={6}>
          <Box sx={{ textAlign: 'center', paddingLeft: 3, paddingRight: 3, paddingBottom: 3}}>
            <img
              src={img1}
              alt="Venue or Players"
              style={{ maxWidth: '100%', borderRadius: '10px', height: 'auto' }}
            />
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ bgcolor: '#E8E8E8', minHeight: '100vh' }}>
        <Container fixed sx={{ p: 3 }}>
          <Box
            sx={{
              bgcolor: '#fff',
              height: 'auto',
              borderRadius: '10px',
              mt: 2,
              boxShadow: 3,
              paddingTop: 2,
              paddingBottom: 2,
            }}
          >
            <BookVenues />

            <Box sx={{ padding: 2, mt: 4 }}>
              <Typography variant="h4" gutterBottom>
                Popular Sports
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap', // Allow wrapping for smaller screens
                  justifyContent: 'space-between',
                  overflowX: 'hidden',
                }}
              >
                {popularSports.map((sport) => (
                  <Card
                    key={sport.id}
                    sx={{
                      flex: '0 0 auto',
                      width: { xs: '100%', sm: '48%', md: '30%', lg: '200px' },
                      height: '200px',
                      margin: '10px',
                      borderRadius: '10px',
                      boxShadow: 3,
                      position: 'relative', // Ensure position is set for the overlay
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={sport.image}
                      alt={sport.sport_name}
                      sx={{
                        borderTopLeftRadius: '10px',
                        borderTopRightRadius: '10px',
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        bgcolor: 'rgba(0, 0, 0, 0.7)', // Slightly darker for better contrast
                        color: 'white',
                        textAlign: 'center',
                        padding: '10px 0', // More padding for better spacing
                        borderBottomLeftRadius: '10px',
                        borderBottomRightRadius: '10px',
                        display: 'flex', // Use flex to center the text
                        alignItems: 'center', // Center vertically
                        justifyContent: 'center', // Center horizontally
                      }}
                    >
                      <Typography variant="body1" sx={{ fontSize: '16px', fontWeight: 'bold' }}>
                        {sport.sport_name}
                      </Typography>
                    </Box>
                  </Card>
                ))}
              </Box>
            </Box>
          </Box>
          <Footer />
        </Container>
      </Box>
    </>
  );
};

export default App;
