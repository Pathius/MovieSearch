<template>
  <div>
    <section class>
      <i class="fas fa-long-arrow-alt-left"></i>
      <h2>Your favourite movies</h2>
    </section>
    <MovieCard class="main__movie-card" />
  </div>
</template>
<script>
import MovieCard from "@/components/MovieCard.vue";
export default {
  components: {
    MovieCard
  }
};
</script>