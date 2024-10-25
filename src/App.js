import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Button,
    Container,
    Paper,
    MenuItem,
    Select
} from '@mui/material';
import CardList from './components/cardlist';
import RoomCardList from './components/roomCardList'
import Search from './components/search';
import NavBarHeader from './components/header';
import ScrollToTop from './hooks/scrollToTop';
import './App.css';

const AppComponent = () => {
    const [data, setData] = useState([]); 
    const [searchTerm, setSearchTerm] = useState("");
    const [minArea, setMinArea] = useState("");
    const [maxArea, setMaxArea] = useState("");
    const [minRent, setMinRent] = useState("");
    const [maxRent, setMaxRent] = useState("");
    const [isBuildingView, setIsBuildingView] = useState(true); 


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
    
    const fetchData = async (type) => {
        const url = type === 'officeBuildings' 
            ? 'https://localhost:7168/api/ListForm/officeBuldings'
            : 'https://localhost:7168/api/ListForm/rooms';
        try {
            const response = await axios.get(url);
            console.log("get response", response.data);
            setData(response.data);
        } catch (error) {
            console.error('Ошибка при получении данных', error);
        }
    };

    useEffect(() => {
        fetchData('officeBuildings');
    }, []);

    const handleViewChange = (viewType) => {
        console.log("viewtype", viewType);
        setIsBuildingView(viewType === 'officeBuldings');
        fetchData(viewType); 
    };

    const handleSearch = async () => {
        if (!searchTerm && !minArea && !maxArea) {
            await fetchData();
            return;
        }

        try {
            console.log('search before', maxArea, typeof(maxArea));
            console.log('Parameters being sent:', {
                NameRus: searchTerm || null,
                StreetRus: searchTerm || null,
                MinAvailableArea: minArea !== "" ? parseFloat(minArea) : null,
                MaxAvailableArea: maxArea !== "" ? parseFloat(maxArea) : null,
                MinRentPrice: minRent !== "" ? parseFloat(minRent) : null,
                MaxRentPrice: maxRent !== "" ? parseFloat(maxRent) : null,
            });
            const response = await axios.get('https://localhost:7168/api/ListForm/searchBuildingOffice', {
                params: {
                    NameRus: searchTerm || null,
                    StreetRus: searchTerm || null,
                    MinArea: minArea !== "" ? parseFloat(minArea) : null,
                    MaxArea: maxArea !== "" ? parseFloat(maxArea) : null,
                    MinRentPrice: minRent !== "" ? parseFloat(minRent) : null,
                    MaxRentPrice: maxRent !== "" ? parseFloat(maxRent) : null,
                }
            });
            console.log('search', response.data);
            setData(response.data);
        } catch (error) {
            console.error('Ошибка при получении данных', error);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleRangeChange = (e) => {
        const { name, value } = e.target;
        const numValue = value === "" ? "" : parseFloat(value);
        switch (name) {
            case "minArea":
                setMinArea(numValue);
                break;
            case "maxArea":
                setMaxArea(numValue);
                break;
            case "minRent":
                setMinRent(numValue);
                break;
            case "maxRent":
                setMaxRent(numValue);
                break;
            default:
                break;
        };
    }

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
                            onClick={() => handleViewChange('officeBuildings')}
                        >
                            Здания
                        </Button>
                        <Button
                            className='objects-switch-button'
                            onClick={() => handleViewChange('rooms')} 
                        >
                            Помещения
                        </Button>
                    </Container>
                </Paper>
                
                <Paper className='paper-classlist custom-paper' elevation={3} sx={{ padding: 2 }}>
                    {isBuildingView 
                        ? <CardList dataList={data} />
                        : <RoomCardList dataList={data} />} {/* Render the appropriate card list */}
                </Paper>
                    
            </Container>
            <ScrollToTop />
        </div>
    );
};

export default AppComponent;
