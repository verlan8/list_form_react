import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import {
    Button,
    Container,
    Paper,
    MenuItem,
    Select,
    Typography
} from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import CardList from './components/cardlist';
import RoomCardList from './components/roomCardList'
import Search from './components/search';
import NavBarHeader from './components/header';
import ScrollToTop from './hooks/scrollToTop';
import './App.css';
import { BASE_URL } from './constants/constants';
import { FaSortAmountUpAlt } from "react-icons/fa";//по возрастанию
import { FaSortAmountDown } from "react-icons/fa";// по убыванию
import { debounce } from 'lodash';


const DataSource = {
    INITIAL_FETCH: 'initial_fetch',
    SEARCH: 'search',
};

const AppComponent = () => {
    const [data, setData] = useState([]); 
    // const [searchTerm, setSearchTerm] = useState('');
    // const [minArea, setMinArea] = useState('');
    // const [maxArea, setMaxArea] = useState('');
    // const [minRent, setMinRent] = useState('');
    // const [maxRent, setMaxRent] = useState('');
    const [selectedLeaseType, setSelectedLeaseType] = useState(['Аренда']);
    const [isBuildingView, setIsBuildingView] = useState(true); 
    const [loading, setLoading] = useState(true);
    const isBuildingViewRef = useRef(isBuildingView);
    const [selectedOption, setSelectedOption] = useState('research_check_date');
    const [sortDirection, setSortDirection] = useState('Desc');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(50);
    const [hasMore, setHasMore] = useState(true);
    const [lastDataSource, setLastDataSource] = useState(DataSource.INITIAL_FETCH);
    const prevSortDirection = useRef(sortDirection);

    const inputFields = useRef(Array.from({length: 5}, () => React.createRef(null)));
    // const inputIds = ['minRent', 'maxRent', 'minArea', 'maxArea', 'searchTerm', 'selectedLeaseType'];
    const inputIds = [
        {title: 'Бюджет от, Р', value: 'minRent', type: 'number'},
        {title: 'Бюджет до, Р', value: 'maxRent', type: 'number'},
        {title: 'Мин площадь, м²', value: 'minArea', type: 'number'},
        {title: 'Макс площадь, м²', value: 'maxArea', type: 'number'},
        {title: 'Поиск по названию здания или улице...', value: 'searchTerm', type: 'text'},  
    ];
    
    const options = [
        // { title: 'Умолчанию', value: 'default' },
        { title: 'Дате обновления', value: 'research_check_date' },
        { title: 'Названию объекта', value: 'name_rus' },
        { title: 'Общей площади', value: 'unit_size' },
        { title: 'Классу', value: 'building_class' },
        // { title: 'Расстоянию до метро пешком', value: 'pedestrian' },
        // { title: 'Расстоянию до метро на транспорте', value: 'masstransit' }
    ];

    const pageSizeOptions = [
        50, 100, 200
    ];

    // const options = [
    //     'Умолчанию',
    //     'Дате обновления',
    //     'Названию объекта',
    //     'Общей площади',
    //     'Классу',
    //     'Расстоянию до метро пешком',
    //     'Расстоянию до метро на транспорте',
    // ];

    const handleFilterChange = (event) => {
        setSelectedOption(event.target.value);
        console.log("event", event.target.value);
        console.log("selectedOption", selectedOption);
        console.log("current direction", sortDirection);
        // handleSearch();
        // request to back
    };

    


    const fetchData = async (type, page) => {
        const url = type === 'buildingOffice' 
            ? `${BASE_URL}/ListForm/buildingOffice?page=${page}`
            : `${BASE_URL}/ListForm/rooms?page=${page}`;

        setLoading(true);
        try {
            const response = await axios.get(url);
            if (response.data.length === 0) {
                setHasMore(false);
            } else {
                setData((prevData) => [...prevData, ...response.data]);
            }
            console.log('get response', response.data);
            // setData(response.data);
        } catch (error) {
            console.error('Ошибка при получении данных', error);
        } finally {
            setLoading(false);
            setLastDataSource(DataSource.INITIAL_FETCH);
        }
    };

    useEffect(() => {
        prevSortDirection.current = sortDirection;
    }, [sortDirection]);

    useEffect(() => {
        fetchData(isBuildingView ? 'buildingOffice' : 'rooms', page);
    }, []);

    const loadMoreData = async () => {
        if (lastDataSource === DataSource.SEARCH) {
            await handleSearch();
        } else {
            await fetchData(isBuildingView ? 'buildingOffice' : 'rooms', page + 1);
        }
        setPage((prevPage) => prevPage + 1);
    };

    useEffect(() => {
        setData([]);
        setPage(1);
        setHasMore(true);
        handleSearch();
    }, [selectedOption, sortDirection]); // Update search based on filter changes

    // useEffect(() => {
    //     handleSearch();
    // }, [selectedOption]);

    // useEffect(() => {
    //     handleSearch();
    // }, [sortDirection]);

    const handleViewChange = async (viewType) => {
        setIsBuildingView(viewType === 'buildingOffice');
        isBuildingViewRef.current = viewType === 'buildingOffice';
        setData([]);
        setPage(1);
        setHasMore(true);

        if (inputFields.current.some(ref => ref.current.value !== '')) {
            await handleSearch();
        } else {
            await fetchData(viewType, 1);
        }
    };

    const handleSearch = async () => {
        const type = isBuildingViewRef.current ? 'buildingOffice' : 'rooms';
        console.log("VIEW", type);
        console.log("selectedOption", selectedOption);
        console.log("sortDirectionCurrent", sortDirection);
        console.log("prev loading", loading);
        setLoading(true);
        console.log("current loading", loading);
        console.log("selectedLeaseType", selectedLeaseType);

        const inputValues = inputFields.current.reduce((acc, ref, index) => {
            acc[inputIds[index].value] = ref.current.value;
            return acc;
        }, {});
        console.log('Input Values:', inputValues);      
        
        // if (inputFields.current.all(ref => ref.current.value == '') && 
        //     selectedLeaseType.includes('Аренда') && 
        //     selectedLeaseType.length === 1 && 
        //     selectedOption === 'research_check_date' &&
        //     prevSortDirection.current === sortDirection
        // ) {
        //     console.log("fetch in search");
        //     await fetchData(type, page);
        //     return;
        // }
        
        try {
            if (data && !loading) {
                // console.log("params", selectedOption);
                const params = new URLSearchParams();
                params.append('NameRus', inputValues.searchTerm || '');
                params.append('StreetRus', inputValues.searchTerm || '');
                params.append('MinArea', inputValues.minArea !== '' ? parseFloat(inputValues.minArea) : '');
                params.append('MaxArea', inputValues.maxArea !== '' ? parseFloat(inputValues.maxArea) : '');
                params.append('MinRentPrice', inputValues.minRent !== '' ? parseFloat(inputValues.minRent) : '');
                params.append('MaxRentPrice', inputValues.maxRent !== '' ? parseFloat(inputValues.maxRent) : '');
                params.append('SortColumn', selectedOption || null);
                params.append('SortDirection', sortDirection || null);
                selectedLeaseType.forEach(lease => params.append('LeaseType', lease.toLowerCase()));
                console.log('Отправляемые параметры:', params);
                const response = await axios.get(`${BASE_URL}/ListForm/search-${type}?page=${page}`, {
                    params
                });
                console.log('GET', response);
                console.log('search', response.data);
                if (response.data.length === 0) {
                    setHasMore(false);
                } else {
                    setData(response.data);
                    // setData((prevData) => [...prevData, ...response.data]);
                }
                // setData(response.data);
            }
            
        } catch (error) {
            console.error('Ошибка при получении данных', error);
        } finally {
            setLoading(false);
            setLastDataSource(DataSource.SEARCH);
        }
    };

    // const debouncedSetInputValue = useCallback(
    //     debounce((value) => setSearchTerm(value), 300),
    //     []
    //   );

    // const handleSearchChange = (e) => {
    //     debouncedSetInputValue(e.target.value);
    //     // setSearchTerm(e.target.value);
    // };

    // const handleRangeChange = (e) => {
    //     const { name, value } = e.target;
    //     const numValue = value === '' ? '' : parseFloat(value);
    //     switch (name) {
    //         case 'minArea':
    //             setMinArea(numValue);
    //             break;
    //         case 'maxArea':
    //             setMaxArea(numValue);
    //             break;
    //         case 'minRent':
    //             setMinRent(numValue);
    //             break;
    //         case 'maxRent':
    //             setMaxRent(numValue);
    //             break;
    //         default:
    //             break;
    //     };
    // }

    const handleSortDirectionChange = () => {
        console.log("prev direction", sortDirection);
        setSortDirection(prevDirection => prevDirection === 'Asc' ? 'Desc' : 'Asc');
        console.log("current direction", sortDirection);
        // handleSearch();
    };

    function getWordByCount(number, words_arr) {
        number = Math.abs(number);
        console.log("data.length", number);
        if (Number.isInteger(number)) {
          let options = [2, 0, 1, 1, 1, 2];
          return words_arr[(number % 100 > 4 && number % 100 < 20) ? 2 : options[(number % 10 < 5) ? number % 10 : 5]];
        }
        return words_arr[1];
    }

    return (
        <div>
            <NavBarHeader />
            <Container className='building-office-container custom-container' maxWidth={false}>
                <Paper>
                    <Search
                        // searchTerm={searchTerm}
                        // minArea={minArea}
                        // maxArea={maxArea}
                        // minRent={minRent}
                        // maxRent={maxRent}
                        selectedLeaseType={selectedLeaseType}
                        // handleSearchChange={handleSearchChange}
                        // handleFilterChange={handleRangeChange}
                        handleSearch={handleSearch}
                        // setMinArea={setMinArea}
                        // setMaxArea={setMaxArea}
                        // setMinRent={setMinRent}
                        // setMaxRent={setMaxRent}
                        // setSearchTerm={setSearchTerm}
                        setSelectedLeaseType={setSelectedLeaseType}
                        inputIds={inputIds}
                        inputFields={inputFields}
                    />
                </Paper>
                
                {data.length > 0 ? (
                    <section>
                        <h3>Найдено {data[0].recordsCount} {getWordByCount(data[0].recordsCount, isBuildingViewRef.current ? ['здание', 'здания', 'зданий'] : ['помещение', 'помещения', 'помещений'])} </h3>
                    </section>
                ) : null} 

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
                                <MenuItem key={index} value={option.value} disabled={option.value === selectedOption}>
                                    {option.title}
                                </MenuItem>
                            ))}
                        </Select>

                        {data && data.length > 0 ? (
                            <Button 
                                onClick={handleSortDirectionChange}
                                disabled={loading}>
                                {sortDirection === 'Desc' ? <FaSortAmountDown /> : <FaSortAmountUpAlt />}
                            </Button>
                        ) : null}
                        
                    </section>
                    <div className='objects-switch'>
                        <Button
                            className='objects-switch-button'
                            onClick={() => handleViewChange('buildingOffice')}
                        >
                            Здания
                        </Button>
                        <Button
                            className='objects-switch-button'
                            onClick={() => handleViewChange('rooms')} 
                        >
                            Помещения
                        </Button>
                    </div>
                </Paper>
                

                <InfiniteScroll
                    dataLength={data.length}
                    next={loadMoreData}
                    hasMore={hasMore}
                    loader={hasMore ? <Typography variant='body2'>Загрузка...</Typography> : null}
                >
                    {data.length > 0 ? (
                        isBuildingViewRef.current ? <CardList dataList={data} leaseType={selectedLeaseType} /> : <RoomCardList dataList={data} />
                    ) : (
                        !hasMore && <Typography variant='body2'>Нет данных для отображения.</Typography>
                    )}
                </InfiniteScroll>

                {/* <Paper className='paper-classlist custom-paper' elevation={3} sx={{ padding: 2 }}>
                    {loading ? (
                        <Typography variant='body2'>Загрузка данных...</Typography> // Show a loading message or spinner
                    ) : (
                        data.length > 0 ? (
                            isBuildingViewRef.current ? <CardList dataList={data} /> : <RoomCardList dataList={data} />
                        ) : (
                            <Typography variant='body2'>Нет данных для отображения.</Typography>
                        )
                    )}
                </Paper> */}
                    
            </Container>
            <ScrollToTop />
        </div>
    );
};

export default AppComponent;
