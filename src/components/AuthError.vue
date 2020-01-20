<template functional>
  <div class="error">
    <slot></slot>
  </div>
</template>
<style scoped lang="scss">
.error {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  font-weight: bold;
  height: 40px;
  font-size: 18px;
  border-radius: 40px;
  border: 2px solid red;
  box-sizing: border-box;
  background-color: rgb(238, 53, 53);
  color: white;
  margin: 0 auto;
}
</style>