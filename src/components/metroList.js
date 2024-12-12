import React from 'react';
import MetroStation from './metroStation';
import '../styles/metro/metro.css'

const MetroList = ({ metro, isShown }) => (
    <div>
        {metro && metro.length > 0 ? (
        <div className='metro-list-container'>
            {metro.map(metroStation => (
                <MetroStation 
                    key={metroStation.id}
                    name={metroStation.metroDetails.nameRuRu.replace(/^метро\s+/i, '')}
                    walkingTime={metroStation.pedestrian}
                    drivingTime={metroStation.masstransit}
                    isDisplay={isShown}
                />
            ))}
        </div>
        ) : null}
    </div>
);

export default MetroList;
