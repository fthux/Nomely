
const choose = (arr: any[]) => {
  const index = between(0, arr.length);
  return arr[index];
};

const between = (min: number, max: number) =>
  // max is not included
  min + Math.floor(Math.random() * (max - min));

export default {
  choose,
  between,
};
