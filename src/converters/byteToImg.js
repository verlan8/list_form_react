import React from 'react';

const ByteArrayToImage = ({ byteArray }) => {
    if (!byteArray) return null;

    const imageSrc = `data:image/jpeg;base64,${byteArray}`;

    return (
        <img src={imageSrc} alt="" style={{ width: '100px', height: '100px' }} />
    );
};

export default ByteArrayToImage;
