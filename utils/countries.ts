import countries from 'world-countries';

// Helper function: format api response names
export const formattedCountries = countries.map((item) => ({
  code: item.cca2,
  name: item.name.common,
  flag: item.flag,
  location: item.latlng,
  region: item.region,
}));

// Helper function: find country by code
export const findCountryByCode = (code: string) =>
  formattedCountries.find((item) => item.code === code);