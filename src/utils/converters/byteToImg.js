// конвертер фотографий с бд

import React from 'react';

const ByteArrayToImage = ({ byteArray }) => {
    if (!byteArray) return null;

    const imageSrc = `data:image/jpeg;base64,${byteArray}`;

    return (
        <img src={imageSrc} alt="" style={{ width: '100%', height: 'auto' }} />
    );
};

export default ByteArrayToImage;
