import Vue from 'vue';
import Vuex from 'vuex';
import { getCityCoords, getWeatherData } from './services/WeatherAPI';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchValue: '',
    weatherData: null,
    coords: {},
    loading: false,
    noResults: false,
    userDenied: false,
  },
  mutations: {
    setSearchValue(state, searchValue) {
      state.searchValue = searchValue;
    },
    setCoordsData(state, coords) {
      state.coords = coords;
    },
    setWeatherData(state, weather) {
      state.weatherData = weather;
    },
    setLoading(state, value) {
      state.loading = value;
    },
    setNoResults(state, value) {
      state.noResults = value;
    },
    setUserDenied(state, value) {
      state.userDenied = value;
    },
  },
  actions: {
    setSearchValue({ commit }, searchValue) {
      commit('setSearchValue', searchValue);
    },
    setLoading({ commit }, value) {
      commit('setLoading', value);
    },
    async fireAPICalls({ dispatch }) {
      await dispatch('getCoordsValue');
      await dispatch('getDataValue');
    },
    async getCoordsValue(context) {
      const coords = await getCityCoords(context.getters.getSearchValue);
      if (typeof coords === 'undefined') {
        context.commit('setLoading', false);
        context.commit('setNoResults', true);
      } else {
        context.commit('setCoordsData', coords);
      }
    },
    async getDataValue(context) {
      context.commit('setLoading', true);
      const weather = await getWeatherData(context.getters.getCoords);
      if (weather) {
        context.commit('setLoading', false);
      }
      context.commit('setWeatherData', weather);
    },
    async getUserCurrentWeather({ commit, dispatch }, userLocation) {
      commit('setCoordsData', userLocation);
      await dispatch('getDataValue');
    },
  },
  getters: {
    getSearchValue(state) {
      return state.searchValue;
    },
    getCoords(state) {
      return state.coords;
    },
    getWeather(state) {
      return state.weatherData;
    },
    getLoading(state) {
      return state.loading;
    },
    getNoResults(state) {
      return state.noResults;
    },
    getUserDenied(state) {
      return state.userDenied;
    },
  },
});
