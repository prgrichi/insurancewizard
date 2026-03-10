<template>
  <div class="space-y-6 max-w-app">
    <h1 class="text-3xl font-bold text-text-main">Versicherungsoptionen</h1>

    <UFormField label="Schadenfreiheitsklasse" class="w-full">
      <USelect
        v-model="carInsuranceStore.driver.sfClassId"
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

const { defineField, errors } = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    age: carInsuranceStore.driver.age,
  },
  validateOnBlur: true,
  validateOnInput: false,
  validateOnChange: false,
});

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

const isStepValid = computed(() => {
  return age.value;
});

const prevStep = () => {
  navigateTo('/insurance/car/start');
};
const nextStep = () => {
  navigateTo('/insurance/car/usage');
};
</script>
