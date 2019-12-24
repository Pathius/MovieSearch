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
    height: 15vh;
    background-color: rgba(43, 45, 66, 1);
  }
  &__main {
    min-height: 85vh;
    background-color: rgba(141, 153, 174, 1);
  }
}
</style>
