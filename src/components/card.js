import React, { useState } from 'react';
import ByteArrayToImage from '../converters/byteToImg';
import '../styles/card.css'

const Card = ({ data }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data.images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + data.images.length) % data.images.length);
    };

    return (
        <div className="card">
            <div className="main-container">
                <div className='images'>
                    {data.images && data.images.length > 0 ? (
                        <div>
                            {data.images.map((image, index) => (
                                <ByteArrayToImage 
                                    key={index} 
                                    byteArray={data.images[currentIndex].replace(/^\"|\"$/g, '')} // Убираем кавычки
                                    className="main-image"
                                /> 
                            ))}
                        </div>
                    ) : (
                        <p>Изображения отсутствуют</p>
                    )}
                </div>
                <div className="thumbnail-container">
                    <button onClick={prevImage} className="arrow left-arrow">←</button>
                    <div className="thumbnails">
                        {data.images.map((image, index) => (
                            <ByteArrayToImage 
                                key={index} 
                                byteArray={image.replace(/^\"|\"$/g, '')} 
                                className={`thumbnail ${currentIndex === index ? 'active' : ''}`}
                                onClick={() => setCurrentIndex(index)} // Добавляем выбор миниатюры
                            />
                        ))}
                    </div>
                    <button onClick={nextImage} className="arrow right-arrow">→</button>
                </div>
            </div>

            <div className="card-content">
                <h3>{data.nameRus} / {data.nameEng}</h3>
                <p>Статус: {data.status}</p>
                <p>Город: {data.addressCity}</p>
                <p>Общее доступное количество: {data.availableTotalAll}</p>
                <p>Площадь офиса: {data.glaOffice} м²</p>
                <p>Дата проверки: {data.researchCheckdate}</p>
                <p>Помещения:</p>
                <div className="rooms-list">
                    {data.rooms && data.rooms.length > 0 ? (
                        <ul>
                            {data.rooms.map((room) => (
                                <li key={room.id}> {room.floor} этаж {room.divisible_from} м² {room.gross_rent_rur} ₽/мес.</li>
                            ))}
                        </ul>
                    ) : (
                        <p>Нет доступных помещений</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Card;
