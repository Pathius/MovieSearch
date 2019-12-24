<template>
  <div>
    <main class="page__main main">
      <MovieCard
        class="main__movie-card"
        v-for="(movie, index) in movies"
        :key="movie+index"
        :movie="movie"
      />
    </main>
  </div>
</template>
<script>
import MovieCard from "@/components/MovieCard.vue";
export default {
  computed: {
    movies() {
      return this.$store.state.movies;
    }
  },
  components: {
    MovieCard
  }
};
</script>
<style lang="scss">
.main {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>