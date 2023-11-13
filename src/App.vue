<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <nav class="mb-5">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/units">Units</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
nav {
  display: flex;
  justify-content: flex-end;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
