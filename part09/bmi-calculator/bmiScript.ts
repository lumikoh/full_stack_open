import { calculateBmi } from './bmiCalculator';
import { containsNumbers } from './utils';

interface BmiValues {
  height: number;
  weigth: number;
}

const parseArguments = (args: string[]): BmiValues => {
  if (args.length > 4) throw new Error('Too many arguments');
  if (args.length < 4) throw new Error('Not enough arguments');

  if (containsNumbers(args.slice(2))) {
    return {
      height: Number(args[2]),
      weigth: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

try {
  const { height, weigth } = parseArguments(process.argv);
  console.log(calculateBmi(height, weigth));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
