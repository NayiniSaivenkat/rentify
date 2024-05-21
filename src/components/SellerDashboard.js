// src/components/SellerDashboard.js
import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box, Grid, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function SellerDashboard() {
  const [property, setProperty] = useState({
    place: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    nearby: '',
    name:"",
    email:"",
    phone:"",
  });

  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const storedProperties = JSON.parse(localStorage.getItem('properties')) || [];
    setProperties(storedProperties);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty((prevProperty) => ({ ...prevProperty, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProperties = [...properties, property];
    setProperties(updatedProperties);
    localStorage.setItem('properties', JSON.stringify(updatedProperties));
    setProperty({ place: '', area: '', bedrooms: '', bathrooms: '', nearby: '' });
  };

  const handleDelete = (index) => {
    const updatedProperties = properties.filter((_, i) => i !== index);
    setProperties(updatedProperties);
    localStorage.setItem('properties', JSON.stringify(updatedProperties));
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Seller Dashboard
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Place"
                name="place"
                value={property.place}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Area"
                name="area"
                value={property.area}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Bedrooms"
                name="bedrooms"
                value={property.bedrooms}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Bathrooms"
                name="bathrooms"
                value={property.bathrooms}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label="Nearby"
                name="nearby"
                value={property.nearby}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={property.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={property.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone number"
                name="phone"
                value={property.phone}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit" fullWidth>
                Add Property
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Typography variant="h5" gutterBottom>
          Your Properties
        </Typography>
        <List>
          {properties.map((property, index) => (
            <ListItem key={index} sx={{ mb: 2, border: '1px solid #ccc', borderRadius: '8px' }}>
              <ListItemText
                primary={property.place}
                secondary={
                  <>
                    <Typography component="span">
                      Area: {property.area}, Bedrooms: {property.bedrooms}, Bathrooms: {property.bathrooms}, Nearby: {property.nearby}
                    </Typography>
                  </>
                }
              />
              <IconButton onClick={() => handleDelete(index)}>
                <DeleteIcon color="secondary" />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}

export default SellerDashboard;
