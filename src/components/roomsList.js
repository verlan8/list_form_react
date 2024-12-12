// Список помещений

import React from 'react';
import { 
    Box, 
    List,
    Typography,
    Button,
    Tooltip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../styles/buildingOffices/roomList.css'
import getLeaseType from '../utils/getLeaseType';
import { BASE_URL_FRONT } from '../constants/constants';


const RoomsList = ({ rooms, leaseType }) => {
    const navigate = useNavigate();
    const [selectedIndex, setSelectedIndex] = React.useState(null);

    const determineTooltipPlacement = (index) => {
        const element = document.getElementById(`room-${index}`);
        if (!element) return 'top';
    
        const rect = element.getBoundingClientRect();
        const halfScreenHeight = window.innerHeight / 2;

        return rect.top < halfScreenHeight ? 'bottom' : 'top';
    };

    const handleRoomClick = (roomId) => {
        console.log('ROOM DATA', roomId, rooms);
        // setSelectedIndex(roomId);
        // navigate(`/rooms/${roomId}`);
        const url = `${BASE_URL_FRONT}/rooms/${roomId}`;
        window.open(url, '_blank', 'noopener, noreferrer');//СДЕЛАЙ ЧЕРЕЗ LINK или пойми че не так
    }

    const getRoomPriceInfo = (room) => {
        // console.log("LEASETYPE", leaseType);
        if (room.lease !== false && room.lease !== null && leaseType.includes('Аренда')) {
            return `${leaseType} ${room.use_type} ${room.gross_rent_rur.toLocaleString('ru-RU')} ₽ в месяц`;
        } else if (room.sublease !== false && room.lease !== null && leaseType.includes('Субаренда')) {
            return `${leaseType} ${room.use_type} ${room.gross_rent_rur.toLocaleString('ru-RU')} ₽ в месяц`;
        } else if (room.sale !== false && room.lease !== null && leaseType.includes('Продажа')) {
            return `${leaseType} ${room.use_type} ${room.sale_price_rur !== 0 ? room.sale_price_rur.toLocaleString('ru-RU') + ' ₽' : ''}`;
        }
    }

    return (
        <Box className='rooms-list-container'>
            <List component='nav' className='rooms-list'>
                {rooms && rooms.length > 0 ? (
                    rooms.map((room, index) => (
                        <Tooltip
                            key={room.id}
                            title={
                                <>
                                    <Typography variant='body2' className='tooltip-text'>
                                        {getRoomPriceInfo(room)}
                                    </Typography>
                                    <Typography variant='body2' className='tooltip-text'>
                                        {room.unit_size} м²/год
                                    </Typography>
                                </>
                            }
                            placement={determineTooltipPlacement(index)}
                            arrow
                        >
                            <button
                                id={`room-${index}`}
                                variant='outlined'
                                className='room-item'
                                selected={selectedIndex === room.id}
                                onClick={() => handleRoomClick(room.id)}
                            >
                                {Math.round(room.unit_size)}
                            </button>
                        </Tooltip>
                    ))
                ) : ''}
            </List>
        </Box>
    );
};

export default RoomsList;
