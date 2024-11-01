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
import { MAX_LENGTH_FILTERS, ERROR_MESSAGES } from '../constants/constants.js';
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
    handleSearch,
    setMinArea,
    setMaxArea,
    setMinRent,
    setMaxRent,
    setSearchTerm
}) => {

    const [filters, setFilters] = useState({ 
        searchTerm, 
        minArea, 
        maxArea, 
        minRent, 
        maxRent 
    });
    const [openModal, setOpenModal] = useState(false);
    const [error, setError] = useState({
        minArea: false,
        maxArea: false,
        minRent: false,
        maxRent: false,
    });
    const [tempValue, setTempValue] = useState({});
    const [isError, setIsError] = useState({});


    useEffect(() => {
        const savedFilters = JSON.parse(localStorage.getItem('savedFilters'));
        if (savedFilters) {
            setFilters(savedFilters);
        }
    }, []);

    const handleSaveFilters = () => {
        console.log("save filters", filters);
        localStorage.setItem('savedFilters', JSON.stringify(filters));
    };

    const handleLoadFilters = () => {
        
    }

    const handleResetFilters = () => {
        setTempValue({});
        setMinArea('');
        setMaxArea('');
        setMinRent('');
        setMaxRent('');
        setSearchTerm('');
        localStorage.removeItem('savedFilters');
        setError({ minArea: false, maxArea: false, minRent: false, maxRent: false });
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
    
    // обработка вставки значений
    const handleDecimalPaste = (e) => {
        e.preventDefault();
        console.log("e", e);
        const text = e.clipboardData.getData('text');
        console.log("text", text);
        if (/^[1-9]\d*$/.test(text) && text.length <= MAX_LENGTH_FILTERS) {
            e.target.value = text;
            if (e.target.name === 'minArea') {
                setMinArea(text);
            } else if (e.target.name === 'maxArea') {
                setMaxArea(text);
            } else if (e.target.name === 'minRent') {
                setMinRent(text);
            } else if (e.target.name === 'maxRent') {
                setMaxRent(text);
            }
            handleFiltersChange(e);
        }
    };

    const handleFiltersChange = (e) => {
        const { name, value } = e.target;
        console.log("value", value);
        const regex = /^[1-9]\d*$/; // Положительные целые или десятичные числа
        if (value === "" || regex.test(value)) {

            setTempValue((prev) => ({
                ...prev,
                [name]: value,
            }));

            setIsError((prev) => ({
                ...prev,
                [name]: false,
            }));

        } else {
            // Устанавливаем ошибку при некорректном вводе
            setIsError((prev) => ({
                ...prev,
                [name]: true,
            }));
        }
    };

    // действия при потере фокуса поля
    const handleDecimalBlur = (e) => {
        const { name, value } = e.target;

        const regex = /^[1-9]\d*$/;
        if (regex.test(value)) {
            const numValue = parseFloat(value);
            setFilters((prevFilters) => ({
                ...prevFilters,
                [name]: numValue,
            }));
        } else {
            // Если значение некорректно, сбрасываем поле к пустому значению
            setFilters((prevFilters) => ({
                ...prevFilters,
                [name]: "",
            }));
            setTempValue((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    }

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
                            value={tempValue.minArea || ''} 
                            error={isError.minArea}
                            helperText={isError.minArea ? ERROR_MESSAGES.INVALID_VALUE : ""}
                            onPaste={handleDecimalPaste}
                            onBlur={handleDecimalBlur}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value.length <= MAX_LENGTH_FILTERS) { 
                                    handleFiltersChange(e); 
                                    setMinArea(value); 
                                }
                            }}
                            onKeyPress={(e) => {
                                if (!/^[0-9]\d*$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Enter') {
                                    e.preventDefault();
                                }
                            }}
                        />
                    </Grid>
                    <Grid>
                        <TextField 
                            fullWidth 
                            name="maxArea" 
                            label="Макс. площадь" 
                            variant="outlined" 
                            onPaste={handleDecimalPaste}
                            value={tempValue.maxArea || ''} 
                            error={isError.maxArea}
                            helperText={isError.maxArea ? ERROR_MESSAGES.INVALID_VALUE : ""}
                            onBlur={handleDecimalBlur}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value.length <= MAX_LENGTH_FILTERS) { 
                                    handleFiltersChange(e); 
                                    setMaxRent(value); 
                                }
                            }}
                            onKeyPress={(e) => {
                                if (!/^[0-9]\d*$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Enter') {
                                    e.preventDefault();
                                }
                            }}
                        />
                    </Grid>
                    <Grid>
                        <TextField 
                            fullWidth 
                            name="minRent" 
                            label="Бюджет от, Р" 
                            variant="outlined" 
                            value={tempValue.minRent || ''} 
                            error={isError.minRent}
                            helperText={isError.minRent ? ERROR_MESSAGES.INVALID_VALUE : ""}
                            onBlur={handleDecimalBlur}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value.length <= MAX_LENGTH_FILTERS) { 
                                    handleFiltersChange(e); 
                                    setMinRent(value); 
                                }
                            }}
                            onKeyPress={(e) => {
                                if (!/^[0-9]\d*$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Enter') {
                                    e.preventDefault();
                                }
                            }}
                        />
                    </Grid>
                    <Grid>
                        <TextField 
                            fullWidth 
                            name="maxRent" 
                            label="Бюджет до, Р" 
                            variant="outlined" 
                            value={tempValue.maxRent || ''} 
                            error={isError.maxRent}
                            helperText={isError.maxRent ? ERROR_MESSAGES.INVALID_VALUE : ""}
                            onBlur={handleDecimalBlur}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value.length <= MAX_LENGTH_FILTERS) { 
                                    handleFiltersChange(e); 
                                    setMaxRent(value); 
                                }
                            }}
                            onKeyPress={(e) => {
                                if (!/^[0-9]\d*$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Enter') {
                                    e.preventDefault();
                                }
                            }}
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
                    onClick={handleLoadFilters} 
                    className='load-filter'
                >
                    Загрузить фильтры
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
                    className="search-button"
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
