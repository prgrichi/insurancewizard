import { defineStore } from 'pinia';
import {
  getManufacturers,
  getModels,
  getSfClasses,
  getAnnualMileAge,
  getParkingType,
  getDeductibles,
} from '~/services/lookup.service';

function createLookup() {
  return reactive({
    data: [],
    loading: false,
    error: null,
  });
}

export const useLookupStore = defineStore('lookup', () => {
  const manufacturers = {
    bike: createLookup(),
    car: createLookup(),
  };

  const models = {
    bike: createLookup(),
    car: createLookup(),
  };

  const sfClasses = {
    car: createLookup(),
  };

  const annualMileage = {
    car: createLookup(),
  };

  const parkingType = {
    car: createLookup(),
  };

  const deductibles = {
    car: createLookup(),
  };

  async function fetchManufacturers(type) {
    const target = manufacturers[type];

    try {
      target.loading = true;
      target.error = null;

      target.data = await getManufacturers(type);
    } catch (error) {
      target.error = error;
      console.error(error);
      target.data = [];
    } finally {
      target.loading = false;
    }
  }

  async function fetchModels(type, manufacturerId) {
    const target = models[type];

    try {
      target.loading = true;
      target.error = null;

      target.data = await getModels(type, manufacturerId);
    } catch (error) {
      target.error = error;
      console.error(error);
      target.data = [];
    } finally {
      target.loading = false;
    }
  }

  async function fetchSfClasses() {
    const target = sfClasses.car;

    try {
      target.loading = true;
      target.error = null;

      target.data = await getSfClasses();
    } catch (error) {
      target.error = error;
      console.error(error);
      target.data = [];
    } finally {
      target.loading = false;
    }
  }

  async function fetchAnnualMileage() {
    const target = annualMileage.car;

    try {
      target.loading = true;
      target.error = null;

      target.data = await getAnnualMileAge();
    } catch (error) {
      target.error = error;
      console.error(error);
      target.data = [];
    } finally {
      target.loading = false;
    }
  }

  async function fetchParkingType() {
    const target = parkingType.car;

    try {
      target.loading = true;
      target.error = null;

      target.data = await getParkingType();
    } catch (error) {
      target.error = error;
      console.error(error);
      target.data = [];
    } finally {
      target.loading = false;
    }
  }

  async function fetchDeductibles() {
    const target = deductibles.car;

    try {
      target.loading = true;
      target.error = null;

      target.data = await getDeductibles();
    } catch (error) {
      target.error = error;
      console.error(error);
      target.data = [];
    } finally {
      target.loading = false;
    }
  }

  return {
    manufacturers,
    models,
    sfClasses,
    annualMileage,
    parkingType,
    deductibles,
    fetchManufacturers,
    fetchModels,
    fetchSfClasses,
    fetchAnnualMileage,
    fetchParkingType,
    fetchDeductibles,
  };
});
