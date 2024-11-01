// Карточка здания

import React, { useState } from 'react';
import ByteArrayToImage from '../utils/converters/byteToImg';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { 
    Card as MuiCard, 
    CardContent, 
    Typography, 
    IconButton
} from '@mui/material';
import '../styles/buildingOffices/card.css'
import '../styles/buildingOffices/images.css'
import '../styles/buildingOffices/arrow.css'

const Card = ({ data }) => {
    // console.log("Room card", data);
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data.images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + data.images.length) % data.images.length);
    };

    const [selectedOption, setSelectedOption] = useState('Умолчанию');
    const options = [
        'Офис',
        'Банк',
        'Торговое помещение',
        'Помещение для конференций',
        'Отель',
        'Дата-центр',
        'Жилье',
        'Спортивный центр',
        'Склад ',
        'Рабочее место/Сервисное помещение',
        'Производство',
        'Мезонин',
        'ПСН',
        'Тренинг центр',
        'Коворкинг'
    ];

    const handleFilterChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <MuiCard  className="card">
            <div className="main-container">
                <div className='images'>
                    <IconButton onClick={prevImage}>
                        <FaChevronLeft />
                    </IconButton>
                    {data.images && data.images.length > 0 ? (
                        <div className='main-image'>
                            <ByteArrayToImage 
                                byteArray={data.images[currentIndex].replace(/^\"|\"$/g, '')} // Убираем кавычки
                            /> 
                        </div>
                    ) : (
                        <p variant="body2">Изображения отсутствуют</p>
                    )}
                    <IconButton onClick={nextImage}>
                        <FaChevronRight />
                    </IconButton>

                    <div className="thumbnails">
                        {data.images && data.images.length > 0 && data.images.map((image, index) => (
                            <div 
                                key={index} 
                                className={`thumbnail ${index === currentIndex ? 'active' : ''}`}
                                onClick={() => setCurrentIndex(index)}
                            >
                                <ByteArrayToImage 
                                    byteArray={image.replace(/^\"|\"$/g, '')}
                                    className="thumbnail-image"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            
            </div>

            <CardContent className='card-content'>
                <Typography variant="body2">Тип помещения: {data.room.use_type}</Typography>
                <Typography variant="body2">Площадь: {data.room.unit_size} м²</Typography>
                <Typography variant="body2">Бюджет: {data.room.unit_size} м²</Typography>
                <Typography variant="body2">{data.room.floor} этаж из {data.buildingOffice.upper_floors}</Typography>
            </CardContent>
        </MuiCard >
    );
};

export default Card;
