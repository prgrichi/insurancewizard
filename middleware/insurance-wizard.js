export default defineNuxtRouteMiddleware(to => {
  const bikeInsurance = useBikeInsuranceStore();

  const bikeComplete =
    !!bikeInsurance.bike.manufacturerId &&
    !!bikeInsurance.bike.modelId &&
    !!bikeInsurance.bike.price;

  const personalComplete =
    !!bikeInsurance.personal.firstName &&
    !!bikeInsurance.personal.lastName &&
    !!bikeInsurance.personal.email;

  if (!bikeComplete && to.path !== '/insurance/bike') {
    return navigateTo('/insurance/bike');
  }

  if (bikeComplete && !personalComplete && to.path === '/insurance/summary') {
    return navigateTo('/insurance/personal');
  }
});
