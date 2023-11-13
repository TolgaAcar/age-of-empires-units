<template>
  <div class="welcoming-banner">
    <img v-if="imageLoaded" src="../../assets/images/banner.jpg" @error="handleImageError" />
  </div>
</template>

<script>
export default {
  name: "WelcomingBanner",
  data() {
    return {
      imageLoaded: true
    };
  },
  methods: {
    handleImageError() {
      this.imageLoaded = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.welcoming-banner {
  width: 100%;

  img {
    width: 100%;
    max-width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
  }
}
</style>
