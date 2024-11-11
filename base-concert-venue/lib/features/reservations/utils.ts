export function generateRandomId(): number {
  // limit the line below so that it can only generate random numbers from 3 upwards

  // return Math.floor(Math.random() * 100000000);
  // this ensures that the minium number generated is 3
  // because our data already has the values 0, 1, and 2
  // and if the id is one of those
  // it will give us a false positive in our test where we test if we can
  // navigate to a band that is created after the server is started
  const min = 3;
  const max = 100000000;
  return Math.floor(Math.random() * (max - min + 1) + min);
}
