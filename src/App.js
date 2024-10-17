import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Container,
    Paper,
} from '@mui/material';
import CardList from './components/cardlist';
import Search from './components/search';
import useFetchData from './hooks/useFetchData';
import NavBarHeader from './components/header';
import ScrollToTop from './hooks/scrollToTop';

//получаю list<byte[]> images -> преобразовать в картинки
const AppComponent = () => {
    const [data, fetchData] = useFetchData();
    const [searchTerm, setSearchTerm] = useState("");
    const [minArea, setMinArea] = useState("");
    const [maxArea, setMaxArea] = useState("");
    const [minRent, setMinRent] = useState("");
    const [maxRent, setMaxRent] = useState("");

    const updateDataList = (data) => {
        const dataList = data.map(item => ({
            ...item,
            images: item.images 
        }));
        fetchData(dataList);
    };

    const handleSearch = async () => {
        try {
            const response = await axios.post('https://localhost:7168/api/ListForm/search', {
                searchTerm,
                minArea: minArea || null,
                maxArea: maxArea || null,
                minRent: minRent || null,
                maxRent: maxRent || null
            });
            updateDataList(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Ошибка при получении данных', error);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterChange = (e) => {
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
        <>
            <NavBarHeader></NavBarHeader>
            <Container className='building-office-container custom-container' maxWidth={false}>
                <Search
                    searchTerm={searchTerm}
                    minArea={minArea}
                    maxArea={maxArea}
                    minRent={minRent}
                    maxRent={maxRent}
                    handleSearchChange={handleSearchChange}
                    handleFilterChange={handleFilterChange}
                    handleSearch={handleSearch}
                />
                <Paper className='paper-classlist custom-paper' elevation={3} sx={{ padding: 2 }}>
                    <CardList dataList={data} />
                </Paper>
            </Container>
            <ScrollToTop/>
        </>
    );
};

export default AppComponent;
