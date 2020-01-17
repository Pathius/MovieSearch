<template>
  <div class="page__nav nav">
    <router-link tag="div" class="nav__logo" to="/" @click.native="initialState">
      <TheMovieClip />
      <h1 class="nav__logo-header">
        <span>Movie</span>
        <span class="nav__logo-span">Search</span>
      </h1>
    </router-link>
    <ul class="nav__navigation">
      <router-link
        tag="li"
        class="nav__navigation-element"
        to="/"
        active-class="nav__navigation-element-active"
        exact
      >
        <h3 class="nav__navigation-element-text">Home</h3>
      </router-link>
      <router-link
        tag="li"
        class="nav__navigation-element"
        to="/upcoming"
        active-class="nav__navigation-element-active"
      >
        <h3 class="nav__navigation-element-text">Upcoming</h3>
      </router-link>
      <router-link
        tag="li"
        class="nav__navigation-element"
        to="/popular"
        active-class="nav__navigation-element-active"
      >
        <h3 class="nav__navigation-element-text">Popular</h3>
      </router-link>
      <router-link
        tag="li"
        class="nav__navigation-element"
        to="/favourite"
        active-class="nav__navigation-element-active"
        v-if="logged"
      >
        <h3 class="nav__navigation-element-text">Favourite</h3>
      </router-link>
      <li class="nav__navigation-element-login" @click="logout" v-if="logged">
        <TheLogout />
        <h3 class="nav__navigation-element-text">Logout</h3>
      </li>
      <li class="nav__navigation-element-login" to="/login" @click="showModal" v-else>
        <TheLogin />
        <h3 class="nav__navigation-element-text">Sign in</h3>
      </li>
    </ul>
  </div>
</template>
<script>
import TheMovieClip from "./icons/TheMovieClip.vue";
import TheLogin from "./icons/TheLoginIcon.vue";
import TheLogout from "./icons/TheLogoutIcon.vue";
export default {
  data: () => ({
    registerModal: false,
    loginModal: false
  }),
  components: {
    TheMovieClip,
    TheLogin,
    TheLogout
  },
  computed: {
    logged() {
      return this.$store.state.auth.userId && this.$store.state.auth.token;
    }
  },
  methods: {
    initialState() {
      this.$store.state.movies.movies = [];
      this.$store.state.movies.searched = false;
    },
    showModal() {
      this.$store.commit("showModal");
    },
    logout() {
      this.$store.commit("logout");
    }
  }
};
</script>
<style lang="scss">
@import "../scss/variables";
.nav {
  color: white;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 640px) {
    flex-wrap: wrap;
    justify-content: center;
  }
  &__logo {
    @include flex-center();
    margin: 0 20px;
    text-align: center;
    cursor: pointer;
    @media screen and (max-width: 640px) {
      box-sizing: border-box;
      height: 70%;
    }
    &-header {
      font-size: 48px;
      @media screen and (max-width: 768px) {
        font-size: 30px;
      }
    }
    &-span {
      color: $accent-color;
      margin: 0;
      padding: 0;
    }
  }
  &__navigation {
    @include flex-center();
    list-style-type: none;
    font-size: 16px;
    &-element {
      margin: 0 20px;
      cursor: pointer;
      &-login {
        @extend .nav__navigation-element;
        @include flex-center();
        border: 2px solid $accent-color;
        padding: 4px 10px;
        border-radius: 20px;
        background-color: $accent-color;
        @media screen and (max-width: 768px) {
          padding: 4px 6px;
        }
      }
      &-active {
        color: $accent-color;
      }
      &-text {
        margin: 0;
        @media screen and (max-width: 768px) {
          font-size: 16px;
        }
        @media screen and (max-width: 480px) {
          font-size: 12px;
        }
      }
      @media screen and (max-width: 1024px) {
        margin: 0 10px;
      }
      @media screen and (max-width: 768px) {
        margin: 0 5px;
      }
    }
    @media screen and (max-width: 640px) {
      margin: 0;
      padding: 0;
      margin-right: 0;
    }
  }
}
</style>