// Поисковая панель

import React from 'react';
import {
    Box,
    Button,
    TextField,
    Container
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import '../styles/buildingOffices/search.css'

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
        <Container className='search-panel'>
            <Box mb={2} className="search">
                <Grid container spacing={2}>
                    <Grid>
                        <TextField 
                            fullWidth 
                            label="Поиск..." 
                            variant="outlined" 
                            value={searchTerm} 
                            onChange={handleSearchChange} 
                        />
                    </Grid>
                    <Grid>
                        <TextField 
                            fullWidth 
                            name="minArea" 
                            label="Мин. площадь" 
                            variant="outlined" 
                            value={minArea} 
                            onChange={handleFilterChange} 
                        />
                    </Grid>
                    <Grid>
                        <TextField 
                            fullWidth 
                            name="maxArea" 
                            label="Макс. площадь" 
                            variant="outlined" 
                            value={maxArea} 
                            onChange={handleFilterChange} 
                        />
                    </Grid>
                    <Grid>
                        <TextField 
                            fullWidth 
                            name="minRent" 
                            label="Мин. аренда" 
                            variant="outlined" 
                            value={minRent} 
                            onChange={handleFilterChange} 
                        />
                    </Grid>
                    <Grid>
                        <TextField 
                            fullWidth 
                            name="maxRent" 
                            label="Макс. аренда" 
                            variant="outlined" 
                            value={maxRent} 
                            onChange={handleFilterChange} 
                        />
                    </Grid>
                </Grid>
            
            </Box>
            <Box className='search-bottom-items'>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={null} 
                    className='save-filter'
                >
                    Сохранить фильтр
                </Button>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={null} 
                    className='all-filters'
                >
                    Все фильтры
                </Button>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={null} 
                    className='show-at-map'
                >
                    Показать на карте
                </Button>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleSearch} 
                    className='search-button'
                >
                    Поиск
                </Button>
                
            </Box>
        </Container>
    );
};

export default Search;
