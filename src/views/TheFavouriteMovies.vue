<template>
  <div>
    <section class="favourite">
      <h2 class="favourite__title">Your favourite movies</h2>
      <MovieCard
        class="favourite__movie-card"
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
      />
    </section>
  </div>
</template>
<script>
import MovieCard from "@/components/MovieCard";
export default {
  computed: {
    movies() {
      return this.$store.state.favouriteMovies;
    }
  },
  components: {
    MovieCard
  }
};
</script>
<style scoped lang="scss">
.favourite {
  width: 100%;
  text-align: center;
  &__title {
    margin-top: 0;
    padding-top: 40px;
    font-size: 32px;
  }
}
</style>