import axios from 'axios';

const API = 'http://api.openweathermap.org';
const APIKEY = 'da4eb50462e6d6a603af1fe2ac7db43c';

// export default{
export function getCityCoords(city) {
  return axios.get(`${API}/geo/1.0/direct?q=${city}&limit=1&appid=${APIKEY}`)
    .then((response) => {
      const { lat, lon } = response.data[0];
      return { lat, lon };
    })
    .catch((err) => {
      console.log(err);
    });
}

export function getWeatherData({ lat, lon }) {
  return axios.get(`${API}/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${APIKEY}`)
    .then((response) => {
      const {
        main, name, sys, weather, wind,
      } = response.data;
      return {
        main, name, sys, weather, wind,
      };
    })
    .catch((err) => {
      console.log(err);
    });
}

export function getWeatherIcon(icon) {
  return axios.get(`http://openweathermap.org/img/w/${icon}.png`)
    .then(response => response.data)
    .catch((err) => {
      console.log(err);
    });
}
