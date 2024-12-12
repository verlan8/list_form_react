import React from 'react';
import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight  } from 'react-icons/fa';
import { AiOutlineExpand  } from 'react-icons/ai';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, Container, IconButton, Paper } from '@mui/material';
import ByteArrayToImage from '../utils/converters/byteToImg';
import MetroList from '../components/metroList';
import '../styles/views/room/roomPage.css'
import { BASE_URL } from '../constants/constants';
import getLeaseType from '../utils/getLeaseType';

const RoomPage = () => {
    const { roomId } = useParams();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState(false);
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
        if (!roomId) return; 
        const url = `${BASE_URL}/ListForm/rooms/${roomId}`;
        console.log('roomId', roomId);
        setLoading(true);
        try {
            console.log('roomId', roomId);
            const response = await axios.get(url);
            console.log('get roomId response', response.data);
            setData(response.data);
            console.log('room data', data)
        } catch (error) {
            console.error('Ошибка при получении данных', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (roomId) {
            fetchData();
        }
    }, [roomId]);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    }

    if (loading || !data) {
        return <p>Loading...</p>;
    }

    return (
        <Container className='room-page'>
            
            {/* кнопка возврата на страницу офисного здания */}
            {/* {data.buildingOffice ? (
                <Link 
                    to={`/buildingOffice/${data.buildingOffice.id}`} 
                    target='_blank'
                    className='link-from-room-to-buildingOffice link-back-building'>
                    Назад в здание
                </Link>
            ) : ''}
             */}
           {/* страница помещения */}
            <div className='room-page-content'>

                {/* галерея */}
                <div className='room-gallery'>
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

                {data.buildingOffice  && data.room ? (
                <>
                <Paper className='room-main'>
                    {/* информация о помещении */}
                        <div className='room-main-container'>
                            <h1 className='room-title'>
                                {getLeaseType(data.room)} {data.room.use_type} в здании <Link to={`/buildingOffice/${data.buildingOffice.id}`} className='link-from-room-to-buildingOffice'>{data.buildingOffice.name_rus}</Link>
                            </h1>
                            <div className='room-address-container'>
                                <p className='room-address'>
                                    {`${data.buildingOffice.address_street_ru}, ${data.buildingOffice.address_building_number_ru}${
                                        data.buildingOffice.address_additional_info_ru 
                                            ? `, с ${data.buildingOffice.address_additional_info_ru}` 
                                            : ''
                                    }`}
                                </p>
                                {data.metroAddresses && data.metroAddresses.length > 0 ? (
                                    <MetroList metro={data.metroAddresses} isShown={false}></MetroList>
                                ) : null} 
                            </div>
                            
                            {/* общая информация */}
                            <div className='room-info-container'>
                                <ul className='room-info-list'>
                                    <li className='room-info-item'>
                                        <div className='room-info-item-title'>Арендуемая площадь</div>
                                        <div className='room-info-item-value'>{data.room.unit_size} м²</div>
                                    </li>
                                    <li className='room-info-item'>
                                        <div className='room-info-item-title'>Тип помещения</div>
                                        <div className='room-info-item-value'>{data.room.use_type}</div>
                                    </li>
                                    <li className='room-info-item'>
                                        <div className='room-info-item-title'>Этаж</div>
                                        <div className='room-info-item-value'>{data.room.floor}</div>
                                    </li>
                                    <li className='room-info-item'>
                                        <div className='room-info-item-title'>Отделка</div>
                                        <div className='room-info-item-value'>{data.room.delivery_condition}</div>
                                    </li>
                                    <li className='room-info-item'>
                                        <div className='room-info-item-title'>Планировка</div>
                                        <div className='room-info-item-value'>{data.room.typical_floor_layout}</div>
                                    </li>
                                    <li className='room-info-item'>
                                        <div className='room-info-item-title'>Мебель</div>
                                        {/* if data.room.delivery_condition = turnkey furnished то с мебелью */}
                                        <div className='room-info-item-value'>{data.room.delivery_condition === 'С отделкой (с мебелью)' ? 'С мебелью' : 'Без мебели'}</div>
                                    </li>
                                </ul>
                            </div>

                            {/* Описание */}
                            {data.room.description && (
                                <div className='room-description'>
                                    <div className='description-title'>
                                        <Typography variant='body1'><strong>Описание</strong></Typography>
                                    </div>
                                    <div className={`description-text-container ${expanded ? 'expanded' : ''}`}>
                                        <Typography variant='body2' className='text'>
                                            {data.room.description}
                                        </Typography>
                                        <button 
                                            className='expand-text'
                                            onClick={handleExpandClick}
                                        >
                                            {expanded ? 'Скрыть' : 'Далее'}
                                        </button>
                                    </div>
                                </div>
                            )}
                            </div>
                            </Paper>

                            <Paper>
                            {/* Условия аренды */}
                            <div className='rental-condition'>
                                {/* Условия аренды заголовок */}
                                <section className='rental-title-container'>
                                    <div className='rental-title-box'>
                                        <h2 className='rental-title'>Условия аренды</h2>
                                        <div >{ data.room.unit_size }</div>
                                        <div> { data.room.use_type }</div>
                                    </div>
                                </section>

                                {/* Цены */}
                                <section>
                                    <section>
                                        <section>
                                            {/* Базовая ставка аренды, рублей:	 */}
                                            <div>
                                                <span>Ставка</span>
                                                <span>{ data.room.base_rent_rur }</span>
                                            </div>
                                            
                                            <div>
                                                {/* SELECT в год или в месяц*/}
                                            </div>
                                        </section>
                                        
                                        <section>
                                            <ul>
                                                <li>
                                                    <div>
                                                        <div>Эксплуатационные расходы (OPEX)</div>
                                                        <div>{data.room.opex_included ? 'Включены' : 'Не включены'}</div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </section>

                                        {/* Налоги */}
                                        <section>
                                            <ul>
                                                <li>
                                                    <div>
                                                        <span></span>
                                                        <div>Налоги</div>
                                                        <div>
                                                            <span> { data.room.sale_vat === 'не применяется' ? 'УСН' : 'НДС' } </span>
                                                            <span> { data.room.sale_vat === 'не применяется' ? '' : data.room.sale_vat} </span>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </section>

                                        {/* Итоговая ставка вкл OPEX и НДС, рублей:	 */}
                                        <section>
                                            <div>
                                                <span>Итого за месяц</span>
                                                <span>вкл. налоги</span>
                                            </div>
                                            <div>
                                                <div>
                                                    <b>{ data.room.gross_rent_rur }</b>
                                                </div>
                                            </div>
                                        </section>
                                        
                                    </section>
                                    
                                    <section>
                                        {/* диаграмма 
                                            высчитывание процента ндс (от итоговой суммы - базовая ставка) / 100 %
                                        */}
                                    </section>
                                </section>

                                {/* Дополнительная информация условий аренды(на уровне здания)*/}
                                <section>
                                    <ul>
                                        {/* Мин аренда */}
                                        <li>
                                            <div>Минимальный срок аренды</div>
                                            <div>{data.buildingOffice.min_lease_term}</div>
                                        </li>
                                        {/* Макс аренда */}
                                        <li>
                                            <div>Максимальный срок аренды</div>
                                            <div>{data.buildingOffice.max_lease_term}</div>
                                        </li>
                                        {/* Депозит */}
                                        <li>
                                            <div>Депозит</div>
                                            <div>{data.buildingOffice.security_deposit}</div>
                                        </li>
                                    </ul>
                                </section>


                            </div>
                            </Paper>
                            

                            <Paper>
                            {/* Условия продажи */}
                            <div className='sale-condition'>
                                
                                {/* Условия продажи заголовок */}
                                <section className='sale-title-container'>
                                    <div className='sale-title-box'>
                                        <h2 className='sale-title'>Условия продажи</h2>
                                        <div >{ data.room.unit_size }</div>
                                        <div> { data.room.use_type }</div>
                                    </div>
                                </section>

                                {/* Информация о продаже помещения */}
                                <section>
                                    <div>
                                        <div>
                                            <div>Стоимость за 1 м²</div>
                                            <div>{data.room.sale_price_vat_rur}</div>
                                        </div>
                                        <div>
                                            <div>Общая стоимость</div>
                                            <div>{data.room.amount_vat_rur}</div>
                                        </div>
                                        <div>
                                            <div>Эксплуатационные расходы (OPEX)</div>
                                            <div>{data.room.opex_included ? 'Включены' : 'Не включены'}</div>
                                        </div>
                                        <div>
                                            <div>Налоги</div>
                                            <div>{ data.room.sale_vat === 'не применяется' ? 'УСН' : `НДС ${data.room.sale_vat}` }</div>
                                        </div>
                                    </div>

                                    <div>
                                        {/* Общая стоимость за все помещение */}
                                        <div>
                                            <div>
                                                <span>X</span>
                                                <div>
                                                    <span>{data.room.sale_price_vat_rur}</span>
                                                    <span>{data.room.unit_size}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <span>=</span>
                                                <span>{data.room.amount_vat_rur}</span>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                            </Paper>
                            {/* Контакты */}
                            {/* <div>
                                
                            </div> */}


                            <Paper>
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
                                                        <div>{data.buildingOffice.parking_spaces_type.includes("^surface^") ? 'Да' : 'Нет'} </div>  {/* Тип Да\нет */}
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
                                                        <div>{data.buildingOffice.parking_spaces_type.includes("^multilevel^") ? 'Да' : 'Нет'} </div>  {/* Тип Да\нет */}
                                                        <div>{data.buildingOffice.parking_multilevel_total_spaces}</div> {/* колво ммест*/}
                                                        <div>{data.buildingOffice.parking_multilevel_asking_rent}</div>{/* стоимость */}
                                                    </div>
                                                    <div>
                                                        {/* COLUMN ROW */}
                                                        <div>Городская</div>
                                                        <div>{data.buildingOffice.parking_spaces_type.includes("^urban^") ? 'Да' : 'Нет'} </div>  {/* Тип Да\нет */}
                                                        <div></div> {/* колво ммест*/}
                                                        <div></div>{/* стоимость */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                            </Paper>
                        {/* </div> */}
                        </>
                    ) : null}
                

            </div>
        </Container>
    );
};

export default RoomPage;
