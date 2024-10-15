import React, { useState } from 'react';
import ByteArrayToImage from '../utils/converters/byteToImg';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { 
    Card as MuiCard, 
    CardContent, 
    Typography, 
    IconButton,
    Box, 
    List, 
    ListItemButton, 
    ListItemText 
} from '@mui/material';
import '../styles/card.css'

const RoomsList = ({ rooms }) => {
    const [selectedIndex, setSelectedIndex] = React.useState(null);

    const handleListItemClick = (index) => {
        setSelectedIndex(index);
    }


    return (
        <Box className="rooms-list-container">
            <List component="nav" className='rooms-list' aria-label="rooms list">
                {rooms && rooms.length > 0 ? (
                    rooms.map((room, index) => (
                        <ListItemButton
                            key={room.id}
                            selected={selectedIndex === index}
                            onClick={() => handleListItemClick(index)}
                        >
                            <ListItemText
                                primary={`${room.floor} этаж`}
                                secondary={`${room.divisible_from} м² ${room.gross_rent_rur} ₽/мес.`}
                            />
                        </ListItemButton>
                    ))
                ) : ''}
            </List>
        </Box>
    );
};

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
                <Typography variant="h6">{data.nameRus} / {data.nameEng}</Typography>
                <Typography variant="body2">Статус: {data.status}</Typography>
                <Typography variant="body2">Город: {data.addressCity}</Typography>
                <Typography variant="body2">Общее доступное количество: {data.availableTotalAll} м²</Typography>
                <Typography variant="body2">Площадь офиса: {data.glaOffice} м²</Typography>
                <Typography variant="body2">Дата проверки: {data.researchCheckdate}</Typography>
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


// // <div className='main-image'>
// { data.images.map((image, index) => (
//     <ByteArrayToImage 
//         key={index} 
//         byteArray={data.images[currentIndex].replace(/^\"|\"$/g, '')} // Убираем кавычки
//     /> 
// ))}
// </div>
