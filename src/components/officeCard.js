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
import RoomsList from './roomsList';
import '../styles/buildingOffices/card.css'
import '../styles/buildingOffices/images.css'
import '../styles/buildingOffices/arrow.css'


const Card = ({ data }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data.images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + data.images.length) % data.images.length);
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
                <Typography variant="h6">{data.office.name_rus} / {data.office.name_eng}</Typography>
                <Typography variant="body2">Статус: {data.office.status}</Typography>
                <Typography variant="body2">Улица: {data.office.address_street_ru}</Typography>
                <Typography variant="body2">Общее доступное количество: {data.office.available_total_all} м²</Typography>
                <Typography variant="body2">Площадь офиса: {data.office.gla_office} м²</Typography>
                <Typography variant="body2">Дата проверки: {data.office.research_check_date}</Typography>
                {data.rooms && data.rooms.length > 0 ? (
                    <>
                        <Typography variant="body2">Доступные помещения:</Typography> 
                        <RoomsList rooms={data.rooms} />
                    </>
                ) : null}
            </CardContent>
        </MuiCard >
    );
};

export default Card;
