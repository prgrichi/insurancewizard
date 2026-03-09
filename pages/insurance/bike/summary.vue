<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold">Versicherungsübersicht</h1>

    <div>
      <h2 class="font-semibold">Fahrrad</h2>
      <p>Preis: {{ bikeInsurance.bike.price }} €</p>
      <p>Hersteller ID: {{ bikeInsurance.bike.manufacturerId }}</p>
      <p>Model ID: {{ bikeInsurance.bike.modelId }}</p>
    </div>

    <div>
      <h2 class="font-semibold">Versicherung</h2>
      <p>Diebstahl: {{ bikeInsurance.coverage.theft ? 'Ja' : 'Nein' }}</p>
      <p>Vandalismus: {{ bikeInsurance.coverage.vandalism ? 'Ja' : 'Nein' }}</p>
    </div>

    <div>
      <h2 class="font-semibold">Persönliche Daten</h2>
      <p>{{ bikeInsurance.personal.firstName }} {{ bikeInsurance.personal.lastName }}</p>
      <p>{{ bikeInsurance.personal.email }}</p>
    </div>

    <div class="text-xl font-bold">Beitrag: {{ bikeInsurance.premium }} €</div>

    <div class="flex justify-between">
      <UButton
        size="lg"
        color="primary"
        variant="ghost"
        @click="prevStep"
        class="flex justify-center"
      >
        Zurück
      </UButton>
      <UButton
        size="lg"
        type="submit"
        @click="nextStep"
        color="primary"
        class="flex justify-center"
      >
        Antrag abschicken
      </UButton>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'insurance-wizard',
});

import { useBikeInsuranceStore } from '../../../stores/bikeInsurance.store';

const bikeInsurance = useBikeInsuranceStore();

const prevStep = () => {
  navigateTo('/insurance/bike/personal');
};
const nextStep = () => {
  navigateTo('/insurance/bike/success');
};
</script>
