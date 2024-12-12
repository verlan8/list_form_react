// конвертер фотографий с бд

import React from 'react';

const ByteArrayToImage = ({ byteArray, className }) => {
    if (!byteArray) return null;

    const imageSrc = `data:image/jpeg;base64,${byteArray}`;

    return (
        <img src={imageSrc} loading='lazy' alt='' className={className} />
    );
};

export default ByteArrayToImage;
