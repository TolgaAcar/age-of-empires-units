<template>
  <div class="not-found">
    <h1 class="my-10">404 - Not Found</h1>
    <h2 class="mb-10">The page you are looking for does not exist.</h2>

    <v-btn variant="flat" color="#e81932" @click="returnHome"> Go to Home</v-btn>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  methods: {
    returnHome() {
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
