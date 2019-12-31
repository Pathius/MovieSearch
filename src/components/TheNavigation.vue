<template>
  <div class="page__nav nav">
    <router-link tag="div" class="nav__logo" to="/" @click.native="initialState">
      <TheMovieClip />
      <h1 class="nav__logo-header">
        <span>Movie</span>
        <span class="nav__logo-span">Search</span>
      </h1>
    </router-link>
    <ul class="nav__navigation">
      <router-link tag="li" class="nav__navigation-element" to="/upcoming">
        <h3 class="nav__navigation-element-text">Upcoming</h3>
      </router-link>
      <router-link tag="li" class="nav__navigation-element" to="/popular">
        <h3 class="nav__navigation-element-text">Popular</h3>
      </router-link>
      <router-link tag="li" class="nav__navigation-element" to="/favourite">
        <h3 class="nav__navigation-element-text">Favourite</h3>
      </router-link>
    </ul>
  </div>
</template>
<script>
import TheMovieClip from "./icons/TheMovieClip.vue";
export default {
  components: {
    TheMovieClip
  },
  methods: {
    initialState() {
      this.$store.state.movies = [];
    }
  }
};
</script>
<style lang="scss">
@import "../scss/variables";
.nav {
  color: white;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 640px) {
    flex-wrap: wrap;
    justify-content: center;
  }
  &__logo {
    @include flex-center();
    margin: 0 20px;
    text-align: center;
    cursor: pointer;
    @media screen and (max-width: 640px) {
      box-sizing: border-box;
      height: 70%;
    }
    &-header {
      font-size: 48px;
      @media screen and (max-width: 640px) {
        font-size: 36px;
      }
    }
    &-span {
      color: $accent-color;
      margin: 0;
      padding: 0;
    }
  }
  &__navigation {
    @include flex-center();
    list-style-type: none;
    margin-right: 20px;
    font-size: 16px;
    cursor: pointer;
    &-element {
      margin: 0 20px;
      &-text {
        margin: 0;
      }
      @media screen and (max-width: 768px) {
        margin: 0 10px;
        height: 30%;
      }
    }
    @media screen and (max-width: 640px) {
      height: 30%;
      margin: 0;
      padding: 0;
      margin-right: 0;
    }
  }
}
</style>