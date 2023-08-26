interface exerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  dayArray: number[],
  target: number
): exerciseResult => {
  const trainingDays = dayArray.reduce((totalDays, value) => {
    return value > 0 ? totalDays + 1 : totalDays;
  }, 0);

  const average =
    dayArray.reduce((sum, hours) => {
      return sum + hours;
    }, 0) / dayArray.length;

  let rating = 3;
  let ratingDescription = 'good job';
  let success = true;

  if (average < target * 0.8) {
    rating = 1;
    ratingDescription = 'not nearly enough time';
    success = false;
  } else if (average < target) {
    rating = 2;
    ratingDescription = 'could be better';
    success = false;
  }

  return {
    periodLength: dayArray.length,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};
