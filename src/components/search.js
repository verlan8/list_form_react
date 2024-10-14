import React from 'react';
import {
    Box,
    Button,
    TextField,
    Grid,
} from '@mui/material';

const Search = ({ 
    searchTerm, 
    minArea, 
    maxArea, 
    minRent, 
    maxRent, 
    handleSearchChange, 
    handleFilterChange, 
    handleSearch 
}) => {
    return (
        <Box mb={2}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <TextField 
                        fullWidth 
                        label="Поиск..." 
                        variant="outlined" 
                        value={searchTerm} 
                        onChange={handleSearchChange} 
                    />
                </Grid>
                <Grid item xs={6} sm={2}>
                    <TextField 
                        fullWidth 
                        name="minArea" 
                        label="Мин. площадь" 
                        type="number" 
                        variant="outlined" 
                        value={minArea} 
                        onChange={handleFilterChange} 
                    />
                </Grid>
                <Grid item xs={6} sm={2}>
                    <TextField 
                        fullWidth 
                        name="maxArea" 
                        label="Макс. площадь" 
                        type="number" 
                        variant="outlined" 
                        value={maxArea} 
                        onChange={handleFilterChange} 
                    />
                </Grid>
                <Grid item xs={6} sm={2}>
                    <TextField 
                        fullWidth 
                        name="minRent" 
                        label="Мин. аренда" 
                        type="number" 
                        variant="outlined" 
                        value={minRent} 
                        onChange={handleFilterChange} 
                    />
                </Grid>
                <Grid item xs={6} sm={2}>
                    <TextField 
                        fullWidth 
                        name="maxRent" 
                        label="Макс. аренда" 
                        type="number" 
                        variant="outlined" 
                        value={maxRent} 
                        onChange={handleFilterChange} 
                    />
                </Grid>
            </Grid>
            <Button 
                variant="contained" 
                color="primary" 
                onClick={handleSearch} 
                sx={{ mt: 2 }}
            >
                Поиск
            </Button>
        </Box>
    );
};

export default Search;
