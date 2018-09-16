const fakeData = {
  data: [5, 100],
};

export default async () =>
  new Promise(resolve => {
    resolve(fakeData);
  });
