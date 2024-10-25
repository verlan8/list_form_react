// Поисковая панель

import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    TextField,
    Container,
    Modal,
    Typography
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

    const [filters, setFilters] = useState({ searchTerm, minArea, maxArea, minRent, maxRent });
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        const savedFilters = JSON.parse(localStorage.getItem('savedFilters'));
        if (savedFilters) {
            setFilters(savedFilters);
        }
    }, []);

    const handleSaveFilters = () => {
        localStorage.setItem('savedFilters', JSON.stringify(filters));
    };

    const handleResetFilters = () => {
        setFilters({ searchTerm: '', minArea: '', maxArea: '', minRent: '', maxRent: '' });
        localStorage.removeItem('savedFilters');
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleModalChange = (e) => {
        // модальное окна
    };

    const handleFiltersChange = (e) => {
        const { name, value } = e.target;
        
        const numValue = value === "" ? "" : parseFloat(value);
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: numValue,
        }));
        
        handleFilterChange(e);
    };

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
                            value={filters.minArea} 
                            onChange={handleFiltersChange} 
                        />
                    </Grid>
                    <Grid>
                        <TextField 
                            fullWidth 
                            name="maxArea" 
                            label="Макс. площадь" 
                            variant="outlined" 
                            value={filters.maxArea} 
                            onChange={handleFiltersChange} 
                        />
                    </Grid>
                    <Grid>
                        <TextField 
                            fullWidth 
                            name="minRent" 
                            label="Бюджет от, Р" 
                            variant="outlined" 
                            value={filters.minRent} 
                            onChange={handleFiltersChange} 
                        />
                    </Grid>
                    <Grid>
                        <TextField 
                            fullWidth 
                            name="maxRent" 
                            label="Бюджет до, Р" 
                            variant="outlined" 
                            value={filters.maxRent} 
                            onChange={handleFiltersChange} 
                        />
                    </Grid>
                </Grid>
            
            </Box>
            <Box className='search-bottom-items'>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleResetFilters} 
                    className='clear-filter'
                >
                    Сбросить
                </Button>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleSaveFilters} 
                    className='save-filter'
                >
                    Сохранить фильтры
                </Button>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleOpenModal} 
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


            <Modal open={openModal} onClose={handleCloseModal}>
                <Box sx={{ padding: 4, backgroundColor: 'white' }}>
                    <Typography variant="h6" component="h2">Расширенные настройки поиска</Typography>
                    <Grid container spacing={2} mt={2}>
                        {/* основная ифнормация */}
                        <Grid item xs={12}>
                            <TextField label="Класс" fullWidth onChange={handleModalChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Год пойстройки" fullWidth onChange={handleModalChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Этажность" fullWidth onChange={handleModalChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Общая площадь" fullWidth onChange={handleModalChange} />
                        </Grid>
                        {/* локация */}
                        <Grid item xs={12}>
                            <TextField label="Ближайшая станция метро" fullWidth onChange={handleModalChange} />
                        </Grid>
                        {/* парковка */}
                        {/* дополнительно */}
                        <Grid item xs={12}>
                            <TextField label="Девелопер" fullWidth onChange={handleModalChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Управляющая компания" fullWidth onChange={handleModalChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Владелец здания" fullWidth onChange={handleModalChange} />
                        </Grid>
                    </Grid>
                    <Button onClick={handleCloseModal} color="primary">Закрыть</Button>
                </Box>
            </Modal>
        </Container>
    );
};

export default Search;
