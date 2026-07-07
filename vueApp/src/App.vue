<template>
  <div style="padding: 20px">
    <nav style="display: flex; gap: 20px; margin-bottom: 20px">
      <RouterLink to="/tasks"></RouterLink>
    </nav>
    <RouterView />
  </div>
</template>

<script setup>
  import { RouterLink, RouterView } from 'vue-router'
</script>