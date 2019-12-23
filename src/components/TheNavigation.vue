<template>
  <div>
    <nav class="page__nav nav">
      <input
        type="text"
        class="nav__searching-input"
        v-model="title"
        @keypress.enter="submit(title)"
      />
      <i class="nav__searching-icon fas fa-search" @click="submit(title)"></i>
    </nav>
  </div>
</template>
<script>
export default {
  data: () => ({
    title: ""
  }),
  methods: {
    submit(title) {
      this.$store.dispatch("searchByTitle", title);
    }
  }
};
</script>
<style lang="scss">
.nav {
  display: flex;
  justify-content: center;
  align-items: center;
  &__searching-input {
    width: 70%;
    background-color: rgba(255, 255, 255, 0.219);
    font-size: 54px;
    color: white;
    border: none;
    padding-left: 72px;
    text-align: center;
  }
  &__searching-icon {
    position: absolute;
    left: 13%;
    padding: 15px;
    font-size: 36px;
    color: white;
    cursor: pointer;
  }
}
</style>