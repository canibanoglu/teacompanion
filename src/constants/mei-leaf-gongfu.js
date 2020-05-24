const values = [
  {
    name: 'White',
    waterTemp: 85,
    amount: '3.5 - 4',
    infusions: [20, 30, 40, 50, 60],
    defaultTimeIncrement: 10,
    notes: '',
  }, {
    name: 'Green',
    waterTemp: 80,
    amount: '3 - 3.5',
    infusions: [15, 18, 21, 24, 27],
    defaultTimeIncrement: 3,
    notes: '',
  }, {
    name: 'Yellow',
    waterTemp: 85,
    amount: '3.5 - 4',
    infusions: [15, 20, 25, 30, 35],
    defaultTimeIncrement: 5,
    notes: '',
  }, {
    name: 'Oolong (strip)',
    waterTemp: 99,
    amount: '4.5 - 5',
    infusions: [20, 25, 30, 35, 40, 45, 50, 55, 60],
    defaultTimeIncrement: 5,
    notes: '',
  }, {
    name: 'Oolong (ball)',
    waterTemp: 99,
    amount: '6 - 6.5',
    infusions: [25, 30, 35, 40, 45, 50, 55, 60, 65],
    defaultTimeIncrement: 5,
    notes: '',
  }, {
    name: 'Black (small leaf)',
    waterTemp: 90,
    amount: '4.5',
    infusions: [10, 15, 20, 25, 30, 35, 40, 45],
    defaultTimeIncrement: 5,
    notes: '',
  }, {
    name: 'Black (large leaf)',
    waterTemp: 95,
    amount: '4',
    infusions: [15, 20, 25, 30, 35, 40, 45, 50],
    defaultTimeIncrement: 10,
    notes: '',
  }, {
    name: "Pu'Er (raw)",
    waterTemp: 95,
    amount: '5',
    infusions: [
      10, 13, 16, 19, 22,
      25, 28, 31, 34, 37,
      40, 43, 46, 49, 52,
    ],
    defaultTimeIncrement: 3,
    notes: '',
  }, {
    name: "Pu'Er (ripe)",
    waterTemp: 99,
    amount: '5',
    infusions: [
      10, 15, 20, 25, 30,
      35, 40, 45, 50, 55,
      60, 65, 70, 75, 80,
      85, 90, 95, 100, 105
    ],
    defaultTimeIncrement: 5,
    notes: '',
  }
];

export default values;