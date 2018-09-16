const fakeData = {
  data: {
    id: 1,
    name: 'sampleProduct',
    condition: 'new',
    minimum: 10,
    watchers: 3,
    createdAt: '2018-06-07T12:01:10.004Z',
  },
};

export default async () =>
  new Promise(resolve => {
    resolve(fakeData);
  });
