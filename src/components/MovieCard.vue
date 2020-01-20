<template>
  <div>
    <router-link
      tag="div"
      class="card"
      :to="`/movie/${movie.id}`"
      v-lazyLoad="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
    >
      <LoadingSpinner />
      <h5 class="card__title">{{movie.title}}</h5>
    </router-link>
  </div>
</template>
<script>
import LoadingSpinner from "./LoadingSpinner.vue";
export default {
  components: {
    LoadingSpinner
  },
  props: {
    movie: Object
  },
  directives: {
    lazyLoad: {
      bind(el, binding, VNode) {
        const img = new Image();
        if (VNode.context.$props.movie.poster_path) {
          img.src = binding.value;
        } else {
          img.src = require("../assets/no-poster.jpg");
        }
        img.classList.add("card__img");
        img.onload = () => {
          el.removeChild(el.children[0]);
          el.prepend(img);
        };
      }
    }
  }
};
</script>
<style lang="scss">
@import "../scss/variables";
.card {
  position: relative;
  @include flex-center();
  flex-wrap: wrap;
  background-color: $movie-card;
  width: 15vw;
  height: 350px;
  margin: 40px 2.2vw;
  border-radius: 20px;
  transition-duration: 0.6s;
  cursor: pointer;
  @media screen and (max-width: 1400px) {
    width: 20vw;
    height: 450px;
    margin-top: 0;
  }
  @media screen and (max-width: 1024px) {
    width: 28vw;
  }
  @media screen and (max-width: 640px) {
    width: 80vw;
  }
  &__img {
    width: 100%;
    height: 90%;
    border-radius: 10px;
    box-sizing: border-box;
  }
  &__title {
    @include flex-center();
    width: 90%;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    position: absolute;
    top: 90%;
  }
  &:hover {
    transform: scale(1.05);
  }
}
</style>