// Список карточек офисных зданий

import React from 'react';
import Card from './officeCard';
import '../styles/buildingOffices/cardList.css'

const CardList = ({ dataList, leaseType }) => {
    return (
        <div className='card-list' >
            {dataList.map((data, index) => (
                <Card key={index} data={data} leaseType={leaseType}/>
            ))}
        </div>
    );
};

export default CardList;