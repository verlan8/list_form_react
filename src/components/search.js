// Поисковая панель

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    Box,
    Button,
    TextField,
    Container,
    Modal,
    Typography,
    MenuItem,
    Checkbox,
    Select
} from '@mui/material';
import { MAX_LENGTH_FILTERS, ERROR_MESSAGES } from '../constants/constants.js';
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';
import '../styles/buildingOffices/search.css'
import { debounce } from 'lodash';


const Search = ({ 
    // searchTerm, 
    // minArea, 
    // maxArea, 
    // minRent, 
    // maxRent, 
    selectedLeaseType,
    handleSearchChange, 
    // handleFilterChange, 
    handleSearch,
    // setMinArea,
    // setMaxArea,
    // setMinRent,
    // setMaxRent,
    // setSearchTerm,
    setSelectedLeaseType,
    inputFields,
    inputIds
}) => {

    // const [filters, setFilters] = useState({ 
    //     searchTerm, 
    //     minArea, 
    //     maxArea, 
    //     minRent, 
    //     maxRent ,
    //     selectedLeaseType
    // });
    const [openModal, setOpenModal] = useState(false);
    // const [inputValues, setInputValues] = useState({});
    // const [error, setError] = useState({
    //     minArea: false,
    //     maxArea: false,
    //     minRent: false,
    //     maxRent: false,
    //     selectedLeaseType: false
    // });
    const [tempValue, setTempValue] = useState({});
    const [isError, setIsError] = useState({});
    // const [selectedLeaseType, setSelectedLeaseType] = useState(['Аренда']);
    const navigate = useNavigate();

    const options = [
        'Аренда',
        'Субаренда',
        'Продажа'
    ];

    const inputRefs = useRef(inputIds.map(() => React.createRef())); 

    useEffect(() => {
        const savedFilters = JSON.parse(localStorage.getItem('savedFilters'));
        if (savedFilters) {
            // setFilters(savedFilters);
            // const values = {};
            inputFields.current.forEach((ref, index) => {
                if (ref && ref.current) {
                    // values[inputIds[index].value] = savedFilters[inputIds[index].value] || '';
                    ref.current.value = savedFilters[inputIds[index].value] || '';
                }
            });
            // setInputValues(values);
            setSelectedLeaseType(savedFilters.selectedLeaseType || ['Аренда']);
        }
    }, [inputFields, inputIds, setSelectedLeaseType]);

    const handleSaveFilters = () => {
        // console.log('save filters', filters);
        // localStorage.setItem('savedFilters', JSON.stringify(filters));
        const filters = {
            selectedLeaseType
        };
        inputIds.forEach((input, index) => {
            const ref = inputRefs.current[index].current;
            if (ref) {
                filters[input.value] = ref.value;
            }
        });
        localStorage.setItem('savedFilters', JSON.stringify(filters));
    };

    const handleLoadFilters = () => {
        
    }

    const handleSelectFilterChange = (event) => {
        // setSelectedLeaseType(event.target.value.length === 0 ? ['Аренда'] : event.target.value);
        const value = event.target.value;
        
        if (value.includes('Продажа')) {
            setSelectedLeaseType(['Продажа']);
        } 
        else {
            const filteredValue = value.filter(option => option !== 'Продажа');
            if (filteredValue.length === 0) {
                // If nothing is selected, default to 'Аренда'
                setSelectedLeaseType(['Аренда']);
            }
            else if (filteredValue.includes('Аренда')) {
                setSelectedLeaseType(['Аренда']);
            } 
            else if (filteredValue.includes(['Субаренда'])) {
                setSelectedLeaseType(['Субаренда']);
            }
            else {
                setSelectedLeaseType(filteredValue);
            }
        }
    }

    const handleResetFilters = () => {
        // setTempValue({});
        // setMinArea('');
        // setMaxArea('');
        // setMinRent('');
        // setMaxRent('');
        // setSearchTerm('');
        // const resetValues = {};
        inputFields.current.forEach((ref) => {
            if (ref && ref.current) {
                ref.current.value = '';
            }
        });
        // setInputValues(resetValues);
        setSelectedLeaseType(['Аренда']);
        setIsError({});
        localStorage.removeItem('savedFilters');
        // setError({ minArea: false, maxArea: false, minRent: false, maxRent: false, selectedLeaseType: false });
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleModalChange = (e) => {
        // модальное окно
    };

    const handleOpenMap = () => {
        navigate('/map');
    }

    const handleTextPaste = (e) => {
        e.preventDefault();
        console.log('e', e);
        const text = e.clipboardData.getData('text');
        console.log('text', text);
        if (/^[a-zA-Zа-яА-Я0-9]*$/.test(text) && text.length <= MAX_LENGTH_FILTERS) {
            e.target.value = text;
            if (e.target.name === 'searchTerm') {
                // setSearchTerm(text);
            }
            handleFiltersChange(e);
        }
    }
    
    // обработка вставки значений
    const handleDecimalPaste = (e) => {
        e.preventDefault();
        console.log('e', e);
        const text = e.clipboardData.getData('text');
        console.log('number', text);
        if (/^[1-9]\d*$/.test(text) && text.length <= MAX_LENGTH_FILTERS) {
            e.target.value = text;
            // if (e.target.name === 'minArea') {
            //     setMinArea(text);
            // } else if (e.target.name === 'maxArea') {
            //     setMaxArea(text);
            // } else if (e.target.name === 'minRent') {
            //     setMinRent(text);
            // } else if (e.target.name === 'maxRent') {
            //     setMaxRent(text);
            // }
            handleFiltersChange(e);
        }
    };

    // const debouncedHandleFiltersChange = useCallback(
    //     debounce((name, value) => {
    //         setTempValue((prev) => ({
    //             ...prev,
    //             [name]: value,
    //         }));
    //         setIsError((prev) => ({
    //             ...prev,
    //             [name]: /^[1-9]\d*$/.test(value) ? false : true,
    //         }));
    //     }, 300),
    //     []
    // );

    const handleFiltersChange = (e) => {
        const { name, value } = e.target;
        // console.log('value', value);
        // console.log('value cond', value < MAX_LENGTH_FILTERS);
        // const regex = /^[1-9]\d*$/; // Положительные целые или десятичные числа
        if (value.length < MAX_LENGTH_FILTERS) {
            // debouncedHandleFiltersChange(name, value);
            // if (name === 'minArea') setMinArea(value);
            // if (name === 'maxArea') setMaxArea(value);
            // if (name === 'minRent') setMinRent(value);
            // if (name === 'maxRent') setMaxRent(value);
            // setTempValue((prev) => ({
            //     ...prev,
            //     [name]: value,
            // }));
            // setInputValues((prev) => ({
            //     ...prev,
            //     [name]: value,
            // }));
            // setIsError((prev) => ({
            //     ...prev,
            //     [name]: false,
            // }));

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
            // setFilters((prevFilters) => ({
            //     ...prevFilters,
            //     [name]: numValue,
            // }));
        } else {
            // Если значение некорректно, сбрасываем поле к пустому значению
            // setFilters((prevFilters) => ({
            //     ...prevFilters,
            //     [name]: '',
            // }));
            setTempValue((prev) => ({
                ...prev,
                [name]: '',
            }));
        }
    }

    return (
        <Container className='search-panel' maxWidth={false}>
            <Box mb={2} className='search' >
                <Grid container spacing={2}>
                    {inputFields.current.map((ref, index) => (
                        <TextField
                            sx={{ flex: '1 1 18%', minWidth: inputIds[index].title.length, mt: 2 }}
                            className={`object-filter-item ${inputIds[index].value}-textfield`}
                            key={index}
                            fullWidth
                            // type="text"
                            label={inputIds[index].title}
                            inputRef={ref}
                            // value={inputIds[index] || ''}
                            // helperText={isError.inputIds[index].value ? ERROR_MESSAGES.INVALID_VALUE : ''}
                            name={inputIds[index].value}
                            id={inputIds[index].value}
                            onPaste={inputIds[index].type === 'number' ? handleDecimalPaste : handleTextPaste}
                            onBlur={inputIds[index].type === 'number' ? handleDecimalBlur : null}
                            onChange={inputIds[index].type === 'number' ? handleFiltersChange : handleSearchChange}
                            onKeyPress={(e) => {
                                if (inputIds[index].type === 'number') {
                                    if (!/^[0-9]\d*$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Enter') {
                                        e.preventDefault();
                                    }
                                } 
                                else if (inputIds[index].type === 'text') {
                                    console.log("TEXT");
                                    if (!/^[a-zA-Zа-яА-Я0-9\s]+$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Enter') {
                                        e.preventDefault();
                                    }
                                }
                            }}
                            inputProps={{
                                maxLength: inputIds[index].type === 'number' ? 10 : 100 // Adjust max length: 10 for numbers, 50 for text
                            }}
                        />
                    ))}
                    {/* <TextField 
                        sx={{ flex: '1 1 18%', minWidth: '150px', mt: 2 }}  // Верхний отступ
                        fullWidth 
                        name='minArea' 
                        label='Мин. площадь, м²' 
                        variant='outlined'
                        value={tempValue.minArea || ''} 
                        error={isError.minArea}
                        helperText={isError.minArea ? ERROR_MESSAGES.INVALID_VALUE : ''}
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
                    <TextField 
                        sx={{ flex: '1 1 18%', minWidth: '150px', mt: 2 }}  // Верхний отступ
                        fullWidth 
                        name='maxArea' 
                        label='Макс. площадь, м²' 
                        variant='outlined' 
                        onPaste={handleDecimalPaste}
                        value={tempValue.maxArea || ''} 
                        error={isError.maxArea}
                        helperText={isError.maxArea ? ERROR_MESSAGES.INVALID_VALUE : ''}
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
                    <TextField 
                        sx={{ flex: '1 1 18%', minWidth: '150px', mt: 2 }}  // Верхний отступ
                        fullWidth 
                        name='minRent' 
                        label='Бюджет от, Р' 
                        variant='outlined' 
                        value={tempValue.minRent || ''} 
                        error={isError.minRent}
                        helperText={isError.minRent ? ERROR_MESSAGES.INVALID_VALUE : ''}
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
                
                    <TextField 
                        sx={{ flex: '1 1 18%', minWidth: '150px', mt: 2 }}  // Верхний отступ
                        fullWidth 
                        name='maxRent' 
                        label='Бюджет до, Р' 
                        variant='outlined' 
                        value={tempValue.maxRent || ''} 
                        error={isError.maxRent}
                        helperText={isError.maxRent ? ERROR_MESSAGES.INVALID_VALUE : ''}
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
                    <TextField 
                        sx={{ flex: '2 1 36%', minWidth: '300px', mt: 1 }}  // Верхний отступ
                        fullWidth 
                        label='Поиск по названию здания или улице...' 
                        variant='outlined' 
                        value={searchTerm} 
                        onChange={handleSearchChange} 
                        onKeyPress={(e) => {
                            if (!/^[a-zA-Zа-яА-Я0-9]+$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Enter' && e.key !== 'Space') {
                                e.preventDefault();
                            }
                        }}
                    /> */}

                    {/* Аренда\Продажа\Субаренда */}
                    <Select
                        sx={{ mt: 2 }}
                        className='lease-type-sorting-select'
                        multiple
                        value={selectedLeaseType}
                        onChange={handleSelectFilterChange}
                        renderValue={(selected) => selected.join(', ')}
                    >
                        {options.map((option) => (
                            <MenuItem key={option} value={option}>
                                <Checkbox checked={selectedLeaseType.indexOf(option) > -1} />
                                <p>{option}</p>
                            </MenuItem>
                        ))}
                    </Select>
                    {/* <input>
                        
                    </input> */}
                    {/* <Select
                        className='objects-sorting-select'
                        value={selectedOption}
                        onChange={handleSelectFilterChange}
                    >
                        {options.map((option) => (
                            <MenuItem key={option} value={option}  disabled={option === selectedOption}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select> */}
                </Grid>
            
            </Box>
            <Box className='search-bottom-items'>
                <button 
                    variant='contained' 
                    color='primary' 
                    onClick={handleResetFilters} 
                    className='clear-filter'
                >
                    Сбросить
                </button>
                <button 
                    variant='contained' 
                    color='primary' 
                    onClick={handleSaveFilters} 
                    className='save-filter'
                >
                    Сохранить фильтры
                </button>
                {/* <button 
                    variant='contained' 
                    color='primary' 
                    onClick={handleLoadFilters} 
                    className='load-filter'
                >
                    Загрузить фильтры
                </button> */}
                <button 
                    variant='contained' 
                    color='primary' 
                    onClick={handleOpenModal} 
                    className='all-filters'
                >
                    Все фильтры
                </button>
                <button 
                    variant='contained' 
                    color='primary' 
                    onClick={handleOpenMap} 
                    className='show-at-map'
                >
                    Показать на карте
                </button>
                <button 
                    variant='contained' 
                    color='primary' 
                    onClick={handleSearch} 
                    className='search-button'
                >
                    Показать
                </button>
            </Box>


            <Modal open={openModal} onClose={handleCloseModal}>
                <Box sx={{
                    backgroundColor: 'white', 
                    width: '90%', 
                    maxWidth: 600,
                    margin: 'auto',
                    borderRadius: '10px',
                    boxShadow: 3,
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'  // Центрирование содержимого
                }}>
                    <Typography variant='h6' component='h2'>Расширенные настройки поиска</Typography>
                    <Grid container spacing={2} mt={2} justifyContent='center'>
                        <Grid item xs={6}>
                            <TextField label='Класс' fullWidth onChange={handleModalChange} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label='Год постройки' fullWidth onChange={handleModalChange} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label='Этажность' fullWidth onChange={handleModalChange} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label='Общая площадь' fullWidth onChange={handleModalChange} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label='Ближайшая станция метро' fullWidth onChange={handleModalChange} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label='Девелопер' fullWidth onChange={handleModalChange} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label='Управляющая компания' fullWidth onChange={handleModalChange} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label='Владелец здания' fullWidth onChange={handleModalChange} />
                        </Grid>
                    </Grid>
                    <button onClick={handleCloseModal} color='primary' className='closeButton' sx={{ mt: 3 }}>Закрыть</button>
                </Box>
            </Modal>
        </Container>
    );
};

export default Search;
