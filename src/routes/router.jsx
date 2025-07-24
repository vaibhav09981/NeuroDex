import { createBrowserRouter } from "react-router-dom";
import App from '../App';
import Home from '../components/Home/Home';
import Tools from '../components/Tools/Tools';
import ContactUs from '../components/ContactUs/ContactUs';
import CurrencyApp from '../components/CurrencyConverter/CurrencyApp';
import WeatherApp from '../components/WeatherApp/WeatherApp';

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "tools",
        children: [
          {
            index: true,
            element: <Tools />,
          },
          {
            path: "currency",
            element: <CurrencyApp />,
          },
          {
            path: "weatherapp",
            element: <WeatherApp />,
          },
        ],
      },
      {
        path: "contactus",
        element: <ContactUs />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);