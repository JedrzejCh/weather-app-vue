<template lang="pug">
  form.search-panel(@submit.prevent="submit")
    input(type="text",class="search-input", v-model="searchValue", :placeholder="placeholder")
    button.form-button(v-if="placeholder") click to change place
    button.form-button(v-else) search
</template>

<script>
import get from 'lodash.get';
import store from '../store';

export default {
  name: 'SearchPanel',
  data() {
    return {
      searchValue: '',
    };
  },
  methods: {
    submit() {
      store.dispatch('setLoading', true);
      store.dispatch('setSearchValue', this.searchValue);
      store.dispatch('fireAPICalls');
    },
  },
  computed: {
    placeholder() {
      const name = get(this.$store.getters.getWeather, 'name');
      return name;
    },
  },

};
</script>

<style scooped lang="stylus">
  .search-input
    background-color transparent
    border none
    border-bottom 3px solid var(--light-blue)
    outline none
    font-weight 600
    color var(--dark-blue)
    font-size 2.5rem
    text-align center
    font-family: 'Montserrat', sans-serif
    &::placeholder
      color var(--dark-blue)
      font-weight 600
  .form-button
    position absolute
    bottom calc(-100% + 5rem)
    left 50%
    transform translateX(-50%)
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
    @media (min-width: 768px)
      bottom calc(-100% + 12rem)
    @media (min-width: 992px)
      bottom calc(-100% - 1rem)
      left 0
      transform none
    &:hover
      background-color var(--dark-blue)
      color #fff
      border-color var(--dark-blue)
</style>
