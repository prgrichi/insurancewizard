import { defineStore } from 'pinia';
import { calculateCarPremium } from '~/utils/carPremium';
import { useLookupStore } from './lookup.store';

export const useCarInsuranceStore = defineStore('carInsurance', () => {
  // Step 1 – Vehicle
  const vehicle = reactive({
    manufacturerId: null,
    modelId: null,
    constructionYear: null,
  });

  // Step 2 – Driver
  const driver = reactive({
    age: null,
    sfClassId: null,
  });

  // Step 3 – Usage
  const usage = reactive({
    annualMileageId: null,
    parkingTypeId: null,
  });

  // Step 4 – Coverage
  const coverage = reactive({
    type: 'liability', // liability | partial | full
    deductibleId: null,
  });

  // Step 5 – Personal
  const personal = reactive({
    firstName: '',
    lastName: '',
    email: '',
  });

  const lookupStore = useLookupStore();

  // Pricing (demo calculation)
  const premium = computed(() =>
    calculateCarPremium({ vehicle, driver, usage, coverage }, lookupStore.sfClasses.car.data)
  );

  function reset() {
    vehicle.manufacturerId = null;
    vehicle.modelId = null;
    vehicle.constructionYear = null;

    driver.age = null;
    driver.sfClassId = null;

    usage.annualMileageId = null;
    usage.parkingTypeId = null;

    coverage.type = 'liability';
    coverage.deductibleId = null;

    personal.firstName = '';
    personal.lastName = '';
    personal.email = '';
  }

  return {
    vehicle,
    driver,
    usage,
    coverage,
    personal,
    premium,
    reset,
  };
});
