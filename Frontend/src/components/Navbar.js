// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import CssBaseline from '@mui/material/CssBaseline';
// import Divider from '@mui/material/Divider';
// import Drawer from '@mui/material/Drawer';
// import IconButton from '@mui/material/IconButton';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
// import MenuIcon from '@mui/icons-material/Menu';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import { Link } from 'react-router-dom';
// import LoginDialog from '../pages/Login'; // Adjust the path accordingly
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';

// const drawerWidth = 240;
// const navItems = [
//   { name: 'Book', path: '/book' },
//   { name: 'About', path: '/about' },
//   { name: 'Contact', path: '/contact' }
// ];

// function Navbar({ onLocationChange, window }) {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [location, setLocation] = useState('Ahmedabad'); // Default location

//   const handleDrawerToggle = () => {
//     setMobileOpen((prevState) => !prevState);
//   };

//   const handleLocationChange = (event) => {
//     const selectedLocation = event.target.value;
//     setLocation(selectedLocation);
//     onLocationChange(selectedLocation); // Call the callback to notify parent component
//   };

//   const drawer = (
//     <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
//       <Typography variant="h6" sx={{ my: 2, textDecoration: 'none', color: '#4CAF50' }} component={Link} to="/" >
//         TURFO
//       </Typography>
//       <Divider />
//       <List>
//         {navItems.map((item) => (
//           <ListItem key={item.name} disablePadding>
//             <ListItemButton sx={{ textAlign: 'center' }} component={Link} to={item.path}>
//               <ListItemText primary={item.name} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );

//   const container = window !== undefined ? () => window().document.body : undefined;

//   const [openDialog, setOpenDialog] = useState(false);

//   const handleDialogOpen = () => {
//     setOpenDialog(true);
//   };

//   const handleDialogClose = () => {
//     setOpenDialog(false);
//   };

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <AppBar component="nav" position='fixed' sx={{ bgcolor: '#ffff', color: '#4CAF50', p: 1.5, boxShadow: 'none', opacity: 1 }}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             edge="start"
//             onClick={handleDrawerToggle}
//             sx={{ mr: 2, display: { sm: 'none' } }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography
//             variant="h6"
//             component={Link}
//             to="/"
//             sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, textDecoration: 'none', color: '#4CAF50' }}
//           >
//             TURFO
//           </Typography>

//           <Button 
//             sx={{ 
//               ml: 2, 
//               height: '40px', 
//               display: 'flex', 
//               alignItems: 'center', 
//               color: '#ffffff', 
//               background: 'linear-gradient(45deg, #66BB6A, #4CAF50)', 
//               borderRadius: '25px', 
//               padding: '0 16px',
//               '&:hover': { 
//                 background: 'linear-gradient(45deg, #4CAF50, #388E3C)' 
//               }
//             }}
//           >
//             <Select
//               value={location}
//               onChange={handleLocationChange}
//               sx={{ 
//                 color: '#ffffff', 
//                 minWidth: '150px',
//                 height: '100%', 
//                 fontSize: '16px', 
//                 '& .MuiSelect-icon': { color: '#ffffff' },
//                 '& .MuiOutlinedInput-notchedOutline': { border: 'none' }
//               }} 
//               disableUnderline
//             >
//               <MenuItem value="Ahmedabad">Ahmedabad</MenuItem>
//               <MenuItem value="Mumbai">Mumbai</MenuItem>
//               <MenuItem value="Bangalore">Bangalore</MenuItem>
//             </Select>
//           </Button>

//           <Box sx={{ display: { xs: 'none', sm: 'block' }, ml: 2 }}>
//             {navItems.map((item) => (
//               <Button key={item.name} sx={{ color: '#4CAF50' }} component={Link} to={item.path}>
//                 {item.name}
//               </Button>
//             ))}
//           </Box>
//           <Box>
//             <Button component={Link} to="/login" variant="outlined">
//               Login
//             </Button>
//           </Box>
//         </Toolbar>
//       </AppBar>
//       <nav>
//         <Drawer
//           container={container}
//           variant="temporary"
//           open={mobileOpen}
//           onClose={handleDrawerToggle}
//           ModalProps={{
//             keepMounted: true, // Better open performance on mobile.
//           }}
//           sx={{
//             display: { xs: 'block', sm: 'none' },
//             '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
//           }}
//         >
//           {drawer}
//         </Drawer>
//       </nav>
//       <Box component="main" sx={{ p: 2, mt: '55px' }}>
//         {/* Your page content will go here */}
//       </Box>
//     </Box>
//   );
// }

// Navbar.propTypes = {
//   window: PropTypes.func,
// };

// export default Navbar;

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
import { Link } from 'react-router-dom';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const drawerWidth = 240;
const navItems = [
  { name: 'Book', path: '/book' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' }
];

function Navbar({ onLocationChange, window }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location, setLocation] = useState('Ahmedabad'); // Default location

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleLocationChange = (event) => {
    const selectedLocation = event.target.value;
    setLocation(selectedLocation);
    onLocationChange(selectedLocation); // Call the callback to notify parent component
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
      <AppBar component="nav" position='fixed' sx={{ bgcolor: '#ffff', color: '#4CAF50', p: 1.5, boxShadow: 'none', opacity: 1 }}>
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

          <Button 
            sx={{ 
              ml: 2, 
              height: '40px', 
              display: 'flex', 
              alignItems: 'center', 
              color: '#ffffff', 
              background: 'linear-gradient(45deg, #66BB6A, #4CAF50)', 
              borderRadius: '25px', 
              padding: '0 16px',
              '&:hover': { 
                background: 'linear-gradient(45deg, #4CAF50, #388E3C)' 
              }
            }}
          >
            <Select
              value={location}
              onChange={handleLocationChange}
              sx={{ 
                color: '#ffffff', 
                minWidth: '150px',
                height: '100%', 
                fontSize: '16px', 
                '& .MuiSelect-icon': { color: '#ffffff' },
                '& .MuiOutlinedInput-notchedOutline': { border: 'none' }
              }} 
              disableUnderline
            >
              <MenuItem value="Ahmedabad">Ahmedabad</MenuItem>
              <MenuItem value="Mumbai">Mumbai</MenuItem>
              <MenuItem value="Bangalore">Bangalore</MenuItem>
            </Select>
          </Button>

          <Box sx={{ display: { xs: 'none', sm: 'block' }, ml: 2 }}>
            {navItems.map((item) => (
              <Button key={item.name} sx={{ color: '#4CAF50' }} component={Link} to={item.path}>
                {item.name}
              </Button>
            ))}
          </Box>
          <Box>
            <Button component={Link} to="/login" variant="outlined">
              Login
            </Button>
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
      <Box component="main" sx={{ p: 2, mt: '55px' }}>
        {/* Your page content will go here */}
      </Box>
    </Box>
  );
}

Navbar.propTypes = {
  window: PropTypes.func,
};

export default Navbar;
