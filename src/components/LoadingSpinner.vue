<template>
  <div>
    <div class="spinner"></div>
  </div>
</template>
<style lang="scss">
.spinner {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 5px solid transparent;
  border-top-color: white;
  border-left-color: white;
  border-bottom-color: white;
  animation: loading infinite linear 2s;
}
@keyframes loading {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>