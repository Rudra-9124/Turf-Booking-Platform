// import React, { useEffect, useState } from 'react';
// import Navbar from '../components/Navbar';
// import { Box, Grid, Typography, TextField, FormControl, InputLabel, Select, MenuItem, InputAdornment, Tabs, Tab, Card, CardContent, CardMedia, IconButton } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
// import SportsCricketIcon from '@mui/icons-material/SportsCricket';
// import SportsTennisIcon from '@mui/icons-material/SportsTennis';
// import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
// import Footer from '../components/Footer';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';


// const sportsIcons = {
//   soccer: <SportsSoccerIcon />,
//   cricket: <SportsCricketIcon />,
//   tennis: <SportsTennisIcon />,
//   basketball: <SportsBasketballIcon />,
// };

// const Book = () => {
//   const [counts, setCounts] = useState({
//     venues_count: 0,
//     coaching_count: 0,
//     events_count: 0,
//     deals_count: 0,
//   });
//   const [places, setPlaces] = useState([]); // State to hold fetched places
//   const navigate = useNavigate(); // Initialize useNavigate

  // const handleCardClick = (venueId) => {
  //   navigate(`/venue/${venueId}`); // Use navigate instead of history.push
  // };

  // useEffect(() => {
  //   const fetchCounts = async () => {
  //     try {
  //       const response = await axios.get('/get-counts');
  //       setCounts(response.data);
  //     } catch (error) {
  //       console.error('Error fetching counts:', error);
  //     }
  //   };

  //   const fetchPlaces = async () => {
  //     try {
  //       const response = await axios.get('http://127.0.0.1:8000/venue'); // Adjust this endpoint to your Django API
  //       setPlaces(response.data);
  //     } catch (error) {
  //       console.error('Error fetching places:', error);
  //     }
  //   };

  //   fetchCounts();
  //   fetchPlaces();
  // }, []);

//   return (
//     <div>
//       <Navbar />
//       <Box sx={{ p: 2, backgroundColor: '#fff', boxShadow: 1 }}>
//         <Grid container alignItems="center" spacing={2}>
//           <Grid item xs={12} md={6}>
//             <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
//               Discover and Book Top Sports Complexes in Ahmedabad Online
//             </Typography>
//           </Grid>
//           <Grid item xs={12} md={3}>
//             <TextField
//               fullWidth
//               variant="outlined"
//               label="Search Venue"
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <SearchIcon />
//                   </InputAdornment>
//                 ),
//               }}
//             />
//           </Grid>
//           <Grid item xs={12} md={3}>
//             <FormControl fullWidth variant="outlined">
//               <InputLabel>Select Sport</InputLabel>
//               <Select defaultValue="">
//                 <MenuItem value="cricket">Cricket</MenuItem>
//                 <MenuItem value="football">Football</MenuItem>
//                 <MenuItem value="badminton">Badminton</MenuItem>
//                 <MenuItem value="tennis">Tennis</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>
//         </Grid>
//       </Box>

//       <Grid container spacing={8} sx={{ pl: 6, pr: 6, pb: 6, bgcolor: '#E8E8E8', my:0.5 }}>
//         {places.map((place, index) => (
//           <Grid item xs={12} sm={6} md={4} key={index}>
//             <Card onClick={() => handleCardClick(place.id)}>
//               <CardMedia
//                 component="img"
//                 height="200"
//                 image={place.image}
//                 alt={place.placeName}
//               />
//               <CardContent>
//                 <Typography variant="h6">
//                   {place.name}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   {place.area}
//                 </Typography>
//                 {/* <Box sx={{ mt: 2 }}>
//                   {place.sports.map((sport, idx) => (
//                     <IconButton key={idx} aria-label={sport}>
//                       {sportsIcons[sport]}
//                     </IconButton>
//                   ))}
//                 </Box> */}
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//       <Footer />
//     </div>
//   );
// };

// export default Book;

import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Box, Grid, Typography, TextField, FormControl, InputLabel, Select, MenuItem, InputAdornment, Card, CardContent, CardMedia } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import Footer from '../components/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const sportsIcons = {
  soccer: <SportsSoccerIcon />,
  cricket: <SportsCricketIcon />,
  tennis: <SportsTennisIcon />,
  basketball: <SportsBasketballIcon />,
};

const Book = () => {
  const [counts, setCounts] = useState({
    venues_count: 0,
    coaching_count: 0,
    events_count: 0,
    deals_count: 0,
  });
  const [places, setPlaces] = useState([]); // State to hold fetched places
  const [searchInput, setSearchInput] = useState(''); // State for search input
  const navigate = useNavigate(); // Initialize useNavigate

  const handleCardClick = (venueId) => {
    console.log(venueId)
    navigate(`/venue/${venueId}`); // Use navigate instead of history.push
  };

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await axios.get('/get-counts');
        setCounts(response.data);
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    const fetchPlaces = async (query = '') => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/venue?search=${query}`); 
        setPlaces(response.data);
      } catch (error) {
        console.error('Error fetching places:', error);
      }
    };

    fetchCounts();
    fetchPlaces(searchInput);  // Fetch places with search input

  }, [searchInput]); // Re-fetch when searchInput changes


  return (
    <div>
      <Navbar />
      <Box sx={{ p: 2, backgroundColor: '#fff', boxShadow: 1 }}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Discover and Book Top Sports Complexes in Ahmedabad Online
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              variant="outlined"
              label="Search Venue"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)} // Update state on input change
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Select Sport</InputLabel>
              <Select defaultValue="">
                <MenuItem value="cricket">Cricket</MenuItem>
                <MenuItem value="football">Football</MenuItem>
                <MenuItem value="badminton">Badminton</MenuItem>
                <MenuItem value="tennis">Tennis</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={8} sx={{ pl: 6, pr: 6, pb: 6, bgcolor: '#E8E8E8', my: 0.5 }}>
        {places.map((place, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card onClick={() => handleCardClick(place.id)}>
              <CardMedia
                component="img"
                height="200"
                image={place.image}
                alt={place.placeName}
              />
              <CardContent>
                <Typography variant="h6">
                  {place.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {place.area}
                </Typography>
                {/* <Box sx={{ mt: 2 }}>
                  {place.sports.map((sport, idx) => (
                    <IconButton key={idx} aria-label={sport}>
                      {sportsIcons[sport]}
                    </IconButton>
                  ))}
                </Box> */}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Footer />
    </div>
  );
};

export default Book;
