<template>
  <div id="app" class="page">
    <TheNavigation />
    <section class="page__content">
      <transition name="fade" mode="out-in" appear>
        <router-view></router-view>
      </transition>
    </section>
  </div>
</template>

<script>
import TheNavigation from "@/components/TheNavigation";
export default {
  components: {
    TheNavigation
  },
  created() {
    this.$store.commit(
      "setFavouriteMovies",
      JSON.parse(localStorage.getItem("favouriteMovies"))
    );
    this.$store.commit(
      "setFavouriteMoviesIds",
      JSON.parse(localStorage.getItem("favouriteMovies"))
    );
    this.$store.dispatch("getUpcomingMovies");
    this.$store.dispatch("getPopularMovies");
  }
};
</script>
<style lang="scss">
@import "scss/variables";
body {
  margin: 0;
  -webkit-tap-highlight-color: transparent;
  & *:focus {
    outline: 0;
  }
}
.page {
  font-family: $font-family;
  color: $font-color;
  &__nav {
    height: 15vh;
    background-color: $main-dark;
    @media screen and (max-width: 640px) {
      height: 20vh;
    }
  }
  &__content {
    min-height: 85vh;
    background-image: linear-gradient($main-dark, $main-light);
    transition-duration: 0.4s;
    @media screen and (max-width: 640px) {
      min-height: 80vh;
    }
  }
}

.fade {
  &-enter {
    opacity: 0;
    &-active {
      transition-duration: 0.6s;
    }
    &-to {
      opacity: 1;
    }
  }
  &-leave {
    opacity: 1;
    &-active {
      transition-duration: 0.6s;
    }
    &-to {
      opacity: 0;
    }
  }
}
</style>
