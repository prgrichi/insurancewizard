// import manufacturers from '../../data/bike/manufacturers.json';
import manufacturers from '~/server/data/bike/manufacturers.json';

export default defineEventHandler(() => {
  return manufacturers;
});
