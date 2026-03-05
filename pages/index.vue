<template>
  <div class="space-y-2xl">
    <!-- Hero -->
    <section class="text-center space-y-lg max-w-app mx-auto">
      <h1 class="text-3xl font-bold text-text-main">Fahrradversicherung einfach berechnen</h1>

      <p class="text-text-main">
        Gib dein Fahrrad ein, wähle den passenden Schutz und sieh sofort deinen
        Versicherungsbeitrag.
      </p>

      <UButton size="lg" color="primary" @click="start"> Versicherung berechnen </UButton>
    </section>

    <!-- Vorteile -->
    <section class="grid-3 max-w-3xl mx-auto text-center">
      <div class="space-y-sm">
        <h3 class="font-semibold">Schnell</h3>
        <p class="text-text-main text-sm">In wenigen Schritten zum Preis.</p>
      </div>

      <div class="space-y-sm">
        <h3 class="font-semibold">Transparent</h3>
        <p class="text-text-main text-sm">Preis wird live berechnet.</p>
      </div>

      <div class="space-y-sm">
        <h3 class="font-semibold">Flexibel</h3>
        <p class="text-text-main text-sm">Optionen individuell wählen.</p>
      </div>
    </section>
  </div>
</template>

<script setup>
const start = () => {
  navigateTo('/insurance/bike');
};
</script>
