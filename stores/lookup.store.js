import { defineStore } from 'pinia';
import { getManufacturers } from '~/services/bike.service';
import { getModels } from '~/services/bike.service';

export const useLookupStore = defineStore('lookup', () => {
  const manufacturers = ref([]);
  const models = ref([]);

  async function fetchManufacturers() {
    manufacturers.value = await getManufacturers();
  }

  async function fetchModels(id) {
    models.value = await getModels(id);
  }

  return {
    manufacturers,
    models,
    fetchManufacturers,
    fetchModels,
  };
});
