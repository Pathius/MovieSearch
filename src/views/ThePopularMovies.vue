<template>
  <div>
    <section class="upcoming">
      <h2 class="upcoming__title">Popular movies</h2>
      <MovieCard
        class="upcoming__movie-card"
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
  components: {
    MovieCard
  },
  computed: {
    movies() {
      return this.$store.state.movies.popularMovies;
    }
  }
};
</script>
<style scoped lang="scss">
.upcoming {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
  padding-bottom: 60px;
  &__title {
    width: 100%;
    margin-top: 0;
    padding-top: 40px;
    font-size: 32px;
  }
}
</style>