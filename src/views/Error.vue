<template>
  <div>
    <TheError />
    <h1>Error 404</h1>
    <button @click="$router.push('/')">Go back</button>
  </div>
</template>
<script>
import TheError from "@/components/icons/TheError.vue";
export default {
  components: {
    TheError
  }
};
</script>