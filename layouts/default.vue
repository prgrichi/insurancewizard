<template>
  <div class="app-shell">
    <TheHeader />

    <main id="main-content" tabindex="-1" class="flex-1 pt-2xl">
      <div class="container page">
        <slot></slot>
      </div>
    </main>

    <TheFooter />
  </div>
</template>

<script setup>
import TheHeader from './TheHeader.vue';
import TheFooter from './TheFooter.vue';
</script>
