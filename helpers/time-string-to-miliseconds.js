// every second(1) === 1000 in ms

const MILISECONDS = [
  60000, // minutes
  60000 * 60, // hours
  60000 * 60 * 24, // day
  60000 * 60 * 24 * 7, // week
];

export const timeStringToMiliseconds = (time) => {
  // example time string "(minutes)-(hours)-(days)-(weeks)"
  const separatedString = time.split("-");
  const result = separatedString.reduce(
    (accumulator, current, index) =>
      (accumulator += Number(current) * MILISECONDS[index]),
    0,
  );

  return Number(result);
};
