import { defineStore } from 'pinia';
import { getManufacturers, getModels, getSfClasses } from '~/services/lookup.service';

export const useLookupStore = defineStore('lookup', () => {
  const manufacturers = reactive({
    bike: [],
    car: [],
  });

  const models = reactive({
    bike: [],
    car: [],
  });

  const sfClasses = reactive({
    car: [],
  });
  const loadingSfClasses = ref(false);

  const loadingManufacturers = reactive({
    bike: false,
    car: false,
  });

  const loadingModels = reactive({
    bike: false,
    car: false,
  });

  async function fetchManufacturers(type) {
    loadingManufacturers[type] = true;
    manufacturers[type] = await getManufacturers(type);
    loadingManufacturers[type] = false;
  }

  async function fetchModels(type, manufacturerId) {
    loadingModels[type] = true;
    models[type] = await getModels(type, manufacturerId);
    loadingModels[type] = false;
  }

  async function fetchSfClasses() {
    loadingSfClasses.value = true;
    sfClasses.car = await getSfClasses();
    loadingSfClasses.value = false;
  }

  return {
    manufacturers,
    models,
    sfClasses,
    loadingManufacturers,
    loadingModels,
    loadingSfClasses,
    fetchManufacturers,
    fetchModels,
    fetchSfClasses,
  };
});
