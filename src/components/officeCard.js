// Карточка здания

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ByteArrayToImage from '../utils/converters/byteToImg';
import { FaChevronLeft, FaChevronRight  } from 'react-icons/fa';
import { AiOutlineExpand  } from 'react-icons/ai';
import { 
    Card as MuiCard, 
    CardContent, 
    Typography, 
    IconButton,
    Box,
    Modal
} from '@mui/material';
import RoomsList from './roomsList';
import MetroList from './metroList';
import Grid from '@mui/material/Grid2';
import '../styles/buildingOffices/card.css'
import '../styles/buildingOffices/images.css'
import '../styles/buildingOffices/arrow.css'


const Card = ({ data, leaseType }) => { 
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
        // event.stopPropagation();
    };

    return (
        <MuiCard  className='card'>
            <div className='main-container'>
                <div className='images'>
                    <div className='gallery'>
                        {data.images && data.images.length > 0 ? (
                            <div className='image-gallery-content' tabIndex="0">
                                <IconButton onClick={prevImage} style={{ visibility: data.images.length > 1 ? 'visible' : 'hidden' }} className='arrow arrow-left focus-visible'>
                                    <FaChevronLeft />
                                </IconButton>
                                <div className='main-image'>
                                    <div className='main-image-container'>
                                        <Link
                                            to={`/buildingOffice/${data.buildingOffice.id}`}
                                            className='link-from-list-to-buildingOffice'
                                            target='_blank'
                                        >
                                            <ByteArrayToImage
                                                byteArray={data.images[currentIndex].replace(/^\"|\"$/g, '')}
                                                className='building-image'
                                            />
                                        </Link>
                                        <p className='image-caption focus-visible'>
                                            {currentIndex + 1} из {data.images.length}
                                        </p>
                                        <IconButton onClick={handleZoomModal} className='zoom-button focus-visible'>
                                            <AiOutlineExpand />
                                        </IconButton>
                                    </div>
                                </div>
                                <IconButton onClick={nextImage} style={{ visibility: data.images.length > 1 ? 'visible' : 'hidden' }}  className='arrow arrow-right focus-visible'>
                                    <FaChevronRight />
                                </IconButton>
                            </div>
                        ) : (
                            <p className='no-image-found' variant='body2'>Изображения отсутствуют</p>
                        )}
                    </div>
                </div>
            
            </div>

            <CardContent className='card-content'>
                <Link to={`/buildingOffice/${data.buildingOffice.id}`} className='link-to-buildingOffice' target='_blank'>
                    <Typography variant='h6'>{data.buildingOffice.name_rus || data.buildingOffice.name_eng}</Typography>
                </Link>
                <Typography variant='body2'>
                     
                    {`${data.buildingOffice.address_street_ru}, ${data.buildingOffice.address_building_number_ru}${
                    data.buildingOffice.address_additional_info_ru 
                        ? `, с ${data.buildingOffice.address_additional_info_ru}` 
                        : ''
                    }`}

                </Typography>
                <div className='building-class-wrapper'>
                    <p className='building-class-item'>Класс</p>
                    <p className='building-class-item'>{data.buildingOffice.building_class}</p>
                </div>
                <p variant='body2'>Общая площадь здания: {data.buildingOffice.gba ? `${data.buildingOffice.gba.toLocaleString('ru-RU')} м²` : 'не указана'}</p>
                {data.metroAddresses && data.metroAddresses.length > 0 ? (
                    <MetroList metro={data.metroAddresses} isShown={true}></MetroList>
                ) : null}
            </CardContent>

            <div className='room-list-container'>
                {data.rooms && data.rooms.length > 0 ? (
                    <div className='room-list'>
                        <Typography variant='body2'><strong>Помещения</strong></Typography> 
                        <RoomsList rooms={data.rooms} leaseType={leaseType}/>
                    </div>
                ) : null}
            </div>

            <Modal
                open={openModal}
                onClose={handleZoomModal}
                className='modal-gallery'
            >
                <div className='modal-gallery-container'>
                    {data.images && data.images.length > 0 && (
                        <div className='modal-gallery-content'>
                            <IconButton onClick={prevImage} style={{ visibility: data.images.length > 1 ? 'visible' : 'hidden' }}  className='arrow arrow-left'>
                                <FaChevronLeft />
                            </IconButton>

                            <div className='image-wrapper'>
                                <ByteArrayToImage 
                                    byteArray={data.images[currentIndex].replace(/^\"|\"$/g, '')}
                                    className='zoomed-image'
                                />
                                <p className='image-caption'>
                                    {currentIndex + 1} из {data.images.length}
                                </p>
                            </div>
                            <IconButton onClick={nextImage} style={{ visibility: data.images.length > 1 ? 'visible' : 'hidden' }}  className='arrow arrow-right'>
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
