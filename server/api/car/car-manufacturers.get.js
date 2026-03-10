import manufacturers from '~/server/data/car/manufacturers.json';
// import models from '~/server/data/bike/models.json';

export default defineEventHandler(() => {
  return manufacturers;
});
