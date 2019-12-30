<template>
  <div>
    <nav class="search">
      <input
        type="text"
        class="search__input"
        v-model="title"
        @keypress.enter="title ? submit(title) : resetMovies()"
        @focus="placeholder = ''"
        @blur="placeholder = 'Insert your movie title here'"
        :placeholder="placeholder"
      />
      <TheSearch class="search__icon fas fa-search" @click="submit(title)" />
    </nav>
  </div>
</template>
<script>
import TheSearch from "./icons/TheSearch.vue";
export default {
  data: () => ({
    title: "",
    placeholder: "Insert your movie title here"
  }),
  components: {
    TheSearch
  },
  methods: {
    submit(title) {
      this.$store.dispatch("searchByTitle", title);
    },
    // This function is called if user tries to submit empty input
    // It prevents of sending API request with empty payload and returns movies to initial state
    resetMovies() {
      this.$store.commit("resetMovies");
    }
  }
};
</script>
<style lang="scss">
.search {
  display: flex;
  justify-content: center;
  align-items: center;
  &__input {
    width: 70%;
    background-color: transparent;
    border: none;
    color: white;
    font-weight: 300;
    border-bottom: 3px solid white;
    font-size: 36px;
    text-align: center;
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: white;
    }
  }
  &__icon {
    position: absolute;
    left: 18%;
    padding: 15px;
    font-size: 36px;
    color: white;
    cursor: pointer;
  }
}
</style>