<template>
  <div class="space-y-8">
    <h1 class="text-2xl font-bold">Versicherungsübersicht</h1>

    <!-- Fahrzeug -->
    <UCard>
      <template #header>
        <h2 class="font-semibold">Fahrzeug</h2>
      </template>

      <div class="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p class="text-gray-500">Hersteller</p>
          <p>
            {{
              label(lookupStore.manufacturers.car.data, carInsuranceStore.vehicle.manufacturerId)
            }}
          </p>
        </div>

        <div>
          <p class="text-gray-500">Modell</p>
          <p>
            {{ label(lookupStore.models.car.data, carInsuranceStore.vehicle.modelId) }}
          </p>
        </div>

        <div>
          <p class="text-gray-500">Baujahr</p>
          <p>{{ carInsuranceStore.vehicle.constructionYear }}</p>
        </div>
      </div>
    </UCard>

    <!-- Fahrer -->
    <UCard>
      <template #header>
        <h2 class="font-semibold">Fahrer</h2>
      </template>

      <div class="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p class="text-gray-500">Alter</p>
          <p>{{ carInsuranceStore.driver.age }}</p>
        </div>

        <div>
          <p class="text-gray-500">SF-Klasse</p>
          <p>
            {{ label(lookupStore.sfClasses.car.data, carInsuranceStore.driver.sfClassId) }}
          </p>
        </div>
      </div>
    </UCard>

    <!-- Nutzung -->
    <UCard>
      <template #header>
        <h2 class="font-semibold">Nutzung</h2>
      </template>

      <div class="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p class="text-gray-500">Fahrleistung</p>
          <p>
            {{ label(lookupStore.annualMileage.car.data, carInsuranceStore.usage.annualMileageId) }}
          </p>
        </div>

        <div>
          <p class="text-gray-500">Parken</p>
          <p>
            {{ label(lookupStore.parkingType.car.data, carInsuranceStore.usage.parkingTypeId) }}
          </p>
        </div>
      </div>
    </UCard>

    <!-- Versicherung -->
    <UCard>
      <template #header>
        <h2 class="font-semibold">Versicherungsschutz</h2>
      </template>

      <div class="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p class="text-gray-500">Deckung</p>
          <p>{{ coverageLabel }}</p>
        </div>

        <div v-if="carInsuranceStore.coverage.deductibleId">
          <p class="text-gray-500">Selbstbeteiligung</p>
          <p>
            {{ label(lookupStore.deductibles.car.data, carInsuranceStore.coverage.deductibleId) }}
          </p>
        </div>
      </div>
    </UCard>

    <!-- Persönliche Daten -->
    <UCard>
      <template #header>
        <h2 class="font-semibold">Versicherungsnehmer</h2>
      </template>

      <div class="space-y-1 text-sm">
        <p>
          {{ carInsuranceStore.personal.firstName }}
          {{ carInsuranceStore.personal.lastName }}
        </p>
        <p class="text-gray-500">
          {{ carInsuranceStore.personal.email }}
        </p>
      </div>
    </UCard>

    <!-- Preis -->
    <UCard class="bg-primary-50 border-primary-200">
      <div class="flex justify-between items-center">
        <span class="text-lg font-semibold">Monatlicher Beitrag</span>
        <span class="text-2xl font-bold"> {{ carInsuranceStore.premium }} € </span>
      </div>
    </UCard>

    <!-- Navigation -->
    <div class="flex justify-between">
      <UButton size="lg" variant="ghost" @click="prevStep"> Zurück </UButton>

      <UButton size="lg" color="primary" @click="nextStep"> Antrag abschicken </UButton>
    </div>
  </div>
</template>

<script setup>
import { useCarInsuranceStore } from '~/stores/carInsurance.store';
import { useLookupStore } from '~/stores/lookup.store';

const carInsuranceStore = useCarInsuranceStore();
const lookupStore = useLookupStore();

const coverageLabel = computed(() => {
  switch (carInsuranceStore.coverage.type) {
    case 'partial':
      return 'Teilkasko';
    case 'full':
      return 'Vollkasko';
    default:
      return 'Haftpflicht';
  }
});

const label = (list, id) => {
  return list?.find(item => item.id === id)?.label ?? '-';
};

const prevStep = () => {
  navigateTo('/insurance/car/personal');
};
const nextStep = () => {
  navigateTo('/insurance/car/success');
};
</script>
