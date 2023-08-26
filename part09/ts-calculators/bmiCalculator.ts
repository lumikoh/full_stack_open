export const calculateBmi = (height: number, weigth: number): string => {
  const bmi = weigth / ((height * height) / 10000);
  if (bmi > 25) {
    return 'Overweight (possibly unhealthy weight)';
  }
  if (bmi < 18.5) {
    return 'Underweight (possibly unhealthy weight)';
  }
  return 'Normal (healthy weight)';
};

export default 'this is the default...';
