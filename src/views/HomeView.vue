<template>
  <div class="home-page">
    <h1 class="mb-10">Home Page</h1>

    <WelcomingBanner />
  </div>
</template>

<script>
import WelcomingBanner from "../components/Welcoming/WelcomingBanner.vue";

export default {
  name: "HomeView",
  components: {
    WelcomingBanner
  }
};
</script>

<style lang="scss" scoped>
.home-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
