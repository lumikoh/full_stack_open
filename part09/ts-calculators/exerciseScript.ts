import { containsNumbers } from './utils';
import { calculateExercises } from './exerciseCalculator';

interface exerciseValues {
  dayArray: number[];
  target: number;
}

const parseArguments = (args: string[]): exerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  if (containsNumbers(args.slice(2))) {
    return {
      dayArray: args.slice(3).map((n) => Number(n)),
      target: Number(args[2]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

try {
  const { dayArray, target } = parseArguments(process.argv);
  console.log(calculateExercises(dayArray, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
