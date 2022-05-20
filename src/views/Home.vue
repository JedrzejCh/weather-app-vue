<template lang="pug">
  .main-view
    Dashboard
    .loader-wrapper(v-if="$store.getters.getLoading")
      .loader
        div
        div
</template>

<script>
import SearchPanel from '@/components/SearchPanel.vue';
import Dashboard from '@/components/Dashboard.vue';
import store from '../store';

export default {
  name: 'home',
  components: { SearchPanel, Dashboard },
  created() {
    console.log(this.$store)
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const { latitude: lat, longitude: lon } = coords;
      const preparedDAta = { lat, lon };
      store.dispatch('getUserCurrentWeather', preparedDAta);
    }, (error) => {
      if (error.code === error.PERMISSION_DENIED) {
        store.commit('setUserDenied', true);
      }
    });
  },
};
</script>
<style scoped lang="stylus">
  .main-view
    display flex
    flex-direction column
    justify-content center
    align-items center
    height 100vh
    overflow hidden
  .loader-wrapper
    width 100%
    height 100%
    background-color white
    position absolute
  .loader
    display: inline-block
    position: relative
    width: 80px
    height: 80px
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
  .loader div
    position: absolute
    border: 4px solid #587295
    opacity: 1
    border-radius: 50%
    animation: loading 1s cubic-bezier(0, 0.2, 0.8, 1) infinite
  .loader div:nth-child(2)
    animation-delay: -0.5s
  @keyframes loading
    0%
      top: 36px
      left: 36px
      width: 0
      height: 0
      opacity: 1
    100%
      top: 0px
      left: 0px
      width: 72px
      height: 72px
      opacity: 0
</style>
