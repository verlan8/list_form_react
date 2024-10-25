// Список карточек помещений офисных зданий

import React from 'react';
import RoomCard from './roomCard';
import '../styles/buildingOffices/cardList.css';

const RoomCardList = ({ dataList }) => {
    return (
        <div className="card-list">
            {dataList.map((data, index) => (
                <RoomCard key={index} data={data} />
            ))}
        </div>
    );
};

export default RoomCardList;