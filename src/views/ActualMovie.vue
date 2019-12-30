<template>
  <div>
    <div class="movie" v-if="typeof movie === 'object' && movie.id">
      <!-- This div will be only rendered if the movie object is correct -->
      <img
        :src="movie.poster_path ?
        'https://image.tmdb.org/t/p/w500'+movie.poster_path : 
        require('../assets/no-poster.jpg')"
        class="movie__image"
      />
      <div>
        <h2 class="movie__title">{{movie.title}}</h2>
        <p class="movie__desc">{{movie.overview}}</p>
        <p class="movie__release">{{movie.release_date}}</p>
        <p class="movie__voting">Rating: {{movie.vote_average}}/10</p>
      </div>
    </div>
    <LoadingSpinner class="loading-spinner" v-else />
  </div>
</template>
<script>
import LoadingSpinner from "@/components/LoadingSpinner.vue";
export default {
  props: {
    id: String
  },
  watch: {
    "$route.params.id"() {
      this.$store.dispatch("findExactMovie", this.$route.params.id);
    }
  },
  created() {
    this.$store.dispatch("findExactMovie", this.id);
  },
  computed: {
    movie() {
      return this.$store.state.actualMovie;
    }
  },
  components: {
    LoadingSpinner
  }
};
</script>
<style scoped lang="scss">
.movie {
  height: 85vh;
  display: flex;
  &__image {
    box-sizing: border-box;
    height: 100%;
    border-radius: 25px;
    padding: 20px;
  }
  &__title {
    font-size: 42px;
  }
  &__desc {
    width: 80%;
    font-size: 20px;
  }
}
.loading-spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
  transform: translate(-50%, -50%);
  height: 100px;
  border: 10px solid transparent;
}
</style>
