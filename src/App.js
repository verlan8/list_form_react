import React, { useEffect, useState, useRef} from 'react';
import axios from 'axios';
import {
    Button,
    Container,
    Paper,
    MenuItem,
    Select,
    Typography
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
    const [loading, setLoading] = useState(true);
    const isBuildingViewRef = useRef(isBuildingView);
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
            ? 'https://localhost:7168/api/ListForm/officeBuildings'
            : 'https://localhost:7168/api/ListForm/rooms';

        setLoading(true);
        try {
            const response = await axios.get(url);
            console.log("get response", response.data);
            setData(response.data);
        } catch (error) {
            console.error('Ошибка при получении данных', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(isBuildingView ? 'officeBuildings' : 'rooms');
    }, []);

    const handleViewChange = async (viewType) => {
        console.log("viewtype", viewType);
        setIsBuildingView(viewType === 'officeBuildings');
        isBuildingViewRef.current = viewType === 'officeBuildings';
        console.log("handleViewChange", isBuildingViewRef);
        setData([]);

        if (searchTerm || minArea || maxArea || minRent || maxRent) {
            await handleSearch();
        } else {
            await fetchData(viewType);
        }
    };

    const handleSearch = async () => {
        console.log("handleSearch", isBuildingViewRef);
        const type = isBuildingViewRef.current ? 'officeBuildings' : 'rooms';
        
        if (!searchTerm && !minArea && !maxArea && !minRent && !maxRent) {
            console.log("no filters!!!");
            await fetchData(type);
            return;
        }
        
        try {
            if (data && !loading) {
                console.log('search before', maxArea, typeof(maxArea));
                console.log('Parameters being sent:', {
                    NameRus: searchTerm || null,
                    StreetRus: searchTerm || null,
                    MinAvailableArea: minArea !== "" ? parseFloat(minArea) : null,
                    MaxAvailableArea: maxArea !== "" ? parseFloat(maxArea) : null,
                    MinRentPrice: minRent !== "" ? parseFloat(minRent) : null,
                    MaxRentPrice: maxRent !== "" ? parseFloat(maxRent) : null,
                });
                const response = await axios.get(`https://localhost:7168/api/ListForm/search${type}`, {
                    params: {
                        NameRus: searchTerm || null,
                        StreetRus: searchTerm || null,
                        MinArea: minArea !== "" ? parseFloat(minArea) : null,
                        MaxArea: maxArea !== "" ? parseFloat(maxArea) : null,
                        MinRentPrice: minRent !== "" ? parseFloat(minRent) : null,
                        MaxRentPrice: maxRent !== "" ? parseFloat(maxRent) : null,
                    }
                });
                console.log("GET", response);
                console.log('search', response.data);
                setData(response.data);
            }
            
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
                        setMinArea={setMinArea}
                        setMaxArea={setMaxArea}
                        setMinRent={setMinRent}
                        setMaxRent={setMaxRent}
                        setSearchTerm={setSearchTerm}
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
                    {loading ? (
                        <Typography variant="body2">Загрузка данных...</Typography> // Show a loading message or spinner
                    ) : (
                        data.length > 0 ? (
                            isBuildingViewRef.current ? <CardList dataList={data} /> : <RoomCardList dataList={data} />
                        ) : (
                            <Typography variant="body2">Нет данных для отображения.</Typography>
                        )
                    )}
                </Paper>
                    
            </Container>
            <ScrollToTop />
        </div>
    );
};

export default AppComponent;
