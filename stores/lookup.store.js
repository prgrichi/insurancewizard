import { defineStore } from 'pinia';
import { getManufacturers } from '~/services/bike.service';
import { getModels } from '~/services/bike.service';

export const useLookupStore = defineStore('lookup', () => {
  const manufacturers = ref([]);
  const models = ref([]);

  async function fetchManufacturers(type) {
    manufacturers.value = await getManufacturers(type);
  }

  async function fetchModels(type, id) {
    models.value = await getModels(type, id);
  }

  return {
    manufacturers,
    models,
    fetchManufacturers,
    fetchModels,
  };
});
