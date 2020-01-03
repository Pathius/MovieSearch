<template>
  <div>
    <main class="page__main main">
      <TheSearchingInput class="main__search" />
      <MovieCard
        class="main__movie-card"
        v-for="(movie,index) in movies"
        :key="index"
        :movie="movie"
      />
      <LoadingSpinner v-if="!movies.length && $store.state.loading" class="main__loading-spinner" />
      <h3 v-if="!movies.length && !$store.state.loading && $store.state.searched">No movies found :(</h3>
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
  padding-bottom: 100px;
  &__search {
    width: 100%;
    margin: 20px 0 60px 0;
  }
}
</style>