import React from 'react';
import Card from './card';

const CardList = ({ dataList }) => {
    return (
        <div className="card-list">
            {dataList.map((data, index) => (
                <Card key={index} data={data} />
            ))}
        </div>
    );
};

export default CardList;