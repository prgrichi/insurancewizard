<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold">Versicherungsübersicht</h1>

    <div>
      <h2 class="font-semibold">Fahrrad</h2>
      <p>Preis: {{ insurance.bike.price }} €</p>
      <p>Hersteller ID: {{ insurance.bike.manufacturerId }}</p>
      <p>Model ID: {{ insurance.bike.modelId }}</p>
    </div>

    <div>
      <h2 class="font-semibold">Versicherung</h2>
      <p>Diebstahl: {{ insurance.coverage.theft ? 'Ja' : 'Nein' }}</p>
      <p>Vandalismus: {{ insurance.coverage.vandalism ? 'Ja' : 'Nein' }}</p>
    </div>

    <div>
      <h2 class="font-semibold">Persönliche Daten</h2>
      <p>{{ insurance.personal.firstName }} {{ insurance.personal.lastName }}</p>
      <p>{{ insurance.personal.email }}</p>
    </div>

    <div class="text-xl font-bold">Beitrag: {{ insurance.premium }} €</div>
  </div>

  <div class="flex justify-between mt-lg">
    <UButton
      size="lg"
      color="primary"
      variant="ghost"
      @click="prevStep"
      class="flex justify-center"
    >
      Zurück
    </UButton>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'insurance-wizard',
});
const insurance = useInsuranceStore();

const prevStep = () => {
  navigateTo('/insurance/personal');
};
</script>
