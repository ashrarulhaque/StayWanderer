const axios = require('axios');

const geocode = async (location) => {
  const params = {
    address: location,
    key: process.env.GOOGLE_MAPS_API_KEY,
  };
  const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', { params });

  if (response.data.status !== 'OK') throw new Error('Failed to geocode location');

  const coords = response.data.results[0].geometry.location; // { lat, lng }
  return coords;
};

module.exports = geocode;
