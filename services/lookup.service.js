export function getManufacturers(type) {
  return $fetch(`/api/${type}/${type}-manufacturers`);
}

export function getModels(type, manufacturerId) {
  return $fetch(`/api/${type}/${type}-models`, {
    query: { manufacturerId },
  });
}

export function getSfClasses() {
  return $fetch('/api/sf-classes');
}
