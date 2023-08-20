const spots = [
    {
        id: 1,
        userId: 1,
        name: 'New Smyrna Beach',
        description: 'Inlet',
        location: {
            latitude: 29.06,
            longitude: -80.91,
        },
        image: 'http://10.0.0.86:9000/assets/4164bac352f61f219603e73fc9897a1e.jpg'
    },
    {
        id: 2,
        userId: 1,
        name: 'Jax Beach Pier',
        description: 'Pier',
        location: {
            latitude: 30.28,
            longitude: -81.39,
        },
        image: 'http://10.0.0.86:9000/assets/c7cf92f86d7e88faeca5a4c1b517ede2.jpg'
    },
    {
        id: 3,
        userId: 1,
        name: 'Ponce Inlet',
        description: 'Inlet',
        location: {
            latitude: 29.08,
            longitude: -80.92,
        },
        image: 'http://10.0.0.86:9000/assets/1eced50c89ea76f9a86f0a48fddaa122.jpg'
    },
];

const addSpot = (spot) => {
    spot.id = spots.length + 1;
    spots.push(spot);
};

const getSpots = () => spots;

const getSpot = (id) => spots.find((spot) => spot.id === id);

const filterSpots = (predicate) => spots.filter(predicate);

module.exports = {
  addSpot,
  getSpots,
  getSpot,
  filterSpots
};
