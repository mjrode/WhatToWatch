const dogs = [
  {
    id: 1,
    name: 'Corgi',
    origin: 'Wales',
    breeds: ['Pembroke', 'Cardigan'],
  },
  {
    id: 2,
    name: 'Husky',
    breeds: ['Alaskan', 'Siberian', 'Labrador', 'Sakhalin'],
  },
];

const getUsers = (req, res) => {
  res.json(dogs);
};

export default {
  getUsers,
};
