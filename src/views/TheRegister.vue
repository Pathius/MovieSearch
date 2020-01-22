<template>
  <form class="login" @submit="!$v.$invalid ? register() : ''">
    <h2 class="login__title">Join us!</h2>
    <BaseInput :placeholder="'Email'" :valid="isEmailValid" :type="'text'" v-model.trim="email" />
    <BaseInput
      :placeholder="'Password'"
      :valid="isPasswordValid"
      :type="'password'"
      v-model.trim="password"
    />
    <BaseInput
      :placeholder="'Repeat Password'"
      :valid="isRepeatPasswordValid"
      :type="'password'"
      v-model.trim="repeatPassword"
    />
    <button
      class="login__button"
      :class="$v.$invalid || loading ? 'login__button-disabled' : 'login__button'"
      :disabled="$v.$invalid || loading"
      @click="register"
    >Register</button>
    <LoadingSpinner class="login__loading" v-if="loading" />
    <AuthError class="login__error" v-if="error">This email is already used!</AuthError>
  </form>
</template>
<script>
import BaseInput from "@/components/BaseInput.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import AuthError from "@/components/AuthError.vue";
import { required, minLength, sameAs, email } from "vuelidate/lib/validators";
export default {
  components: {
    LoadingSpinner,
    AuthError,
    BaseInput
  },
  data: () => ({
    emailPlaceholder: "Email",
    passwordPlaceholder: "Password",
    repeatPasswordPlaceholder: "Repeat password",
    email: "",
    password: "",
    repeatPassword: ""
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
    },
    repeatPassword: {
      required,
      minLength: minLength(8),
      sameAsPassword: sameAs("password")
    }
  },
  methods: {
    register(payload) {
      payload = {
        email: this.email,
        password: this.password,
        returnSecureToken: true
      };
      this.$store.dispatch("auth/register", payload);
    }
  },
  computed: {
    loading() {
      return this.$store.state.auth.registerIsLoading;
    },
    error() {
      return this.$store.state.auth.registerError;
    },
    isEmailValid() {
      return this.$v.email.email && this.$v.email.minLength;
    },
    isPasswordValid() {
      return this.$v.password.minLength;
    },
    isRepeatPasswordValid() {
      return (
        this.$v.repeatPassword.minLength &&
        this.$v.repeatPassword.sameAsPassword
      );
    }
  },
  created() {
    this.$store.state.auth.registerError = false;
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
  @media screen and (max-width: 640px) {
    width: 100vw;
    margin-top: 50px;
    box-sizing: border-box;
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
      font-size: 60px;
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
  &__checkbox {
    margin-top: 10px;
    width: 100%;
    &-box {
      background-color: red;
    }
  }
  &__icon {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    right: 18%;
  }
  &__button {
    margin: 40px;
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
      color: rgb(51, 51, 51);
      background-color: $button-disabled;
      border-color: $button-disabled;
      cursor: not-allowed;
      &:hover {
        color: rgb(51, 51, 51);
        background-color: $button-disabled;
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
  top: 100%;
  @media screen and (max-width: 640px) {
    top: 95%;
    height: 50px;
    width: 50px;
  }
}
</style>