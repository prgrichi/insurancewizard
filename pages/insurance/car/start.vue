<template>
  <div class="space-y-6 max-w-app">
    <UFormField label="Hersteller" class="w-full">
      <USelect
        v-model="carInsuranceStore.vehicle.manufacturerId"
        :items="manufacturerItems"
        placeholder="Hersteller auswählen"
        class="w-full"
      />
    </UFormField>

    <UFormField label="Modell" class="w-full">
      <USelect
        v-model="carInsuranceStore.vehicle.modelId"
        :items="modelItems"
        :loading="lookUpStore.models.car.loading"
        :placeholder="
          carInsuranceStore.vehicle.manufacturerId ? 'Modell auswählen' : 'Zuerst Hersteller wählen'
        "
        :disabled="!carInsuranceStore.vehicle.manufacturerId || modelItems.length === 0"
        class="w-full"
      />
    </UFormField>

    <UFormField label="Baujahr" :error="errors.constructionYear">
      <UInput
        v-model="constructionYear"
        v-bind="constructionYearAttrs"
        class="w-full"
        placeholder="z.B. 2018"
        type="number"
      />
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
definePageMeta({
  step: 1,
  totalSteps: 7,
});

import { z } from 'zod';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { useCarInsuranceStore } from '~/stores/carInsurance.store';
import { useLookupStore } from '~/stores/lookup.store';

const lookUpStore = useLookupStore();
const carInsuranceStore = useCarInsuranceStore();

const currentYear = new Date().getFullYear();

const schema = z.object({
  constructionYear: z.coerce
    .number()
    .min(1960, 'Das Baujahr ist zu alt.')
    .max(currentYear, 'Das Baujahr liegt in der Zukunft.'),
});

const { defineField, errors } = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    constructionYear: carInsuranceStore.vehicle.constructionYear,
  },
  validateOnBlur: true,
  validateOnInput: false,
  validateOnChange: false,
});

const [constructionYear, constructionYearAttrs] = defineField('constructionYear', {
  validateOnModelUpdate: false,
});

watch(constructionYear, value => {
  carInsuranceStore.vehicle.constructionYear = value;
});

onMounted(async () => {
  await lookUpStore.fetchManufacturers('car');

  if (carInsuranceStore.vehicle.manufacturerId) {
    await lookUpStore.fetchModels('car', carInsuranceStore.vehicle.manufacturerId);
  }
});

const manufacturerItems = computed(() =>
  lookUpStore.manufacturers.car.data.map(m => ({
    label: m.label,
    value: m.id,
  }))
);

const modelItems = computed(() =>
  lookUpStore.models.car.data.map(m => ({
    label: m.label,
    value: m.id,
  }))
);

watch(
  () => carInsuranceStore.vehicle.manufacturerId,
  async id => {
    carInsuranceStore.vehicle.modelId = null;
    if (!id) return;
    await lookUpStore.fetchModels('car', id);
  }
);

const isStepValid = computed(() => {
  return (
    carInsuranceStore.vehicle.manufacturerId &&
    carInsuranceStore.vehicle.modelId &&
    constructionYear.value
  );
});

const prevStep = () => {
  navigateTo('/');
};
const nextStep = () => {
  navigateTo('/insurance/car/driver');
};
</script>
