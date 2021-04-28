export const colorLabels = (constructorRef, year) => {
  let background = `${constructorRef} y-${year}`;

  return background;
};

export const colorHtHSelect = (driverId, drivers, year) => {
  const { constructorRef } = drivers.find((driver) => driver.driverId === driverId);

  let background = `${constructorRef} y-${year}`;

  if (year > 2013) return background;
};
