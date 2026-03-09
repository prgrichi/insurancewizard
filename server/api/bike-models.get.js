import models from '../data/bike/models.json';

export default defineEventHandler(event => {
  const { manufacturerId } = getQuery(event);

  return models.filter(m => m.manufacturerId === Number(manufacturerId));
});
