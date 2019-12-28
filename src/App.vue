<template>
  <div id="app" class="page">
    <TheNavigation />
    <section tag="div" class="page__content">
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
body {
  margin: 0;
}
.page {
  margin: 0;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  &__nav {
    height: 15vh;
    background-color: rgba(43, 45, 66, 1);
  }
  &__content {
    min-height: 85vh;
    background-color: rgba(141, 153, 174, 1);
  }
}

.fade {
  &-enter {
    opacity: 0;
    &-active {
      transition-duration: 0.5s;
    }
    &-to {
      opacity: 1;
    }
  }
  &-leave {
    opacity: 1;
    &-active {
      transition-duration: 0.5s;
    }
    &-to {
      opacity: 0;
    }
  }
}
</style>
