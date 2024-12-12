// Карточка здания

import React, { useState } from 'react';
import ByteArrayToImage from '../utils/converters/byteToImg';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { AiOutlineExpand  } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { 
    Card as MuiCard, 
    CardContent, 
    Typography, 
    IconButton,
    Modal
} from '@mui/material';
import '../styles/buildingOffices/card.css'
import '../styles/buildingOffices/images.css'
import '../styles/buildingOffices/arrow.css'
import getLeaseType from '../utils/getLeaseType';

const Card = ({ data }) => {
    console.log('Room card', data);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [openModal, setOpenModal] = useState(false);

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data.images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + data.images.length) % data.images.length);
    };

    const [selectedOption, setSelectedOption] = useState('Умолчанию');
    // const options = [
    //     'Офис',
    //     'Банк',
    //     'Торговое помещение',
    //     'Помещение для конференций',
    //     'Отель',
    //     'Дата-центр',
    //     'Жилье',
    //     'Спортивный центр',
    //     'Склад',
    //     'Рабочее место/Сервисное помещение',
    //     'Производство',
    //     'Мезонин',
    //     'ПСН',
    //     'Тренинг центр',
    //     'Коворкинг'
    // ];

    const handleZoomModal = () => {
        setOpenModal(!openModal);
        // event.stopPropagation();
    };

    const handleFilterChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <MuiCard  className='card'>
            <div className='main-container'>
                <div className='images'>
                    {data.images && data.images.length > 0 ? (
                        <div className='image-gallery-content'>
                            <IconButton onClick={prevImage} className='arrow arrow-left'>
                                <FaChevronLeft />
                            </IconButton>
                            <div className='main-image'>
                                <ByteArrayToImage 
                                    byteArray={data.images[currentIndex].replace(/^\"|\"$/g, '')}
                                    className='room-image'
                                /> 
                            </div>
                            <p className='image-caption focus-visible'>
                                {currentIndex + 1} из {data.images.length}
                            </p>
                            <IconButton onClick={handleZoomModal} className='zoom-button focus-visible'>
                                <AiOutlineExpand />
                            </IconButton>
                            <IconButton onClick={nextImage} className='arrow arrow-right'>
                                <FaChevronRight />
                            </IconButton>
                        </div>
                    ) : (
                        <p variant='body2'>Изображения отсутствуют</p>
                    )}
                </div>
            
            </div>

            <div className='room-content'>
                {data.room ? (
                    <>
                    <div className='room-content-header'>
                    <div className='room-content-header-left'>
                        <Typography variant='h6'>{data.room.unit_size} м²</Typography>
                        <Typography variant='body2'>{getLeaseType(data.room)} {data.room.use_type}</Typography>
                    </div>
                    <div className='room-content-header-right'>
                        <Typography variant='h6'>{getLeaseType(data.room) === 'Аренда' ? `${data.room.gross_rent_rur.toLocaleString('ru-RU')} ₽` : `${data.room.sale_price_rur.toLocaleString('ru-RU')} ₽`}</Typography>
                        <Typography variant='body2'>{getLeaseType(data.room) === 'Аренда' ? 'м²/год' : ''}</Typography>
                    </div>
                </div>
                
                <div className='room-content-info'> 
                    <img>{data.room.delivery_contidion}</img>
                    <Typography variant='body2'>Планировка {data.room.typical_floor_layout}</Typography>
                    <Typography variant='body2'>{data.room.floor} этаж из {data.buildingOffice.upper_floors}</Typography>
                </div>
                <div className='room-content-description'>
                    <Typography variant='body2'>{data.room.description}</Typography>
                </div>
                    </>
                ) : undefined}
                
            </div>

            <div className='building-container'>
                <div className='building-content'>
                    <div className='building-title'>
                        <Link to={`/buildingOffice/${data.buildingOffice.id}`} target='_blank' className='link-to-buildingOffice'>
                            <Typography variant='h6'>{data.buildingOffice.name_rus || data.buildingOffice.name_eng}</Typography>
                        </Link>
                        <div className='building-class-wrapper building-class-wrapper-room'>
                            <p className='building-class-item'>{data.buildingOffice.building_class}</p>
                        </div>
                    </div>
                    <Typography variant='body2'>
                        {`${data.buildingOffice.address_street_ru}, ${data.buildingOffice.address_building_number_ru}${
                        data.buildingOffice.address_additional_info_ru 
                            ? `, с ${data.buildingOffice.address_additional_info_ru}` 
                            : ''
                        }`}
                    </Typography>
                    {/* <ul className='metro-list'>
                        {data.metro.map((data, index) => (
                            <li key={index} data={data} />
                        ))}
                    </ul> */}
                </div>
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

        </MuiCard>
    );
};

export default Card;
