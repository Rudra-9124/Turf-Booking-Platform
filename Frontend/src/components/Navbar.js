import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';

const drawerWidth = 240;
const navItems = [
  { name: 'Book', path: '/book' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' }
];

function Navbar({ onLocationChange, window }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location, setLocation] = useState('Ahmedabad'); // Default location
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token')); // Check if user is logged in based on token
  const navigate = useNavigate(); // Initialize useNavigate

  // State for menu anchor
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleLocationChange = (event) => {
    const selectedLocation = event.target.value;
    setLocation(selectedLocation);
    onLocationChange(selectedLocation); // Call the callback to notify parent component
  };

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    navigate('/'); // Optionally navigate to home page after logout
  };

  // Handle click to open the user menu
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle closing the user menu
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, textDecoration: 'none', color: '#4CAF50' }} component={Link} to="/" >
        TURFO
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }} component={Link} to={item.path}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" position='fixed' sx={{ bgcolor: '#fff', color: '#4CAF50', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, textDecoration: 'none', color: '#4CAF50' }}
          >
            TURFO
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Select
              value={location}
              onChange={handleLocationChange}
              sx={{
                color: '#4CAF50',
                minWidth: '150px',
                height: '40px',
                fontSize: '16px',
                '& .MuiSelect-icon': { color: '#4CAF50' },
                '& .MuiOutlinedInput-notchedOutline': { border: '1px solid #4CAF50' }
              }}
            >
              <MenuItem value="Ahmedabad">Ahmedabad</MenuItem>
              <MenuItem value="Mumbai">Mumbai</MenuItem>
              <MenuItem value="Bangalore">Bangalore</MenuItem>
            </Select>
            <Box sx={{ ml: 2 }}>
              {navItems.map((item) => (
                <Button key={item.name} sx={{ color: '#4CAF50', '&:hover': { backgroundColor: '#E8E8E8' } }} component={Link} to={item.path}>
                  {item.name}
                </Button>
              ))}
            </Box>
            {isLoggedIn ? (
              <>
                <IconButton onClick={handleMenuClick}>
                  <AccountCircleIcon fontSize="large" />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleCloseMenu}
                  sx={{ p:4 }}
                >
                  <MenuItem onClick={handleCloseMenu}>
                    <Link to="/profile" style={{ textDecoration: 'none', color: '#000' }}>Profile</Link>
                  </MenuItem>
                  <MenuItem onClick={() => { handleLogout(); handleCloseMenu(); }}>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                sx={{
                  marginLeft: 2,
                  borderColor: '#4CAF50',
                  color: '#4CAF50',
                  '&:hover': { borderColor: '#388E3C', backgroundColor: '#E8E8E8' }
                }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 2, mt: '40px' }}>
        {/* Your page content will go here */}
      </Box>
    </Box>
  );
}

Navbar.propTypes = {
  window: PropTypes.func,
};

export default Navbar;
