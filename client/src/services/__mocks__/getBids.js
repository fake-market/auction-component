const fakeData = {
  data: [5, 100],
};

export default async () => {
  await new Promise(resolve => {
    resolve(fakeData);
  });
};
