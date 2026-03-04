<template>
  <UInput
    v-model="value"
    icon="i-lucide-search"
    class="w-full"
    size="md"
    placeholder="Search..."
    type="text"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('');
</script>
