// hooks/useFetchData.js получение данных
import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchData = () => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://localhost:7168/api/ListForm');
            setData(response.data);
        } catch (error) {
            console.error('Ошибка при получении данных', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return [data, fetchData];
};

export default useFetchData;
