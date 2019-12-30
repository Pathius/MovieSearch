<template>
  <div>
    <main class="page__main main">
      <TheSearchingInput class="main__search" />
      <MovieCard class="main__movie-card" v-for="movie in movies" :key="movie.id" :movie="movie" />
      <LoadingSpinner v-if="!movies.length && $store.state.loading" class="loading-spinner" />
    </main>
  </div>
</template>
<script>
import TheSearchingInput from "@/components/TheSearchingInput.vue";
import MovieCard from "@/components/MovieCard.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
export default {
  computed: {
    movies() {
      return this.$store.state.movies;
    }
  },
  components: {
    MovieCard,
    TheSearchingInput,
    LoadingSpinner
  }
};
</script>
<style lang="scss">
.main {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  &__search {
    width: 100%;
    margin: 20px 0 60px 0;
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