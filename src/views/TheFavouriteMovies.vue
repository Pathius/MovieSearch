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