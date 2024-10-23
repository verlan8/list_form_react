import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Box,
    Button,
    Container,
    Paper,
    MenuItem,
    Select
} from '@mui/material';
import CardList from './components/cardlist';
import Search from './components/search';
import NavBarHeader from './components/header';
import ScrollToTop from './hooks/scrollToTop';
import './App.css';

const AppComponent = () => {
    const [data, setData] = useState([]); // Changed from useFetchData
    const [searchTerm, setSearchTerm] = useState("");
    const [minArea, setMinArea] = useState("");
    const [maxArea, setMaxArea] = useState("");
    const [minRent, setMinRent] = useState("");
    const [maxRent, setMaxRent] = useState("");

    const [selectedOption, setSelectedOption] = useState('Умолчанию');
    const options = [
        'Умолчанию',
        'Дате обновления',
        'Стоимости',
        'Площади',
        'Классу',
        'Рейтингу здания',
        'Расстоянию до метро',
    ];

    const handleFilterChange = (event) => {
        setSelectedOption(event.target.value);
    };
    
    const fetchData = async () => {
        try {
            const response = await axios.get('https://localhost:7168/api/ListForm');
            setData(response.data);
        } catch (error) {
            console.error('Ошибка при получении данных', error);
        }
    };

    useEffect(() => {
        fetchData(); // Initial fetch for data
    }, []);

    const handleSearch = async () => {
        if (!searchTerm && !minArea && !maxArea) {
            await fetchData();
            return;
        }

        try {
            const response = await axios.get('https://localhost:7168/api/ListForm/search', {
                params: {
                    NameRus: searchTerm || null,
                    StreetRus: searchTerm || null,
                    MinAvailableArea: minArea || null,
                    MaxAvailableArea: maxArea || null,
                    MinRentPrice: minRent || null,
                    MaxRentPrice: maxRent || null,
                }
            });
            setData(response.data); // Set search results directly to the state
        } catch (error) {
            console.error('Ошибка при получении данных', error);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleRangeChange = (e) => {
        const { name, value } = e.target;
        if (name === "minArea" || name === "maxArea") {
            const numValue = value === "" ? "" : parseFloat(value);
            if (name === "minArea") setMinArea(numValue);
            else setMaxArea(numValue);
        } else if (name === "minRent" || name === "maxRent") {
            const numValue = value === "" ? "" : parseFloat(value);
            if (name === "minRent") setMinRent(numValue);
            else setMaxRent(numValue);
        }
    };

    return (
        <div>
            <NavBarHeader />
            <Container className='building-office-container custom-container' maxWidth={false}>
                <Paper>
                    <Search
                        searchTerm={searchTerm}
                        minArea={minArea}
                        maxArea={maxArea}
                        minRent={minRent}
                        maxRent={maxRent}
                        handleSearchChange={handleSearchChange}
                        handleFilterChange={handleRangeChange}
                        handleSearch={handleSearch}
                    />
                </Paper>
                
                <Paper className='objects-params'>
                    {/* <Box className='objects-params'> */}
                        <section className='objects-sorting-list'>
                            <b className='objects-sorting-title'>
                                Сортировать по
                            </b>
                            <Select
                                className='objects-sorting-select'
                                value={selectedOption}
                                onChange={handleFilterChange}
                            >
                                {options.map((option, index) => (
                                    <MenuItem key={index} value={option}>
                                    {option}
                                    </MenuItem>
                                ))}
                            </Select>
                        </section>
                        <Container className='objects-switch'>
                            <Button
                                className='objects-switch-button'
                                onClick={null} 
                            >
                                Здания
                            </Button>
                            <Button
                                className='objects-switch-button'
                                onClick={null} 
                            >
                                Помещения
                            </Button>
                        </Container>
                    {/* </Box> */}
                </Paper>
                
                <Paper className='paper-classlist custom-paper' elevation={3} sx={{ padding: 2 }}>
                    <CardList dataList={data} />
                </Paper>
                    
            </Container>
            <ScrollToTop />
        </div>
    );
};

export default AppComponent;
