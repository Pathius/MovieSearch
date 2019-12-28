<template>
  <div>
    <main class="page__main main">
      <TheSearchingInput class="main__search" />
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
import TheSearchingInput from "@/components/TheSearchingInput.vue";
import MovieCard from "@/components/MovieCard.vue";
export default {
  computed: {
    movies() {
      return this.$store.state.movies;
    }
  },
  components: {
    MovieCard,
    TheSearchingInput
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
</style>