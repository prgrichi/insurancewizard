<template>
  <div class="space-y-6 max-w-app">
    <h1 class="text-3xl font-bold text-text-main">Versicherungsschutz</h1>

    <URadioGroup
      v-model="carInsuranceStore.coverage.type"
      :ui="{
        base: 'grid grid-cols-1 md:grid-cols-3 gap-4',
      }"
      indicator="start"
      variant="card"
      size="lg"
      default-value="System"
      :items="[
        { label: 'Haftpflicht', value: 'liability' },
        { label: 'Teilkasko', value: 'partial' },
        { label: 'Vollkasko', value: 'full' },
      ]"
    />

    <USelect
      v-if="carInsuranceStore.coverage.type !== 'liability'"
      v-model="carInsuranceStore.coverage.deductibleId"
      :items="deductiblesItems"
      :placeholder="'z.B. 150 €'"
      class="w-full md:w-auto"
      :loading="lookupStore.deductibles.car.loading"
    />

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
        color="primary"
        :disabled="!isStepValid"
        @click="nextStep"
        class="flex justify-center"
      >
        Weiter
      </UButton>
    </div>
  </div>
</template>

<script setup>
// definePageMeta({
//   middleware: 'insurance-wizard',
// });
definePageMeta({
  step: 4,
  totalSteps: 7,
});

import { useCarInsuranceStore } from '~/stores/carInsurance.store';
import { useLookupStore } from '~/stores/lookup.store';

const carInsuranceStore = useCarInsuranceStore();
const lookupStore = useLookupStore();

onMounted(async () => {
  await lookupStore.fetchDeductibles();
});

const deductiblesItems = computed(() =>
  lookupStore.deductibles.car.data.map(m => ({
    label: m.label,
    value: m.id,
  }))
);

const isStepValid = computed(() => {
  const { type, deductibleId } = carInsuranceStore.coverage;

  if (type === 'liability') {
    return true;
  }

  return deductibleId !== null;
});

const prevStep = () => {
  navigateTo('/insurance/car/usage');
};
const nextStep = () => {
  navigateTo('/insurance/car/personal');
};
</script>
