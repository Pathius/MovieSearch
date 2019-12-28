<template>
  <div>
    <router-link tag="section" class="card" :to="`/movie?id=${movie.id}`">
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
.card {
  background-color: rgba(43, 45, 66, 1);
  position: relative;
  display: inline-block;
  width: 15vw;
  height: 400px;
  margin: 20px 2.5vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  transition-duration: 0.6s;
  cursor: pointer;
  @media screen and (max-width: 1400px) {
    width: 20vw;
    height: 450px;
    float: none;
  }
  @media screen and (max-width: 1024px) {
    width: 40vw;
    height: 450px;
    float: none;
  }
  @media screen and (max-width: 640px) {
    width: 80vw;
    height: 450px;
    float: none;
  }
  &__img {
    width: 100%;
    height: 80%;
    border-radius: 20px 20px 0 0;
    box-sizing: border-box;
  }
  &__title {
    display: flex;
    align-items: center;
    color: rgb(255, 255, 255);
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    height: 80px;
    margin: auto;
    font-family: "Avenir", Helvetica, Arial, sans-serif;
  }
  &:hover {
    transform: scale(1.05);
    background-color: rgb(53, 56, 85);
    -webkit-box-shadow: 0px 0px 37px -6px rgba(43, 45, 66, 1);
    -moz-box-shadow: 0px 0px 37px -6px rgba(43, 45, 66, 1);
    box-shadow: 0px 0px 37px -6px rgb(58, 60, 82);
  }
}
</style>