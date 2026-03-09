<template>
  <div class="space-y-6 max-w-app">
    <h1 class="text-3xl font-bold text-text-main">Versicherungsoptionen</h1>

    <p class="text-text-main">Wähle zusätzliche Optionen nach Bedarf.</p>

    <UFormField>
      <UCheckbox v-model="bikeInsurance.coverage.theft" label="Diebstahlschutz (+5€)" />
    </UFormField>

    <UFormField>
      <UCheckbox v-model="bikeInsurance.coverage.vandalism" label="Vandalismus (+3€)" />
    </UFormField>

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
      <UButton size="lg" color="primary" @click="nextStep" class="flex justify-center">
        Weiter
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
  navigateTo('/insurance/bike/start');
};
const nextStep = () => {
  navigateTo('/insurance/bike/personal');
};
</script>
