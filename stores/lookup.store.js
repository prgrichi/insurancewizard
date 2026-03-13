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
    target.loading = true;
    target.data = await getManufacturers(type);
    target.loading = false;
  }

  async function fetchModels(type, manufacturerId) {
    const target = models[type];
    target.loading = true;
    target.data = await getModels(type, manufacturerId);
    target.loading = false;
  }

  async function fetchSfClasses() {
    const target = sfClasses.car;
    target.loading = true;
    target.data = await getSfClasses();
    target.loading = false;
  }

  async function fetchAnnualMileage() {
    const target = annualMileage.car;
    target.loading = true;
    target.data = await getAnnualMileAge();
    target.loading = false;
  }

  async function fetchParkingType() {
    const target = parkingType.car;
    target.loading = true;
    target.data = await getParkingType();
    target.loading = false;
  }

  async function fetchDeductibles() {
    const target = deductibles.car;
    target.loading = true;
    target.data = await getDeductibles();
    target.loading = false;
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
