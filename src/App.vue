<template>
  <div id="app" class="page">
    <TheNavigation />
    <TheMainContent />
  </div>
</template>

<script>
import TheNavigation from "@/components/TheNavigation";
import TheMainContent from "@/components/TheMainContent";
export default {
  components: {
    TheNavigation,
    TheMainContent
  }
};
</script>
<style lang="scss">
body {
  margin: 0;
}
.page {
  margin: 0;
  &__nav {
    height: 100px;
    background-color: rgb(56, 54, 54);
  }
  &__main {
    height: 1000px;
    background-color: rgb(32, 32, 32);
  }
}
</style>
