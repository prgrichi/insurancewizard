<template>
  <div class="space-y-6 max-w-app">
    <UFormField label="Hersteller" class="w-full">
      <USelect
        v-model="bikeInsurance.bike.manufacturerId"
        :items="manufacturerItems"
        placeholder="Hersteller auswählen"
        class="w-full"
      />
    </UFormField>

    <UFormField label="Modell" class="w-full">
      <USelect
        v-model="bikeInsurance.bike.modelId"
        :items="modelItems"
        placeholder="Modell auswählen"
        :disabled="!bikeInsurance.bike.manufacturerId || modelItems.length === 0"
        class="w-full"
      />
    </UFormField>

    <UFormField label="Kaufpreis (€)" class="w-full">
      <UInput
        type="number"
        v-model="bikeInsurance.bike.price"
        placeholder="z.B. 1800"
        class="w-full"
      />
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
import { useBikeInsuranceStore } from '../../../stores/bikeInsurance.store';
import { useLookupStore } from '~/stores/lookup.store';

const lookUpStore = useLookupStore();
const bikeInsurance = useBikeInsuranceStore();

onMounted(() => {
  lookUpStore.fetchManufacturers('bike');
});

const manufacturerItems = computed(() =>
  lookUpStore.manufacturers.bike.map(m => ({
    label: m.name,
    value: m.id,
  }))
);

watch(
  () => bikeInsurance.bike.manufacturerId,
  id => {
    if (!id) return;
    lookUpStore.fetchModels('bike', id);
  }
);

const modelItems = computed(() =>
  lookUpStore.models.bike.map(m => ({
    label: m.name,
    value: m.id,
  }))
);

watch(
  () => bikeInsurance.bike.manufacturerId,
  () => {
    bikeInsurance.bike.modelId = null;
  }
);

const isStepValid = computed(() => {
  return (
    bikeInsurance.bike.manufacturerId && bikeInsurance.bike.modelId && bikeInsurance.bike.price > 0
  );
});

const nextStep = () => {
  navigateTo('/insurance/bike/coverage');
};
</script>
