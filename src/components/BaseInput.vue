<template>
  <div class="form">
    <input
      :type="type"
      :class="!value.length ?
       'form__input' :
        valid ? 'form__input-correct' :
        'form__input-incorrect'"
      @focus="inputPlaceholder = ''"
      @blur="inputPlaceholder = placeholder"
      :placeholder="inputPlaceholder"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
    <CorrectIcon v-if="valid && value.length" class="form__icon" />
    <WrongIcon v-else-if="value.length" class="form__icon" />
  </div>
</template>
<script>
import CorrectIcon from "./icons/CorrectIcon.vue";
import WrongIcon from "./icons/WrongIcon.vue";
export default {
  components: {
    CorrectIcon,
    WrongIcon
  },
  data() {
    return {
      inputPlaceholder: this.placeholder
    };
  },
  props: {
    placeholder: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    valid: {
      type: Boolean,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  }
};
</script>
<style scoped lang="scss">
@import "../scss/variables";
.form {
  position: relative;
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
    &-correct {
      @extend .form__input;
      border: 1px solid green;
    }
    &-incorrect {
      @extend .form__input;
      border: 1px solid red;
    }
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
}
</style>