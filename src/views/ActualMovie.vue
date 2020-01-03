<template>
  <div>
    <!-- This div will be only rendered if the movie object is correct -->
    <div class="movie" v-if="movie && movie.id">
      <img
        :src="movie.poster_path ?
        'https://image.tmdb.org/t/p/w500'+movie.poster_path : 
        require('../assets/no-poster.jpg')"
        class="movie__image"
      />
      <div>
        <h2 class="movie__title">{{movie.title}}</h2>
        <p class="movie__genres">{{movieGenres}}</p>|
        <!-- movie.release is "year-month-day" format -->
        <p class="movie__release">{{movie.release_date.split('-')[0]}}</p>|
        <!-- Calculates duration of movie, 
        movie.number is passed as a number of minutes,
        if there's less than hour, "0h" won't be showed-->
        <p class="movie__duration">{{movieDuration}}</p>
        <StarRating :rate="movie.vote_average" />
        <p class="movie__desc">{{movie.overview}}</p>
        <button
          class="movie__favourite-button"
          @click="addToFavourite(movie)"
          v-if="!favourite"
        >add to favourites</button>
        <button
          class="movie__favourite-button-active"
          @click="removeFromFavourites(movie.id)"
          v-else
        >remove from favourites</button>
      </div>
    </div>
    <LoadingSpinner class="loading-spinner" v-else />
  </div>
</template>
<script>
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import StarRating from "@/components/StarRating";
export default {
  props: {
    id: String
  },
  watch: {
    "$route.params.id": {
      immediate: true,
      handler() {
        this.$store.dispatch("findExactMovie", this.$route.params.id);
      }
    }
  },
  computed: {
    movie() {
      return this.$store.state.actualMovie;
    },
    movieGenres() {
      // this.movie.genres is an array with seperate object for each genre
      return this.movie.genres.map(genre => genre.name).join("/");
    },
    favourite() {
      return this.$store.state.favouriteMoviesIds.includes(this.movie.id);
    },
    movieDuration() {
      return `${
        Math.round(this.movie.runtime / 60) > 0
          ? Math.round(this.movie.runtime / 60) + "h"
          : ""
      }   ${this.movie.runtime % 60}m`;
    }
  },
  methods: {
    addToFavourite(movie) {
      this.$store.dispatch("addFavouriteMovies", movie);
    },
    removeFromFavourites(id) {
      this.$store.dispatch("removeFavouriteMovie", id);
    }
  },
  components: {
    LoadingSpinner,
    StarRating
  }
};
</script>
<style scoped lang="scss">
@import "../scss/variables";
.movie {
  height: 85vh;
  display: flex;
  @media screen and (max-width: 1024px) {
    flex-wrap: wrap;
    height: inherit;
    min-height: 85vh;
    text-align: center;
    padding-top: 60px;
    justify-content: center;
  }
  &__image {
    box-sizing: border-box;
    height: 100%;
    border-radius: 25px;
    padding: 20px;
    @media screen and (max-width: 1024px) {
      width: 60%;
    }
    @media screen and (max-width: 640px) {
      width: 90%;
    }
  }
  &__title {
    font-size: 42px;
    margin: 0;
    margin-top: 20px;
    @media screen and (max-width: 768px) {
      margin-top: 0;
    }
  }
  &__genres {
    display: inline-block;
    margin: 0px;
    margin: 5px 10px 0 0;
  }
  &__release {
    display: inline-block;
    margin: 0px;
    margin: 5px 10px 0 10px;
  }
  &__duration {
    display: inline-block;
    margin: 0px;
    margin: 5px 10px 0 10px;
  }
  &__desc {
    width: 80%;
    font-size: 20px;
    @media screen and (max-width: 1024px) {
      box-sizing: border-box;
      width: 100%;
      padding: 10px;
    }
  }
  &__favourite-button {
    width: 200px;
    height: 50px;
    font-weight: bold;
    color: white;
    border-radius: 10px;
    text-transform: uppercase;
    border: 3px solid white;
    font-size: 18px;
    background-color: transparent;
    transition-duration: 0.4s;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: pointer;
    @media screen and (max-width: 1024px) {
      margin: 0 auto 20px auto;
    }
    @media screen and (max-width: 648px) {
      width: 50%;
    }
    &-active {
      @extend .movie__favourite-button;
      background-color: white;
      color: rgb(64, 69, 77);
    }
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
