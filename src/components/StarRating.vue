<template>
  <div class="stars-outer">
    <div class="stars-inner" :style="`width: ${starPercentage}%;`"></div>
  </div>
</template>
<script>
export default {
  props: {
    rate: Number
  },
  computed: {
    starPercentage() {
      // this.rate is number in scale of 0 to 10
      return Math.round(this.rate) * 10;
    }
  }
};
</script>
<style lang="scss">
.stars-outer {
  position: relative;
  display: inline-block;
}

.stars-inner {
  position: absolute;
  top: 0;
  left: 0;
  white-space: nowrap;
  overflow: hidden;
  width: 0;
}

.stars-outer::before {
  content: "\f005 \f005 \f005 \f005 \f005";
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  color: #ccc;
}

.stars-inner::before {
  content: "\f005 \f005 \f005 \f005 \f005";
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  color: rgb(219, 184, 95);
}
</style>