export function getManufacturers(type) {
  return $fetch(`/api/${type}/${type}-manufacturers`);
}

export function getModels(type, manufacturerId) {
  return $fetch(`/api/${type}/${type}-models`, {
    query: { manufacturerId },
  });
}

export function getSfClasses() {
  return $fetch('/api/car/sf-classes');
}

export function getAnnualMileAge() {
  return $fetch('/api/car/annual-mileage');
}

export function getParkingType() {
  return $fetch('/api/car/parking-type');
}

export function getDeductibles() {
  return $fetch('/api/car/deductibles');
}
