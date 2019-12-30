<template>
  <div class="error">
    <div class="error__messages">
      <h1 class="error__messages-title">404</h1>
      <p class="error__messages-text">page not found</p>
      <button class="error__messages-button" @click="$router.push('/')">homepage</button>
    </div>
  </div>
</template>
<script>
// import TheError from "@/components/icons/TheError.vue";
export default {
  // components: {
  //   TheError
  // }
};
</script>
<style scoped lang="scss">
.error {
  height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  &__messages {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    text-align: center;
    &-title {
      width: 100%;
      font-size: 150px;
      margin: 0;
      line-height: 120px;
      color: white;
    }
    &-text {
      width: 100%;
      font-size: 48px;
      margin: 0;
      text-transform: uppercase;
      font-weight: bold;
    }
    &-button {
      display: flex;
      justify-content: center;
      margin: 20px;
      display: flex;
      width: 20%;
      height: 50px;
      text-align: center;
      font-weight: bold;
      color: white;
      text-transform: uppercase;
      border: 3px solid white;
      font-size: 18px;
      background-color: transparent;
      transition-duration: 0.4s;
      cursor: pointer;
      &:hover {
        background-color: white;
        color: rgba(141, 153, 174, 1);
      }
    }
  }
}
</style>