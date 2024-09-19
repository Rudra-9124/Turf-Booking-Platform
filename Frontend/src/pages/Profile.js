import React, { useEffect, useState } from 'react';
import { AppBar, Box, Button, Container, CssBaseline, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = () => {
    const [username, setUsername] = useState('');
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch username from local storage
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []); // Run once on component mount

    useEffect(() => {
        if (username) {
            const token = localStorage.getItem('token'); 

            // Fetch booking details from the backend
            const fetchBookings = async () => {
                try {
                    const response = await axios.get('http://localhost:8000/booking/', { 
                        params: { user: username }, // Pass username in query parameters
                        withCredentials: true, // Ensure cookies are sent if using session authentication
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`, // Add token if required
                        },
                    });
                    console.log(response.data);
                    setBookings(response.data); // Assuming the API returns an array of bookings
                } catch (error) {
                    console.error('Error fetching bookings:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchBookings();
        }
    }, [username]); // Fetch bookings whenever username changes

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <CssBaseline />
            <AppBar position="static" sx={{ bgcolor: '#4CAF50' }}>
                <Container>
                    <Typography variant="h6" color="white">
                        TURFO
                    </Typography>
                </Container>
            </AppBar>
            <Container sx={{ flexGrow: 1, mt: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Welcome, {username}!
                </Typography>

                {loading ? (
                    <Typography>Loading your bookings...</Typography>
                ) : (
                    <>
                        <Typography variant="h6" gutterBottom>
                            Your Booking Details
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Venue Name</TableCell>
                                        <TableCell>Sport</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Time</TableCell>
                                        <TableCell>Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {bookings.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={5} align="center">
                                                No bookings found.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        bookings.map((booking) => (
                                            <TableRow key={booking.id}>
                                                <TableCell>{booking.venue_name}</TableCell>
                                                <TableCell>{booking.sport}</TableCell>
                                                <TableCell>{booking.date}</TableCell>
                                                <TableCell>{booking.time}</TableCell>
                                                <TableCell>{booking.price}</TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                )}
                <Box sx={{ mt: 4 }}>
                    <Button variant="contained" component={Link} to="/" sx={{ bgcolor: '#4CAF50' }}>
                        Go to Home
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default ProfilePage;
