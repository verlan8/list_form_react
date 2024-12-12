import React from 'react';
import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight  } from 'react-icons/fa';
import { AiOutlineExpand  } from 'react-icons/ai';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, IconButton } from '@mui/material';
import ByteArrayToImage from '../utils/converters/byteToImg';
import MetroList from '../components/metroList';
import '../styles/views/buildingOffice/buildingOfficePage.css'
import { BASE_URL } from '../constants/constants';

const BuildingOfficePage = () => {
    const { buildingId } = useParams();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
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

    const fetchData = async () => {
        const url = `${BASE_URL}/ListForm/buildingOffice/${buildingId}`;
        setLoading(true);
        try {
            const response = await axios.get(url);
            console.log('get buildingId response', response.data);
            setData(response.data);
            console.log('building data', data)
        } catch (error) {
            console.error('Ошибка при получении данных', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Box className='buildingOffice-page'>
            {/* <Link to='/' target='_blank' className='link-from-buildingOffice-to-list link-back-list'>
                Назад в ПОН
            </Link> */}
           
            <div className='buildingOffice-page-content'>
                

                {/* галерея */}
                <div className='buildingOffice-gallery'>
                    {data.images && data.images.length > 0 ? (
                        <div className='image-gallery-content'>
                            <IconButton onClick={prevImage} className='arrow arrow-left'>
                                <FaChevronLeft />
                            </IconButton>
                            <div className='main-image'>
                                <ByteArrayToImage 
                                    byteArray={data.images[currentIndex].replace(/^\"|\"$/g, '')}
                                    className='buildingOffice-image'
                                /> 
                                <p
                                    variant='caption'
                                    className='image-caption'
                                >
                                    {currentIndex + 1} из {data.images.length}
                                </p>
                            </div>
                            <IconButton onClick={nextImage} className='arrow arrow-right'>
                                <FaChevronRight />
                            </IconButton>
                        </div>
                    ) : (
                        <p className='no-image-found' variant='body2'>Изображения отсутствуют</p>
                    )}
                    {data.images && data.images.length > 0 ? (
                        <IconButton onClick={handleZoomModal} className='zoom-button'>
                            <AiOutlineExpand />
                        </IconButton>
                    ) : null }
                </div>



                <div className='buildingOffice-main'>

                    {/* Общая информация */}
                    {data.buildingOffice ? (
                        <div className='buildingOffice-main-container'>
                            <div className='buildingOffice-header'>
                                <h1 className='buildingOffice-title'>
                                    {data.buildingOffice.name_rus}
                                </h1>
                                <p className='buildingOffice-address'>
                                    {`${data.buildingOffice.address_street_ru}, ${data.buildingOffice.address_building_number_ru}${
                                    data.buildingOffice.address_additional_info_ru 
                                        ? `, с ${data.buildingOffice.address_additional_info_ru}` 
                                        : ''
                                    }`}
                                </p>
                            </div>
                            <div className='buildingOffice-address-container'>
                                {data.metroAddresses && data.metroAddresses.length > 0 ? (
                                    <MetroList metro={data.metroAddresses}></MetroList>
                                ) : null}
                            </div>
                            <div className='buildingOffice-info-container'>
                                <div className='buildingOffice-info'>
                                    {/* <Typography gutterBottom><strong>Этаж:</strong> {data.floor}</Typography> */}
                                </div>
                            </div>

                            {/* Помещения на продажу  */}
                            <div>
                                <section>
                                    <div>
                                        <h2>Площади на продажу</h2>
                                        <div>
                                            <span>
                                                {data.rooms.research_ckeck_date}
                                            </span>
                                        </div>
                                    </div>
                                    <div></div>
                                    <div role='table'>
                                        <div role='row'>
                                            {/* В дальнейшем к каждому столбцу прикрутить сортировку */}
                                            <span role='columnheader'>Площадь</span>
                                            <span role='columnheader'>Этаж</span>
                                            <span role='columnheader'>Тип</span>
                                            <span role='columnheader'>Стоимость</span>
                                            <span role='columnheader'>Налоги</span>
                                            <span role='columnheader'>Отделка</span>
                                        </div>
                                        <div role='row'>
                                            {/* Лист помещений */}
                                            {/* object.map(index, room) = {
                                                <Roomlist/>
                                            } */}
                                            <span role='cell'>
                                                <Link to={`/rooms/${data.rooms.id}`}
                                                    className='link-from-buildingOffice-to-room'
                                                    target='_blank'>
                                                        {data.rooms.unit_size} м²
                                                </Link>
                                            </span>
                                            <span role='cell'>{data.rooms.floor}</span>
                                            <span role='cell'>{data.rooms.use_type}</span>
                                            <span role='cell'>{data.rooms.sale_price_rur}</span>
                                            <span role='cell'>{data.rooms.sale_vat === 'не применяется' ? 'УСН' : `НДС ${data.rooms.sale_vat}` }</span>
                                            <span role='cell'>{data.rooms.delivery_condition}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            Всего свободно
                                            <span>{data.buildingOffice.available_office} м²</span>
                                        </div>
                                    </div>
                                </section>
                            </div>

                            {/* Помещения в аренду  */}
                            <div>
                            <section>
                                    <div>
                                        <h2>Площади в аренду</h2>
                                        <div>
                                            <span>
                                                {data.rooms.research_ckeck_date}
                                            </span>
                                        </div>
                                    </div>
                                    <div></div>
                                    <div role='table'>
                                        <div role='row'>
                                            {/* В дальнейшем к каждому столбцу прикрутить сортировку */}
                                            <span role='columnheader'>Площадь</span>
                                            <span role='columnheader'>Этаж</span>
                                            <span role='columnheader'>Тип</span>
                                            <span role='columnheader'>Ставка</span>
                                            <span role='columnheader'>Отделка</span>
                                        </div>
                                        <div role='row'>
                                            {/* Лист помещений */}
                                            {/* object.map(index, room) = {
                                                <Roomlist/>
                                            } */}
                                            <span role='cell'>
                                                <Link to={`/rooms/${data.rooms.id}`}
                                                    className='link-from-buildingOffice-to-room'
                                                    target='_blank'>
                                                        {data.rooms.unit_size} м²
                                                </Link>
                                            </span>
                                            <span role='cell'>{data.rooms.floor}</span>
                                            <span role='cell'>{data.rooms.use_type}</span>
                                            <span role='cell'>{data.rooms.gross_rent_rur}</span>
                                            <span role='cell'>{data.rooms.delivery_condition}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            Всего свободно
                                            <span>{data.buildingOffice.available_office} м²</span>
                                        </div>
                                    </div>
                                </section>
                            </div>

                            {/* Контакты  */}
                            {/* <div>

                            </div>  */}

                            {/* Парковка */}
                            <div>
                                <section>
                                    <div>
                                        <div>
                                            <div>
                                                {/* TITLE */}
                                                <h2>Парковка</h2>
                                            </div>
                                            <div>
                                                {/* PARKING INFO */}
                                                <div>
                                                    {/* TABLE TITLE */}
                                                    <div>
                                                        {/* TABLE COLUMN */}
                                                        <div>
                                                            {/* TABLR COLUMN TITLE */}
                                                            Тип парковки
                                                        </div>
                                                    </div>
                                                    <div>
                                                        {/* TABLE COLUMN */}
                                                        <div>
                                                            {/* TABLR COLUMN TITLE */}
                                                            Наличие
                                                        </div>
                                                    </div>
                                                    <div>
                                                        {/* TABLE COLUMN */}
                                                        <div>
                                                            {/* TABLR COLUMN TITLE */}
                                                            Количество парковочных мест
                                                        </div>
                                                    </div>
                                                    <div>
                                                        {/* TABLE COLUMN */}
                                                        <div>
                                                            {/* TABLR COLUMN TITLE */}
                                                            Стоимость аренды
                                                        </div>
                                                    </div>
                                                </div>

                                                <div>
                                                    {/* TABLE INFO */}
                                                    <div>
                                                        {/* COLUMN ROW */}
                                                        <div>Наземная</div>
                                                        <div>{data.buildingOffice.parking_spaces_type.includes('^surface^') ? 'Да' : 'Нет'} </div>  {/* Тип Да\нет */}
                                                        <div>{data.buildingOffice.parking_surface_total_spaces}</div> {/* колво ммест*/}
                                                        <div>{data.buildingOffice.parking_surface_asking_rent}</div>{/* стоимость */}
                                                    </div>
                                                    <div>
                                                        {/* COLUMN ROW */}
                                                        <div>Подземная</div>
                                                        <div>{data.buildingOffice.parking_spaces_type.includes("^underground^") ? 'Да' : 'Нет'} </div>  {/* Тип Да\нет */}
                                                        <div>{data.buildingOffice.parking_underground_total_spaces}</div> {/* колво ммест*/}
                                                        <div>{data.buildingOffice.parking_underground_asking_rent}</div>{/* стоимость */}
                                                    </div>
                                                    <div>
                                                        {/* COLUMN ROW */}
                                                        <div>Многоуровневая</div>
                                                        <div>{data.buildingOffice.parking_spaces_type.includes('^multilevel^') ? 'Да' : 'Нет'} </div>  {/* Тип Да\нет */}
                                                        <div>{data.buildingOffice.parking_multilevel_total_spaces}</div> {/* колво ммест*/}
                                                        <div>{data.buildingOffice.parking_multilevel_asking_rent}</div>{/* стоимость */}
                                                    </div>
                                                    <div>
                                                        {/* COLUMN ROW */}
                                                        <div>Городская</div>
                                                        <div>{data.buildingOffice.parking_spaces_type.includes('^urban^') ? 'Да' : 'Нет'} </div>  {/* Тип Да\нет */}
                                                        <div></div> {/* колво ммест*/}
                                                        <div></div>{/* стоимость */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>

                        </div>
                    ) : null}
                </div>
            </div>
        </Box>
    );
};

export default BuildingOfficePage;
