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
      <i class="search__icon fas fa-search" @click="submit(title)"></i>
    </nav>
  </div>
</template>
<script>
export default {
  data: () => ({
    title: "",
    placeholder: "Insert your movie title here"
  }),
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
    border-bottom: 4px solid white;
    font-size: 46px;
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