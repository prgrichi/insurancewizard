import { defineStore } from 'pinia';

export const useBikeInsuranceStore = defineStore('bikeInsurance', () => {
  // Step 1
  const bike = reactive({
    manufacturerId: null,
    modelId: null,
    price: 0,
  });

  // Step 2
  const coverage = reactive({
    theft: false,
    vandalism: false,
  });

  // Step 3
  const personal = reactive({
    firstName: '',
    lastName: '',
    email: '',
  });

  // Pricing
  const premium = computed(() => {
    let base = bike.price * 0.02;

    if (coverage.theft) base += 5;
    if (coverage.vandalism) base += 3;

    return base;
  });

  const reset = () => {};

  return {
    bike,
    coverage,
    personal,
    premium,
    reset,
  };
});
