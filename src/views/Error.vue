<template>
  <div class="error">
    <div class="error__messages">
      <h1 class="error__messages-title">404</h1>
      <p class="error__messages-text">page not found</p>
      <button class="error__messages-button" @click="$router.push('/')">homepage</button>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "../scss/variables";
.error {
  @include flex-center();
  height: 85vh;
  flex-wrap: wrap;
  @media screen and (max-width: 640px) {
    height: 70vh;
  }
  &__messages {
    @include flex-center();
    flex-wrap: wrap;
    text-align: center;
    &-title {
      width: 100%;
      font-size: 150px;
      margin: 0;
      line-height: 120px;
      color: white;
      @media screen and (max-width: 640px) {
        font-size: 70px;
        line-height: 50px;
      }
    }
    &-text {
      width: 100%;
      font-size: 48px;
      margin: 0;
      text-transform: uppercase;
      font-weight: bold;
      @media screen and (max-width: 640px) {
        font-size: 28px;
      }
    }
    &-button {
      @include flex-center();
      margin: 20px;
      width: 20%;
      height: 50px;
      font-weight: bold;
      color: white;
      border-radius: 10px;
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
      @media screen and (max-width: 640px) {
        width: 50%;
      }
    }
  }
}
</style>