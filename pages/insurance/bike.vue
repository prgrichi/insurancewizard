<template>
  <div class="space-y-6 max-w-app">
    <UFormField label="Hersteller" class="w-full">
      <USelect
        v-model="insurance.bike.manufacturerId"
        :items="manufacturerItems"
        placeholder="Hersteller auswählen"
        class="w-full"
      />
    </UFormField>

    <UFormField label="Modell" class="w-full">
      <USelect
        v-model="insurance.bike.modelId"
        :items="modelItems"
        placeholder="Modell auswählen"
        :disabled="!insurance.bike.manufacturerId"
        class="w-full"
      />
    </UFormField>

    <UFormField label="Kaufpreis (€)" class="w-full">
      <UInput type="number" v-model="insurance.bike.price" placeholder="z.B. 1800" class="w-full" />
    </UFormField>

    <UButton
      size="lg"
      :disabled="!isStepValid"
      color="primary"
      @click="nextStep"
      class="w-full flex justify-center"
    >
      Weiter
    </UButton>
  </div>
</template>

<script setup>
import { manufacturers, models } from '~/data/bikes';
import { useInsuranceStore } from '../../stores/insurance';

const insurance = useInsuranceStore();

const manufacturerItems = manufacturers.map(m => ({
  label: m.name,
  value: m.id,
}));

const modelItems = computed(() =>
  models
    .filter(m => m.manufacturerId === insurance.bike.manufacturerId)
    .map(m => ({
      label: m.name,
      value: m.id,
    }))
);

watch(
  () => insurance.bike.manufacturerId,
  () => {
    insurance.bike.modelId = null;
  }
);

const isStepValid = computed(() => {
  return insurance.bike.manufacturerId && insurance.bike.modelId && insurance.bike.price > 0;
});

const nextStep = () => {
  console.log(insurance.bike);
  navigateTo('/insurance/coverage');
};
</script>
