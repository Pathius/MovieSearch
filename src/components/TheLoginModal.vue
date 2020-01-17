<template>
  <div class="login" @keypress.enter="!$v.$invalid ? login() : ''">
    <TheCancelIcon class="login__cancel" @click.native="closeModal" />
    <h2 class="login__title">Welcome back!</h2>
    <div class="login__form-wrapper">
      <input
        type="text"
        class="login__input"
        v-model.trim="email"
        @input="$v.email.$model = email"
        :style="!$v.email.$dirty ? 
        null : 
        ($v.email.required && $v.email.minLength && $v.email.email) ? 
        'border: 1px solid green' : 
        'border: 1px solid red'"
        @focus="emailPlaceholder = ''"
        @blur="emailPlaceholder = 'Email'"
        :placeholder="emailPlaceholder"
      />
      <CorrectIcon v-if="$v.email.$dirty && !$v.email.$invalid" class="login__icon" />
      <WrongIcon v-if="$v.email.$dirty && $v.email.$invalid" class="login__icon" />
    </div>
    <div class="login__form-wrapper">
      <input
        type="password"
        class="login__input"
        v-model="password"
        @input="$v.password.$model = password"
        :style="!$v.password.$dirty ? 
        null : 
        ($v.password.required && $v.password.minLength) ? 
        'border: 1px solid green' : 
        'border: 1px solid red'"
        @focus="passwordPlaceholder = ''"
        @blur="passwordPlaceholder = 'Password'"
        :placeholder="passwordPlaceholder"
      />
      <CorrectIcon v-if="$v.password.$dirty && !$v.password.$invalid" class="login__icon" />
      <WrongIcon v-if="$v.password.$dirty && $v.password.$invalid" class="login__icon" />
    </div>
    <div class="login__checkbox" @click="stayLogged = !stayLogged">
      <input type="checkbox" name="remember" class="login__checkbox-box" v-model="stayLogged" />Stay logged?
    </div>
    <button
      :class="$v.$invalid || loading ? 'login__button-disabled' : 'login__button'"
      :disabled="$v.$invalid || loading"
      @click="login"
    >Sign in</button>
    <router-link
      tag="p"
      to="/register"
      @click.native="closeModal"
      class="login__register"
    >or create account</router-link>
    <LoadingSpinner v-if="loading" />
    <AuthError class="login__error" v-if="error" />
  </div>
</template>
<script>
import TheCancelIcon from "./icons/TheCancelIcon.vue";
import CorrectIcon from "./icons/CorrectIcon.vue";
import WrongIcon from "./icons/WrongIcon.vue";
import LoadingSpinner from "./LoadingSpinner.vue";
import AuthError from "./AuthError.vue";
import { required, minLength, email } from "vuelidate/lib/validators";
export default {
  data: () => ({
    emailPlaceholder: "Email",
    passwordPlaceholder: "Password",
    email: "",
    password: "",
    stayLogged: false
  }),
  validations: {
    email: {
      required,
      email,
      minLength: minLength(5)
    },
    password: {
      required,
      minLength: minLength(8)
    }
  },
  methods: {
    closeModal() {
      this.$store.commit("closeModal");
    },
    login(payload) {
      payload = {
        loginPayload: {
          email: this.email,
          password: this.password,
          returnSecureToken: true
        },
        stayLogged: this.stayLogged
      };
      this.$store.dispatch("login", payload);
    }
  },
  computed: {
    loading() {
      return this.$store.state.auth.loginIsLoading;
    },
    error() {
      return this.$store.state.auth.loginError;
    }
  },
  components: {
    TheCancelIcon,
    CorrectIcon,
    WrongIcon,
    LoadingSpinner,
    AuthError
  },
  created() {
    this.$store.state.auth.loginError = false;
  }
};
</script>
<style scoped lang="scss">
@import "../scss/variables";
.login {
  padding: 40px;
  position: absolute;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  flex-wrap: wrap;
  background-color: $modal-dark;
  border-radius: 30px;
  -webkit-box-shadow: -10px 10px 48px -16px rgba(0, 0, 0, 0.44);
  -moz-box-shadow: -10px 10px 48px -16px rgba(0, 0, 0, 0.781);
  box-shadow: -10px 10px 48px -16px rgba(0, 0, 0, 0.781);
  @media screen and (max-width: 640px) {
    width: 70vw;
  }
  &__form-wrapper {
    position: relative;
  }
  &__cancel {
    position: absolute;
    right: 5%;
    top: 5%;
  }
  &__title {
    font-size: 50px;
    margin: 20px;
    @media screen and (max-width: 640px) {
      margin: 0;
      font-size: 40px;
    }
  }
  &__input {
    width: 60%;
    padding: 5px;
    border-radius: 10px;
    background-color: $input-dark;
    border: none;
    color: white;
    font-weight: 300;
    font-size: 18px;
    margin: 10px;
    text-align: center;
    transition-duration: 0.4s;
    @media screen and (max-width: 640px) {
      width: 70%;
      font-size: 18px;
      font-weight: 100;
    }
    &::placeholder {
      color: white;
    }
    &-messages {
      color: red;
      &-correct {
        color: green;
      }
    }
  }
  &__icon {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    right: 18%;
  }
  &__checkbox {
    margin-top: 10px;
    width: 100%;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
    &-box {
      background-color: red;
    }
  }
  &__button {
    margin: 20px;
    padding: 5px 15px;
    font-weight: bold;
    color: white;
    border-radius: 10px;
    text-transform: uppercase;
    border: 3px solid white;
    font-size: 18px;
    background-color: transparent;
    transition-duration: 0.4s;
    cursor: pointer;
    &:hover {
      background-color: white;
      color: rgb(86, 89, 95);
    }
    @media screen and (max-width: 640px) {
      width: 50%;
    }
    &-disabled {
      @extend .login__button;
      background-color: white;
      color: black;
      opacity: 20%;
      cursor: not-allowed;
      &:hover {
        color: black;
      }
    }
  }
  &__register {
    user-select: none;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  &__error {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
}
.spinner {
  top: inherit;
  bottom: -40%;
  @media screen and (max-width: 640px) {
    top: 95%;
    height: 50px;
    width: 50px;
  }
}
</style>