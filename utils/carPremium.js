export function calculateCarPremium(data, sfClasses) {
  let base = 500;
  console.log(data);

  if (data.coverage.type === 'partial') base += 120;
  if (data.coverage.type === 'full') base += 250;

  if (data.driver.age && data.driver.age < 25) {
    base += 200;
  }

  if (data.usage.parkingTypeId === 4) {
    base -= 50;
  }

  const sfClass = sfClasses.find(sf => sf.id === data.driver.sfClassId);
  const factor = sfClass?.factor ?? 1;

  return Math.round(base * factor);
}
