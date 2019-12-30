<template>
  <div>
    <div class="spinner"></div>
  </div>
</template>
<style scoped lang="scss">
.spinner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 8px solid transparent;
  border-top-color: white;
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