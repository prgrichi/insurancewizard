<template>
  <div class="space-y-6 max-w-app">
    <h1 class="text-3xl font-bold text-text-main">Persönliche Daten</h1>

    <p class="text-text-main">Ihre Daten werden nur für die Berechnung verwendet.</p>
  </div>
</template>

<script setup>
// definePageMeta({
//   middleware: 'insurance-wizard',
// });
definePageMeta({
  step: 5,
  totalSteps: 7,
});
</script>
