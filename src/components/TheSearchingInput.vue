<template>
  <div>
    <nav class="search">
      <input
        type="text"
        class="search__input"
        v-model="title"
        @keypress.enter="title ? submit(title) : resetMovies()"
        @focus="placeholder = ''"
        @blur="placeholder = 'Search here'"
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
    placeholder: "Search here"
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
@import "../scss/variables";
.search {
  display: flex;
  justify-content: center;
  align-items: center;
  &__input {
    width: 50%;
    padding: 10px;
    border-radius: 10px;
    background-color: $input-dark;
    border: none;
    color: white;
    font-weight: 300;
    font-size: 24px;
    text-align: center;
    @media screen and (max-width: 640px) {
      width: 70%;
      font-size: 18px;
      font-weight: 100;
    }
    &::placeholder {
      color: white;
    }
  }
  &__icon {
    position: absolute;
    left: 25%;
    padding: 15px;
    color: white;
    cursor: pointer;
    @media screen and (max-width: 640px) {
      left: 10%;
      padding: 20px;
      margin-bottom: 4px;
    }
  }
}
</style>