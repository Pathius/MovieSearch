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
  }
};
</script>
<style lang="scss">
@import "scss/variables";
body {
  margin: 0;
  -webkit-tap-highlight-color: transparent;
}
.page {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  color: $font-color;
  &__nav {
    height: 15vh;
    background-color: $main-dark;
    margin: 0;
    @media screen and (max-width: 640px) {
      height: 20vh;
    }
  }
  &__content {
    transition-duration: 0.4s;
    min-height: 85vh;
    background-image: linear-gradient($main-dark, $main-light);
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
