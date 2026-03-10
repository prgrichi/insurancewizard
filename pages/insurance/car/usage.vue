<template>
  <div class="space-y-6 max-w-app">
    <h1 class="text-3xl font-bold text-text-main">Versicherungsoptionen</h1>

    <UFormField label="Jährliche Kilometerleistung" class="w-full">
      <USelect
        v-model="carInsuranceStore.usage.annualMileageId"
        :items="annualMileItems"
        :loading="lookUpStore.loadingSfClasses"
        placeholder="z.B. 10.000"
        class="w-full"
      />
    </UFormField>

    <UFormField label="Wo wird das Fahrzeug abgestellt?" class="w-full">
      <USelect
        v-model="carInsuranceStore.usage.parkingTypeId"
        :items="parkingTypeItems"
        :loading="lookUpStore.loadingSfClasses"
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
  step: 3,
  totalSteps: 7,
});

const prevStep = () => {
  navigateTo('/insurance/car/driver');
};
const nextStep = () => {
  navigateTo('/insurance/car/coverage');
};
// definePageMeta({
//   middleware: 'insurance-wizard',
// });
</script>
