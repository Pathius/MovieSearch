<template>
  <div class="page__nav nav">
    <router-link tag="div" class="nav__logo" to="/">
      <TheMovieClip />
      <h1>MovieSearch</h1>
    </router-link>
    <router-link tag="div" class="nav__favourite" to="/favourite">
      <h3 class="nav__favourite-text">Favourite movies</h3>
      <Favourite />
    </router-link>
  </div>
</template>
<script>
import TheMovieClip from "./icons/TheMovieClip.vue";
import Favourite from "./icons/Favourite.vue";
export default {
  components: {
    TheMovieClip,
    Favourite
  }
};
</script>
<style lang="scss">
.nav {
  color: white;
  display: flex;
  justify-content: space-between;
  &__logo {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 20px;
    cursor: pointer;
    &-icon {
      font-size: 52px;
      margin: 7px;
    }
  }
  &__favourite {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px;
    font-size: 16px;
    cursor: pointer;
    &-img {
      margin: 3px;
    }
  }
}
</style>