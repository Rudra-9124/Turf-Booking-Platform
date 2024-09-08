import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardMedia, CardContent } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const fetchVenues = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/venue');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch venues');
  }
};

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
    nextArrow: <div style={{ display: 'block', background: 'black', padding: '10px', color: 'white' }}>Next</div>,
    prevArrow: <div style={{ display: 'block', background: 'black', padding: '10px', color: 'white' }}>Prev</div>,
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
          <Card key={venue.id} sx={{ m: 1 }} onClick={() => handleCardClick(venue.id)}> {/* Add onClick event */}
            <CardMedia
              component="img"
              height="200"
              image={venue.image}
              alt={venue.name}
              sx={{ objectFit: 'cover' }}
            />
            <CardContent>
              <Typography variant="h6">{venue.name}</Typography>
              <Typography color="text.secondary">{venue.area}</Typography>
            </CardContent>
          </Card>
        ))}
      </Slider>
    </Box>
  );
};

export default BookVenues;