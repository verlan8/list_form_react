// Карточка здания

import React, { useState } from 'react';
import ByteArrayToImage from '../utils/converters/byteToImg';
import { FaChevronLeft, FaChevronRight  } from 'react-icons/fa';
import { AiOutlineExpand  } from "react-icons/ai";
// import { IoCloseOutline } from "react-icons/io5";
import { 
    Card as MuiCard, 
    CardContent, 
    Typography, 
    IconButton,
    Box,
    Modal
} from '@mui/material';
import RoomsList from './roomsList';
import Grid from '@mui/material/Grid2';
import '../styles/buildingOffices/card.css'
import '../styles/buildingOffices/images.css'
import '../styles/buildingOffices/arrow.css'


const Card = ({ data }) => {
    // console.log("Card data", data); 
    const [currentIndex, setCurrentIndex] = useState(0);
    const [openModal, setOpenModal] = useState(false);

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data.images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + data.images.length) % data.images.length);
    };

    const handleZoomModal = () => {
        setOpenModal(!openModal);
    };

    return (
        <MuiCard  className="card">
            <div className="main-container">
                <div className='images'>
                    <div className='gallery'>
                        <IconButton onClick={prevImage} className='arrow arrow-left'>
                            <FaChevronLeft />
                        </IconButton>
                        {data.images && data.images.length > 0 ? (
                            <div className='main-image'>
                                <ByteArrayToImage 
                                    byteArray={data.images[currentIndex].replace(/^\"|\"$/g, '')} // Убираем кавычки
                                /> 
                            </div>
                        ) : (
                            <p className='no-image-found' variant="body2">Изображения отсутствуют</p>
                        )}
                        <IconButton onClick={nextImage} className='arrow arrow-right'>
                            <FaChevronRight />
                        </IconButton>
                        {data.images && data.images.length > 0 ? (
                             <p
                                variant="caption"
                                className='image-caption'
                            >
                                {currentIndex + 1} из {data.images.length}
                            </p>  
                        ) : null }
                        {data.images && data.images.length > 0 ? (
                            <IconButton onClick={handleZoomModal} className="zoom-button">
                                <AiOutlineExpand />
                            </IconButton>
                        ) : null }
                    </div>
                    {/* <div className="thumbnails">
                        {data.images && data.images.length > 0 && data.images.map((image, index) => (
                            <div key={index} 
                                className='thumbnail'
                                onClick={() => setCurrentIndex(index)}>
                                <ByteArrayToImage 
                                    byteArray={image.replace(/^\"|\"$/g, '')}
                                    className={currentIndex === index ? "thumbnail-selected" : "thumbnail"}
                                />
                            </div>
                        ))}
                    </div> */}
                    {/* <div className="thumbnails">
                        {data.images && data.images.length > 0 && data.images.map((image, index) => (
                            <div 
                                key={index} 
                                onClick={() => setCurrentIndex(index)}
                            >
                                <ByteArrayToImage 
                                    byteArray={image.replace(/^\"|\"$/g, '')}
                                    className="thumbnail-image"
                                />
                            </div>
                        ))}
                    </div> */}
                </div>
            
            </div>

            <CardContent className='card-content'>
                <Typography variant="h6">{data.buildingOffice.name_rus} / {data.buildingOffice.name_eng}</Typography>
                <Typography variant="body2">Статус: {data.buildingOffice.status}</Typography>
                <Typography variant="body2">Улица: {data.buildingOffice.address_street_ru}</Typography>
                <Typography variant="body2">Общее доступное количество: {data.buildingOffice.available_total_all} м²</Typography>
                <Typography variant="body2">Площадь офиса: {data.buildingOffice.gla_office} м²</Typography>
                <Typography variant="body2">Дата проверки: {data.buildingOffice.research_check_date}</Typography>
                {data.rooms && data.rooms.length > 0 ? (
                    <>
                        <Typography variant="body2">Доступные помещения:</Typography> 
                        <RoomsList rooms={data.rooms} />
                    </>
                ) : null}
            </CardContent>

            <Modal
                open={openModal}
                onClose={handleZoomModal}
                className='modal-gallery'
            >
                <div className='modal-gallery-content'>
                    <IconButton className='close-button' onClick={handleZoomModal} style={{ position: 'absolute', top: 10, right: 10 }}>
                        {/* <IoCloseOutline /> */}
                    </IconButton>
                    {data.images && data.images.length > 0 && (
                        <div>
                            <IconButton onClick={prevImage} className='arrow arrow-left'>
                                <FaChevronLeft />
                            </IconButton>
                            <ByteArrayToImage 
                                byteArray={data.images[currentIndex].replace(/^\"|\"$/g, '')}
                                className="zoomed-image"
                            />
                            <IconButton onClick={nextImage} className='arrow arrow-right'>
                                <FaChevronRight />
                            </IconButton>
                        </div>
                    )}
                </div>
            </Modal>
        </MuiCard >
    );
};

export default Card;
