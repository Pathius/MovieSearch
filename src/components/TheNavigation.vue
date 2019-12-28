<template>
  <div class="page__nav nav">
    <router-link tag="div" class="nav__logo" to="/">
      <i class="nav__logo-icon fas fa-film"></i>
      <h1>MovieSearch</h1>
    </router-link>
    <router-link tag="div" class="nav__favourite" to="/favourite">
      <h3 class="nav__favourite-text">Favourite movies</h3>
      <i class="nav__favourite-img fas fa-heart"></i>
    </router-link>
  </div>
</template>
<script>
export default {};
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