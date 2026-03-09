export function getManufacturers(type) {
  return $fetch(`/api/${type}-manufacturers`);
}

export function getModels(type, manufacturerId) {
  return $fetch(`/api/${type}-models`, {
    query: { manufacturerId },
  });
}
