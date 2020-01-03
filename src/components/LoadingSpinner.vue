<template functional>
  <div>
    <div class="spinner"></div>
  </div>
</template>
<style  lang="scss">
.spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 8px solid transparent;
  border-top-color: white;
  border-bottom-color: white;
  animation: loading infinite linear 2s;
}
@keyframes loading {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>