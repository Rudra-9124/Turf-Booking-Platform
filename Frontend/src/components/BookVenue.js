import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardMedia, CardContent, IconButton, Rating } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';


const fetchVenues = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/venue');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch venues');
  }
};

// Custom Next/Prev Arrow
const Arrow = ({ onClick, icon, direction }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: 'absolute',
      top: '50%',
      zIndex: 1,
      transform: 'translateY(-50%)',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      color: 'white',
      left: direction === 'prev' ? '10px' : 'auto',  // Set left for prev arrow
      right: direction === 'next' ? '10px' : 'auto', // Set right for next arrow
      '&:hover': {
        backgroundColor: 'black',
      },
    }}
  >
    {icon}
  </IconButton>
);

const BookVenues = () => {
  const [venues, setVenues] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleCardClick = (venueId) => {
    navigate(`/venue/${venueId}`); // Use navigate instead of history.push
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchVenues();
        setVenues(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <Arrow icon={<ArrowForwardIos />} direction="next" />,
    prevArrow: <Arrow icon={<ArrowBackIos />} direction='prev' />,
    responsive: [
      {
        breakpoint: 1024, // Medium devices
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600, // Small devices
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Book Venues
      </Typography>
      <Slider {...settings}>
      {venues.map((venue) => (
        <Card
          key={venue.id}
          sx={{
            position: 'relative',
            m: 2,
            '&:hover': {
              transform: 'scale(1.05)',
              transition: 'transform 0.3s ease',
            },
          }}
          onClick={() => handleCardClick(venue.id)}
        >
          <Box sx={{ position: 'relative' }}>
            <CardMedia
              component="img"
              height="200"
              image={venue.image}
              alt={venue.name}
              sx={{ objectFit: 'cover' }}
            />
            {/* <Box
              sx={{
                position: 'absolute',
                top: 10,
                left: 10,
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                color: 'white',
                padding: '5px 10px',
                borderRadius: '5px',
              }}
            >
              <Typography variant="body2">{venue.type}</Typography> Bookable
            </Box> */}
          </Box>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h6">{venue.name}</Typography>
            <Typography color="text.secondary">{venue.area}</Typography>

            {/* Rating Component */}
            <Rating value={venue.rating} readOnly size="small" sx={{ mt: 1 }} />
          </CardContent>
        </Card>
      ))}
    </Slider>
    </Box>
  );
};

export default BookVenues;