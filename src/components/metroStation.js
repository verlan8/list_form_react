import React from 'react';
import Typography from '@mui/material/Typography';
import { BsPersonWalking } from 'react-icons/bs';
import { FaCar } from 'react-icons/fa';
import '../styles/metro/metroStation/metroStation.css'

const MetroStation = ({ name, walkingTime, drivingTime, isDisplay }) => (
    <div className='metro-station'>
        <div className='metro-station-icon'>
            <span>⬤</span>
        </div>
        <div className='metro-station-details'>
            <p variant='body3'>{name}</p>
            {isDisplay && (
                <div className='times'>
                    <p variant='body2'>
                        <BsPersonWalking /> {walkingTime} мин
                    </p>
                    <p variant='body2'>
                        <FaCar /> {drivingTime} мин
                    </p>
                </div>
            )}
        </div>
    </div>
);

export default MetroStation;
