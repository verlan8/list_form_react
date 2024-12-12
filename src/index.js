import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

/* страницы */
import App from './App';
import ErrorPage from './views/ErrorPage'
import RoomPage from './views/RoomPage'
import BuildingOfficePage from './views/BuildingOfficePage'
import YandexMapPage from './views/YandexMap/YandexMapPage'


// все маршруты
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "rooms/:roomId",
    element: <RoomPage/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "buildingOffice/:buildingId",
    element: <BuildingOfficePage/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "map",
    element: <YandexMapPage/>,
    errorElement: <ErrorPage />,
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <RouterProvider router={router} />
    // <App />
  // </React.StrictMode>
);

reportWebVitals();
