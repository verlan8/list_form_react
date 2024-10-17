import React from 'react';
import { 
    Box, 
    List, 
    ListItemButton, 
    ListItemText 
} from '@mui/material';
import '../styles/buildingOffices/roomList.css'


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

export default RoomsList;
