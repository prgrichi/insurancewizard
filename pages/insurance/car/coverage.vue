<template>
  <div class="space-y-6 max-w-app">
    <h1 class="text-3xl font-bold text-text-main">Versicherungsschutz</h1>

    <form @submit.prevent="onSubmit" class="space-y-6">
      <UFormField label="Versicherungsschutz" :error="errors.type">
        <URadioGroup
          v-model="type"
          :ui="{
            base: 'grid grid-cols-1 md:grid-cols-3 gap-4',
          }"
          indicator="start"
          variant="card"
          size="lg"
          :items="[
            { label: 'Haftpflicht', value: 'liability' },
            { label: 'Teilkasko', value: 'partial' },
            { label: 'Vollkasko', value: 'full' },
          ]"
        />
      </UFormField>

      <UFormField
        v-if="type !== 'liability'"
        label="Selbstbeteiligung"
        :error="errors.deductibleId"
      >
        <USelect
          v-model="deductibleId"
          :items="deductiblesItems"
          placeholder="z.B. 150 €"
          class="w-full md:w-auto"
          :loading="lookupStore.deductibles.car.loading"
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
// definePageMeta({
//   middleware: 'insurance-wizard',
// });
definePageMeta({
  step: 4,
  totalSteps: 7,
});

import { z } from 'zod';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { useCarInsuranceStore } from '~/stores/carInsurance.store';
import { useLookupStore } from '~/stores/lookup.store';

const carInsuranceStore = useCarInsuranceStore();
const lookupStore = useLookupStore();

const schema = z
  .object({
    type: z.enum(['liability', 'partial', 'full']),
    deductibleId: z.coerce.number().nullable().optional(),
  })
  .refine(data => data.type === 'liability' || data.deductibleId, {
    message: 'Bitte Selbstbeteiligung wählen',
    path: ['deductibleId'],
  });

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    type: carInsuranceStore.coverage.type,
    deductibleId: carInsuranceStore.coverage.deductibleId ?? null,
  },
});

const [type] = defineField('type');
const [deductibleId] = defineField('deductibleId');

onMounted(async () => {
  await lookupStore.fetchDeductibles();
});

const deductiblesItems = computed(() =>
  lookupStore.deductibles.car.data.map(m => ({
    label: m.label,
    value: m.id,
  }))
);

watch(type, value => {
  if (value === 'liability') {
    deductibleId.value = null;
  }
});

const prevStep = () => {
  navigateTo('/insurance/car/usage');
};

const onSubmit = handleSubmit(values => {
  Object.assign(carInsuranceStore.coverage, values);
  navigateTo('/insurance/car/personal');
});
</script>
