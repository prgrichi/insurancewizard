<template>
  <div class="space-y-6 max-w-app">
    <h1 class="text-3xl font-bold text-text-main">Versicherungsoptionen</h1>

    <p class="text-text-main">Wähle zusätzliche Optionen nach Bedarf.</p>
  </div>
</template>

<script setup>
definePageMeta({
  step: 3,
  totalSteps: 7,
});
// definePageMeta({
//   middleware: 'insurance-wizard',
// });
</script>
