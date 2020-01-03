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
      <router-link
        tag="li"
        class="nav__navigation-element"
        to="/"
        active-class="nav__navigation-element-active"
        exact
      >
        <h3 class="nav__navigation-element-text">Home</h3>
      </router-link>
      <router-link
        tag="li"
        class="nav__navigation-element"
        to="/upcoming"
        active-class="nav__navigation-element-active"
      >
        <h3 class="nav__navigation-element-text">Upcoming</h3>
      </router-link>
      <router-link
        tag="li"
        class="nav__navigation-element"
        to="/popular"
        active-class="nav__navigation-element-active"
      >
        <h3 class="nav__navigation-element-text">Popular</h3>
      </router-link>
      <router-link
        tag="li"
        class="nav__navigation-element"
        to="/favourite"
        active-class="nav__navigation-element-active"
      >
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
      this.$store.state.searched = false;
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
    &-element {
      margin: 0 20px;
      cursor: pointer;
      &-active {
        color: $accent-color;
      }
      &-text {
        margin: 0;
        @media screen and (max-width: 768px) {
          font-size: 16px;
        }
        @media screen and (max-width: 480px) {
          font-size: 14px;
        }
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