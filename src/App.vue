<template>
  <div id="app" class="page">
    <TheNavigation />
    <section class="page__content">
      <transition name="fade" mode="out-in" appear>
        <router-view></router-view>
      </transition>
    </section>
    <transition name="fade" mode="out-in">
      <div v-if="showModal" class="page__opacity" @click="closeModal" key="opacity"></div>
    </transition>
    <transition name="fade" mode="out-in">
      <TheLoginModal v-if="showModal" class="page__modal" key="modal" />
    </transition>
  </div>
</template>

<script>
import TheLoginModal from "@/components/TheLoginModal";
import TheNavigation from "@/components/TheNavigation";
export default {
  components: {
    TheNavigation,
    TheLoginModal
  },
  created() {
    this.$store.commit(
      "setFavouriteMovies",
      JSON.parse(localStorage.getItem("favouriteMovies"))
    );
    this.$store.dispatch("getUpcomingMovies");
    this.$store.dispatch("getPopularMovies");
    this.$store.commit(
      "checkIfLogged",
      JSON.parse(localStorage.getItem("token"))
    );
  },
  computed: {
    showModal() {
      return this.$store.state.movies.showModal;
    }
  },
  methods: {
    closeModal() {
      this.$store.commit("closeModal");
    }
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
  &__opacity {
    position: absolute;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.315);
  }
  &__modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
