<template>
  <div class="space-y-6 max-w-app">
    <h1 class="text-3xl font-bold text-text-main">Persönliche Daten</h1>

    <p class="text-text-main">Ihre Daten werden nur für die Berechnung verwendet.</p>

    <form @submit.prevent="onSubmit" class="space-y-6">
      <UFormField label="Vorname" :error="errors.firstName">
        <UInput v-model="firstName" class="w-full" />
      </UFormField>

      <UFormField label="Nachname" :error="errors.lastName">
        <UInput v-model="lastName" class="w-full" />
      </UFormField>

      <UFormField label="Email" :error="errors.email">
        <UInput v-model="email" class="w-full" type="email" />
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
          type="submit"
          :disabled="!isStepValid"
          color="primary"
          class="flex justify-center"
        >
          Weiter
        </UButton>
      </div>
    </form>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'insurance-wizard',
});

import { z } from 'zod';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { useInsuranceStore } from '../../stores/insurance';

const insurance = useInsuranceStore();

const schema = z.object({
  firstName: z.string().min(1, 'Vorname ist erforderlich'),
  lastName: z.string().min(1, 'Nachname ist erforderlich'),
  email: z.string().email('Bitte gültige Email eingeben'),
});

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    firstName: insurance.personal.firstName,
    lastName: insurance.personal.lastName,
    email: insurance.personal.email,
  },
  validateOnBlur: true,
  validateOnInput: false,
  validateOnChange: false,
});

const [firstName] = defineField('firstName');
const [lastName] = defineField('lastName');
const [email] = defineField('email', {
  validateOnModelUpdate: false,
});

const prevStep = () => {
  navigateTo('/insurance/coverage');
};

const isStepValid = computed(() => {
  return firstName.value && lastName.value && email.value;
});

const onSubmit = handleSubmit(values => {
  console.log(values);
  insurance.personal = values;

  navigateTo('/insurance/summary');
});
</script>
