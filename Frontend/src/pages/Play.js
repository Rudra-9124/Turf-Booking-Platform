import React from 'react';
import Navbar from '../components/Navbar'
import { Box, Typography} from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const Play = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  return (
    <>
      <Navbar />
      <Box sx={{ backgroundColor: '#E8E8E8', p: 4, borderRadius: 2 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Games in Ahmedabad
      </Typography>
      <Grid container spacing={5}>
        <Grid xs>
          <Item>
            <FilterAltIcon/>
          </Item>
        </Grid>
        <Grid xs>
          <Item>xs</Item>
        </Grid>
        <Grid xs>
          <Item>xs</Item>
        </Grid>
        <Grid xs>
          <Item>xs</Item>
        </Grid>
      </Grid>
      </Box>
    </>
  );
};

export default Play;