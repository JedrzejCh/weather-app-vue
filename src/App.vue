<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<style lang="stylus">
  @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&family=Montserrat:ital,wght@0,300;0,400;0,500;0,700;0,800;1,200&display=swap');
  @import './assets/colors.css';
  html
    font-size: 62.5%
  body
    font-family: 'Montserrat', sans-serif
    margin: 0
    padding: 0
    font-size: 1.6rem
    background-color var(--light-gray)
  *
    box-sizing: border-box
  p
    margin 0
</style>
