<template>
  <div class="max-w-app">
    <form @submit.prevent="onSubmit" class="space-y-6">
      <UFormField label="Hersteller" :error="errors.manufacturerId" class="w-full">
        <USelect
          v-model="manufacturerId"
          :items="manufacturerItems"
          placeholder="Hersteller auswählen"
          class="w-full"
        />
      </UFormField>

      <UFormField label="Modell" :error="errors.modelId" class="w-full">
        <USelect
          v-model="modelId"
          :items="modelItems"
          :loading="lookUpStore.models.car.loading"
          :placeholder="manufacturerId ? 'Modell auswählen' : 'Zuerst Hersteller wählen'"
          :disabled="!manufacturerId || modelItems.length === 0"
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

      <div class="flex justify-between mt-md">
        <UButton
          size="lg"
          color="primary"
          variant="ghost"
          @click="prevStep"
          class="flex justify-center"
        >
          Zurück
        </UButton>
        <UButton size="lg" type="submit" color="primary" class="flex justify-center">
          Weiter
        </UButton>
      </div>
    </form>
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
  manufacturerId: z.coerce.number().min(1, 'Bitte Hersteller wählen'),
  modelId: z.coerce.number().min(1, 'Bitte Modell wählen'),
  constructionYear: z.coerce
    .number()
    .min(1960, 'Das Baujahr ist zu alt.')
    .max(currentYear, 'Das Baujahr liegt in der Zukunft.'),
});

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    manufacturerId: carInsuranceStore.vehicle.manufacturerId ?? null,
    modelId: carInsuranceStore.vehicle.modelId ?? null,
    constructionYear: carInsuranceStore.vehicle.constructionYear,
  },
  validateOnBlur: true,
  validateOnInput: false,
  validateOnChange: false,
});

const [manufacturerId] = defineField('manufacturerId');
const [modelId] = defineField('modelId');
const [constructionYear, constructionYearAttrs] = defineField('constructionYear', {
  validateOnModelUpdate: false,
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
  () => manufacturerId.value,
  async id => {
    modelId.value = null;
    if (!id) return;
    await lookUpStore.fetchModels('car', id);
  }
);

const prevStep = () => {
  navigateTo('/');
};

const onSubmit = handleSubmit(values => {
  Object.assign(carInsuranceStore.vehicle, values);
  navigateTo('/insurance/car/driver');
});
</script>
