import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button, Box, TextField, Grid, Card, CardContent } from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
function PropertyList() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [filters, setFilters] = useState({
    place: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    nearby: ''
  });
  const[open,setOpen]=useState(false);
  const handleClose=()=>{
    setOpen(false)
    setSelectedProperty(null);
  }
  useEffect(() => {
    const storedProperties = JSON.parse(localStorage.getItem('properties')) || [];
    const updatedProperties = storedProperties.map(property => ({
      ...property,
      likes: property.likes || 0
    }));
    setProperties(updatedProperties);
    setFilteredProperties(updatedProperties);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    setFilteredProperties(
      properties.filter((property) => {
        return Object.keys(filters).every((key) => {
          return property[key].toString().toLowerCase().includes(filters[key].toString().toLowerCase());
        });
      })
    );
  };

  const handleLike = (index) => {
    const updatedProperties = [...properties];
    updatedProperties[index].likes += 1;
    setProperties(updatedProperties);
    setFilteredProperties(updatedProperties);
    localStorage.setItem('properties', JSON.stringify(updatedProperties));
  };

  const handleInterested = (property) => {
    setSelectedProperty(property);
    setOpen(true);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Available Properties
        </Typography>
        <Box component="form" sx={{ mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Place"
                name="place"
                value={filters.place}
                onChange={handleFilterChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Area"
                name="area"
                value={filters.area}
                onChange={handleFilterChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Bedrooms"
                name="bedrooms"
                value={filters.bedrooms}
                onChange={handleFilterChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Bathrooms"
                name="bathrooms"
                value={filters.bathrooms}
                onChange={handleFilterChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nearby"
                name="nearby"
                value={filters.nearby}
                onChange={handleFilterChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={applyFilters} fullWidth>
                Apply Filters
              </Button>
            </Grid>
          </Grid>
        </Box>
        <List>
          {filteredProperties.map((property, index) => (
            <ListItem key={index} sx={{ mb: 2, border: '1px solid #ccc', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
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
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleLike(index)}
                sx={{ mr: 2 }}
              >
                <ThumbUpOffAltIcon />
              </Button>
              <Button>{property.likes}</Button>
              <Button variant="contained" color="primary" onClick={() => handleInterested(property)}>
                I'm Interested
              </Button>
            </ListItem>
          ))}
        </List>
        {selectedProperty && (
          <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
          <DialogTitle>Seller Details</DialogTitle>
          <DialogContent>
          <Typography>Name: {selectedProperty.name || 'Unavailable'}</Typography>
              <Typography>Email: {selectedProperty.email || 'Unavailable'}</Typography>
              <Typography>Phone: {selectedProperty.phone || 'Unavailable'}</Typography>
          </DialogContent>
        </Dialog>
        )}
      </Box>
    </Container>
  );
}

export default PropertyList;



