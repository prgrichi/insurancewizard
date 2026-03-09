<template>
  <div class="space-y-2xl">
    <!-- Hero -->
    <section class="text-center space-y-lg max-w-app mx-auto">
      <h1 class="text-3xl font-bold text-text-main">Versicherungen einfach berechnen</h1>

      <p class="text-text-main">
        Wähle deine gewünschte Versicherung, den passenden Schutz und du bekommst direkt deinen
        Beitrag.
      </p>

      <div class="inline-flex flex-col gap-md">
        <UButton size="lg" color="primary" class="justify-center" @click="startBike">
          Fahrradversicherung berechnen
        </UButton>
        <UButton size="lg" color="primary" class="justify-center" @click="startCar">
          Autoversicherung berechnen
        </UButton>
      </div>
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
const startBike = () => {
  navigateTo('/insurance/bike/start');
};
const startCar = () => {
  navigateTo('/insurance/car/start');
};
</script>
