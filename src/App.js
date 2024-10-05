import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardList from './components/cardlist';

//получаю list<byte[]> images -> преобразовать в картинки
const YourComponent = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://localhost:7168/api/ListForm');
                const dataList = response.data.map(item => ({
                    ...item,
                    images: item.images // Пример: [{ id: 1, data: byteArray }, {...}]
                }));
                setData(dataList);
                console.log(response.data);
                console.log(dataList);
            } catch (error) {
                console.error('Ошибка при получении данных', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>Данные из базы</h1>
            <ul>    
                <CardList dataList={data} />;
            </ul>
        </div>
    );
};

export default YourComponent;


// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
