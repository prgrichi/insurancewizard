<template>
  <div class="space-y-6 max-w-app">
    <h1 class="text-3xl font-bold text-text-main">Versicherungsoptionen</h1>

    <form @submit.prevent="onSubmit" class="space-y-6">
      <UFormField
        label="Jährliche Kilometerleistung"
        :error="errors.annualMileageId"
        class="w-full"
      >
        <USelect
          v-model="annualMileageId"
          :items="annualMileageItems"
          :loading="lookupStore.annualMileage.car.loading"
          placeholder="z.B. 10.000"
          class="w-full"
        />
      </UFormField>

      <UFormField
        label="Wo wird das Fahrzeug abgestellt?"
        :error="errors.parkingTypeId"
        class="w-full"
      >
        <USelect
          v-model="parkingTypeId"
          :items="parkingTypeItems"
          :loading="lookupStore.parkingType.car.loading"
          placeholder="Garage"
          class="w-full"
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
        <UButton size="lg" type="submit" color="primary" class="flex justify-center">
          Weiter
        </UButton>
      </div>
    </form>
  </div>
</template>

<script setup>
definePageMeta({
  step: 3,
  totalSteps: 7,
});

import { z } from 'zod';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { useCarInsuranceStore } from '~/stores/carInsurance.store';
import { useLookupStore } from '~/stores/lookup.store';

const carInsuranceStore = useCarInsuranceStore();
const lookupStore = useLookupStore();

const schema = z.object({
  annualMileageId: z.coerce.number().min(1, 'Bitte Kilometerleistung auswählen'),

  parkingTypeId: z.coerce.number().min(1, 'Bitte Abstellort auswählen'),
});

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    annualMileageId: carInsuranceStore.usage.annualMileageId,
    parkingTypeId: carInsuranceStore.usage.parkingTypeId,
  },
});

const [annualMileageId] = defineField('annualMileageId');
const [parkingTypeId] = defineField('parkingTypeId');

onMounted(async () => {
  await lookupStore.fetchAnnualMileage();
  await lookupStore.fetchParkingType();
});

const annualMileageItems = computed(() =>
  lookupStore.annualMileage.car.data.map(m => ({
    label: m.label,
    value: m.id,
  }))
);

const parkingTypeItems = computed(() =>
  lookupStore.parkingType.car.data.map(m => ({
    label: m.label,
    value: m.id,
  }))
);

const prevStep = () => {
  navigateTo('/insurance/car/driver');
};

const onSubmit = handleSubmit(values => {
  Object.assign(carInsuranceStore.usage, values);
  navigateTo('/insurance/car/coverage');
});

// definePageMeta({
//   middleware: 'insurance-wizard',
// });
</script>
