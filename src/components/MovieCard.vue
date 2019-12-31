<template>
  <div>
    <router-link tag="div" class="card" :to="`/movie/${movie.id}`">
      <!-- If there's no image on API, "no-poster.jpg" will be loaded instead -->
      <img
        :src="movie.poster_path ?
        'https://image.tmdb.org/t/p/w500'+movie.poster_path : 
        require('../assets/no-poster.jpg')"
        class="card__img"
      />
      <h5 class="card__title">{{movie.title}}</h5>
    </router-link>
  </div>
</template>
<script>
export default {
  props: {
    movie: Object
  }
};
</script>
<style scoped lang="scss">
@import "../scss/variables";
.card {
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
    margin-top: 5px;
  }
  &:hover {
    transform: scale(1.05);
  }
}
</style>