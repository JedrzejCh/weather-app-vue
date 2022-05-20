<template lang="pug">
  .dashboard-wrapper
    .title-wrapper
      h1.dashboard-title(v-if="yourCityData.description")
        | Right now in
        SearchPanel
        |, it's {{yourCityData.description}}.
        img(:src="weatherIcon", alt="")
      h1.dashboard-title(v-else)
        | Enter a place:
        SearchPanel
        |.
    .info-grid
      .temperature
        .temperature-box--upper
          p.current-temp(v-if="mainTempData.temp") {{Math.floor(mainTempData.temp)}}℃
          p.current-temp(v-else) --
        .temperature-box--bottom
          .bottom-box-item
            p.bottom-box-item__text Sensed
            p.bottom-box-item__value(v-if="mainTempData.feelsLike") {{mainTempData.feelsLike}}℃
            p.bottom-box-item__value(v-else) --
          .bottom-box-item
            p.bottom-box-item__text Min
            p.bottom-box-item__value(v-if="mainTempData.tempMin") {{mainTempData.tempMin}}℃
            p.bottom-box-item__value(v-else) --
          .bottom-box-item
            p.bottom-box-item__text Max
            p.bottom-box-item__value(v-if="mainTempData.tempMax") {{mainTempData.tempMax}}℃
            p.bottom-box-item__value(v-else) --
      .wind
        .dashboard-element
          Icon(name="wind")
          p {{yourCityData.speedKMH}}km/h
        .dashboard-element
          Icon(name="direction")
          p {{yourCityData.deg}}deg
      .sun
        .dashboard-element
          Icon(name="sunrise")
          p {{ sunrise }}
        .dashboard-element
          Icon(name="sunset")
          p {{ sunset }}
      .another
        .dashboard-element
          Icon(name="pressure")
          p {{mainTempData.pressure}}hPa
        .dashboard-element
          Icon(name="humidity")
          p {{mainTempData.humidity}}%
    p.today Today is {{ today }}, {{yourCityData.country}}
    .no-data(v-if="$store.getters.getNoResults")
      h1 Nothing found
      button.reload-button(@click="refresh") Reload
</template>

<script>

import get from 'lodash.get';
import SearchPanel from '@/components/SearchPanel.vue';
import Icon from '@/components/Icon.vue';

export default {
  name: 'Dashboard',
  components: { SearchPanel, Icon },
  methods: {
    refresh() {
      document.location.reload(true);
    },
  },
  computed: {
    weatherData() {
      return this.$store.getters.getWeather;
    },
    mainTempData() {
      try {
        const {
          feels_like: feelsLike, humidity, pressure, temp, temp_max: tempMax, temp_min: tempMin,
        } = this.weatherData.main;
        return {
          feelsLike, humidity, pressure, temp, tempMax, tempMin,
        };
      } catch {
        return [];
      }
    },
    yourCityData() {
      try {
        const { country, sunrise, sunset } = this.weatherData.sys;
        const description = get(this.weatherData, 'weather[0].description');
        const { deg, speed } = get(this.weatherData, 'wind');
        const speedKMH = Math.round(speed * 3.6);
        return {
          country, sunrise, sunset, description, deg, speedKMH,
        };
      } catch {
        return [];
      }
    },
    sunrise() {
      const sunriseDate = get(this.weatherData, 'sys.sunrise');
      const sunriseTime = new Date(sunriseDate * 1000).toLocaleTimeString('en-US');
      if (sunriseTime === 'Invalid Date') return '--';
      return sunriseTime;
    },
    sunset() {
      const sunriseDate = get(this.weatherData, 'sys.sunset');
      const sunsetTime = new Date(sunriseDate * 1000).toLocaleTimeString('en-US');
      if (sunsetTime === 'Invalid Date') return '--';
      return sunsetTime;
    },
    today() {
      const date = new Date();
      const today = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
      return today;
    },
    weatherIcon() {
      const icon = get(this.weatherData, 'weather[0].icon');
      let url = '';
      if (typeof icon !== 'undefined') {
        url = `http://openweathermap.org/img/w/${icon}.png`;
      } else return '';
      return url;
    },
  },
};

</script>


<style scooped lang="stylus">
  .dashboard-wrapper
    padding 2rem 3rem 3rem 3rem
    background-color #fff
    max-width 110rem
    width 100%
    overflow-x auto
    position relative
    -webkit-box-shadow: 3px 3px 15px 4px rgba(0,0,0,0.1)
    box-shadow: 3px 3px 15px 4px rgba(0,0,0,0.1)
    @media (max-width: 576px)
      height 100vh
    @media (min-width: 768px)
      width 95%
    .title-wrapper
      margin-bottom 4rem
      position relative
      @media (max-width: 576px)
        margin-bottom 8rem
        img
          @media (max-width: 576px)
            display none
      .dashboard-title
        display flex
        color: var(--dark-blue)
        font-size 2.5rem
        flex-direction column
        align-items center
        @media (min-width: 992px)
          flex-direction row
          align-items flex-start
          font-size 2rem
        @media (min-width 1200px)
          font-size 3rem
    .description
      font-weight: 300
      font-style: italic
    .info-grid
      display grid
      gap 1rem
      grid-template-areas "temp temp temp"\
                          "wind sun another"\

      justify-content space-evenly
      @media (max-width: 576px)
        gap 2rem
        grid-template-areas "temp"\
                            "wind"\
                            "sun"\
                            "another"
      .temperature
        grid-area temp
        display flex
        flex-direction column
        align-items center
        margin-bottom 1rem
        .temperature-box--bottom
          display flex
          width 100%
          justify-content center
          margin-top 1rem
          .bottom-box-item
            display flex
            flex-direction column
            margin 0 1rem
            &__text
              color: var(--brown)
              margin-bottom 1rem
              display block
              font-size 1.3rem
            &__value
              color: var(--blue)
              font-size 1.3rem
              @media (max-width: 576px)
                font-size 2rem
        .current-temp
          font-size 6.5rem
          font-weight: 600

          color: var(--dark-blue)
      .wind
        grid-area wind
      .sun
        grid-area sun
      .another
        grid-area another
  .dashboard-element
    display flex
    align-items center
    p
      font-size 1.3rem
      color: var(--blue)
      @media (max-width: 576px)
        font-size 2rem
  .today
    position absolute
    right .5rem
    top .5rem
    font-size 1.2rem
    color var(--blue)
  .no-data
    position absolute
    background-color: #fff
    width 100%
    height 100%
    top 0
    left 0
    display flex
    justify-content center
    align-items center
    flex-direction column
    h1
      color var(--dark-blue)
  .reload-button
    background-color transparent
    border none
    font-size 1.6rem
    width fit-content
    font-weight 400
    color var(--blue)
    font-family: 'Montserrat', sans-serif
    cursor pointer
    border 2px solid var(--dark-blue)
    transition .3s all
    padding 0.5rem 1rem
    &:hover
      background-color var(--dark-blue)
      color #fff
      border-color var(--dark-blue)
</style>
