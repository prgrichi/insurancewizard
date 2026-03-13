<template>
  <div class="space-y-6 max-w-app">
    <h1 class="text-3xl font-bold text-text-main">Angaben zum Fahrer</h1>

    <form @submit.prevent="onSubmit" class="space-y-6">
      <UFormField label="Schadenfreiheitsklasse" :error="errors.sfClassId" class="w-full">
        <USelect
          v-model="sfClassId"
          :items="sfClassesItems"
          :loading="lookUpStore.sfClasses.car.loading"
          placeholder="SF Klasse auswählen"
          class="w-full"
        />
      </UFormField>

      <UFormField label="Alter" :error="errors.age">
        <UInput v-model="age" v-bind="ageAttrs" class="w-full" type="number" />
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
        <UButton size="lg" color="primary" type="submit" class="flex justify-center">
          Weiter
        </UButton>
      </div>
    </form>
  </div>
</template>

<script setup>
definePageMeta({
  step: 2,
  totalSteps: 7,
});

import { z } from 'zod';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { useCarInsuranceStore } from '~/stores/carInsurance.store';
import { useLookupStore } from '~/stores/lookUp.store';

const carInsuranceStore = useCarInsuranceStore();
const lookUpStore = useLookupStore();

const schema = z.object({
  sfClassId: z.coerce.number().min(1, 'Bitte eine SF-Klasse auswählen'),
  age: z.preprocess(
    v => (v === '' ? undefined : v),
    z.coerce
      .number({
        required_error: 'Bitte ein Alter eingeben',
        invalid_type_error: 'Bitte eine gültige Zahl eingeben',
      })
      .int('Bitte eine ganze Zahl eingeben')
      .min(18, 'Du musst mindestens 18 Jahre alt sein')
      .max(120, 'Alter darf maximal 120 sein')
  ),
});

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    sfClassId: carInsuranceStore.driver.sfClassId,
    age: carInsuranceStore.driver.age,
  },
  validateOnBlur: true,
  validateOnInput: false,
  validateOnChange: false,
});

const [sfClassId] = defineField('sfClassId');
const [age, ageAttrs] = defineField('age', {
  validateOnModelUpdate: false,
});

onMounted(async () => {
  await lookUpStore.fetchSfClasses();
});

const sfClassesItems = computed(() =>
  lookUpStore.sfClasses.car.data.map(m => ({
    label: m.label,
    value: m.id,
  }))
);

const prevStep = () => {
  navigateTo('/insurance/car/start');
};

const onSubmit = handleSubmit(values => {
  Object.assign(carInsuranceStore.driver, values);
  navigateTo('/insurance/car/usage');
});
</script>
