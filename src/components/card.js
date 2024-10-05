import React from 'react';
import ByteArrayToImage from '../converters/byteToImg';

// const ByteArrayToImage = ({ byteArray }) => {
//     const blob = new Blob([byteArray], { type: 'image/jpeg' }); // Замените на нужный MIME тип
//     const imageSrc = URL.createObjectURL(blob);

//     return (
//         <img src={imageSrc} alt="Изображение" style={{ width: '100px', height: '100px' }} />
//     );
// };

const Card = ({ data }) => {
    return (
        <div className="card">
            <h3>{data.nameRus} / {data.nameEng}</h3>
            <p>Статус: {data.status}</p>
            <p>Город: {data.addressCity}</p>
            <p>Общее доступное количество: {data.availableTotalAll}</p>
            <p>Площадь офиса: {data.glaOffice} м²</p>
            <p>Дата проверки: {data.researchCheckdate}</p>
            {data.images && data.images.length > 0 ? (
                <div className="images">
                    {data.images.map((image, index) => (
                        <ByteArrayToImage key={index} byteArray={image.replace(/^\"|\"$/g, '')} /> // Убираем кавычки
                    ))}
                </div>
            ) : (
                <p>Изображения отсутствуют</p>
            )}
        </div>
    );
};

export default Card;
