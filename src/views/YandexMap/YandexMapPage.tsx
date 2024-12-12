import React from 'react';
import { useState, useEffect, useRef} from 'react';
import {YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapControls, YMapMarker, 
    reactify} from '../../lib/ymaps';
import type {YMapLocationRequest} from 'ymaps3';
import '../../styles/views/yandexMap/yandexMap.css'
import {YMapZoomControl} from '../../lib/ymaps'; 
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import type {LngLat} from '@yandex/ymaps3-types';
import axios from 'axios';
import { BASE_URL } from '../../constants/constants';



const YandexMapPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [hoverMarkers, setHoverMarkers] = useState({});
    const [data, setData] = useState([]);

    const markerMouseOver = (id) => setHoverMarkers((previous) => ({ ...previous, [id]: true }));
    const markerMouseOut = (id) => setHoverMarkers((previous) => ({ ...previous, [id]: false }));
  
    const togglePanel = () => {
        setIsOpen(!isOpen);
    };
    
    const LOCATION: YMapLocationRequest = {
        // center: [55.733842, 37.588144],
        center: [37.588144, 55.733842],
        zoom: 12
    };

    const fetchData = async () => {
        // setLoading(true);
        const url = `${BASE_URL}/ListForm/buildingOfficeMaps`;
        try {
            const response = await axios.get(url);
            setData(response.data);
            console.log('get response', response.data);
            // console.log(data);
            // setData(response.data);
        } catch (error) {
            console.error('Ошибка при получении данных', error);
        } finally {
            // setLoading(false);
            // setLastDataSource(DataSource.INITIAL_FETCH);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    // const buildings = [
    //     {
    //         id: 1,
    //         center: [37.617223, 55.755228], // Кремль
    //         name: "Кремль",
    //         description: "Исторический комплекс в центре Москвы"
    //     },
    //     {
    //         id: 2,
    //         center: [37.581221, 55.746222], // Парк Горького
    //         name: "Парк Горького",
    //         description: "Крупный парк для прогулок и отдыха"
    //     },
    //     {
    //         id: 3,
    //         center: [37.618224, 55.760222], // Театр Российской армии
    //         name: "Театр Российской армии",
    //         description: "Один из крупнейших театров Москвы"
    //     },
    //     {
    //         id: 4,
    //         center: [37.605022, 55.743422], // Третьяковская галерея
    //         name: "Третьяковская галерея",
    //         description: "Музей изобразительного искусства"
    //     },
    // ];

    const buildings = [
        {
            id: 1,
            center: [55.755228, 37.617223], // Кремль
            name: "Кремль",
            description: "Исторический комплекс в центре Москвы"
        },
        {
            id: 2,
            center: [55.746222, 37.581221], // Парк Горького
            name: "Парк Горького",
            description: "Крупный парк для прогулок и отдыха"
        },
        {
            id: 3,
            center: [55.760222, 37.618224], // Театр Российской армии
            name: "Театр Российской армии",
            description: "Один из крупнейших театров Москвы"
        },
        {
            id: 4,
            center: [55.743422, 37.605022], // Третьяковская галерея
            name: "Третьяковская галерея",
            description: "Музей изобразительного искусства"
        },
    ];
    
    
    // Используй react-yandex-maps

    
    return (
        <div className='map-page'>
            {isOpen && (
                <div className='map-filters'>
                    <div className="filter-options">
                        <select>
                            <option>Аренда</option>
                            <option>Продажа</option>
                        </select>
                        <input type="text" placeholder="Площадь от" />
                        <input type="text" placeholder="Площадь до" />
                        <input type="text" placeholder="Бюджет, ₽" />
                        <button>Тип помещения</button>
                        <input type="text" placeholder="Поиск по улице или названию" />
                        <button>Метро</button>
                        <button>Район</button>
                        <button>Нарисовать область</button>
                    </div>
                    <div className="filter-actions">
                        <button>Сохранить фильтр</button>
                    </div>
                </div>
            )}
            
            <div className='map-filters-show'>
                <button onClick={togglePanel} className='map-display-filters'>
                    {isOpen ? 'Скрыть фильтры' : 'Показать фильтры'}
                </button>
            </div>
            <div className='map-container' id='yandex-map'>
                <YMaps>
                    <Map 
                        defaultState={{ 
                            center: [55.733842, 37.588144], 
                            zoom: 12,
                            controls: ["zoomControl", "fullscreenControl"],
                        }}
                        modules={["control.ZoomControl", "control.FullscreenControl"]}
                        style={{ 
                            width: '100%', 
                            height: '800px' 
                        }}>
                        {data.length > 0 && data.map((building, index) => (
                            <Placemark
                                key={index}
                                geometry={[building.address_y_coordinate, building.address_x_coordinate]}
                                properties={{
                                    hintContent: building.name_rus,
                                    balloonContentHeader: building.name_rus,
                                    balloonContentBody: building.gba,
                                }}
                                options={{
                                    preset: 'islands#redIcon',
                                }}
                            />
                        ))} 
                        
                        {buildings.map((building, index) => (
                            <Placemark
                                key={index}
                                geometry={building.center}
                                properties={{
                                    hintContent: building.name,
                                    balloonContentHeader: "balloonHeader",
                                    balloonContentBody: 'balloonBODY',
                                }}
                                options={{
                                    preset: 'islands#redIcon',
                                }}
                            />
                        ))}
                        <Placemark geometry={[55.684758, 37.738521]} 
                            properties={{ 
                                hintContent: 'Example', 
                                balloonContentHeader: "balloonHeader",
                                balloonContentBody: 'balloonBODY', 
                            }}
                            options={{
                                preset: 'islands#redIcon',
                            }}
                        />
                    </Map>
                </YMaps>
                {/* <YMap location={LOCATION} className='ymaps' >
                    <YMapDefaultSchemeLayer />
                    <YMapDefaultFeaturesLayer />
                    <YMapControls position="right">
                        <YMapZoomControl  />
                    </YMapControls>

                    {/* bo.address_x_coordinate 
                    {buildings.map((feature) => (
                        <YMapMarker coordinates={feature.center as [number, number]} key={feature.id}>
                            <div
                                // className="marker-container"
                                onMouseOver={() => markerMouseOver(feature.id)}
                                onMouseOut={() => markerMouseOut(feature.id)}
                            >
                                <div className={`marker-text ${hoverMarkers[feature.id] ? 'visible' : 'hidden'}`}>
                                    {feature.name}
                                </div>
                                <div className="marker">
                                    <img alt="img" className="image" />
                                </div>
                            </div>
                        </YMapMarker>
                    ))}

                    <YMapMarker coordinates={[37.588144, 55.733842]} draggable={true}>
                        <section>
                            <h1>You can drag this header</h1>
                        </section>
                    </YMapMarker>
                </YMap> */}
            </div>
        </div>
    );
};

export default YandexMapPage;