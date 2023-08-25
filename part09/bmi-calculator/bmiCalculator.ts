import { containsNumbers } from "./utils"

interface BmiValues {
    heigth: number,
    weight: number
}

const parseArguments = (args: string[]): BmiValues => {
    if (args.length > 4) throw new Error('Too many arguments')
    if (args.length < 4) throw new Error('Not enough arguments')

    if(containsNumbers(args.slice(2))) {
        return {
            heigth: Number(args[2]),
            weight: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!')
    }
}

const calculateBmi = (heigth: number, weight: number) : string => {
    const bmi = weight / (heigth*heigth/10000)
    if(bmi > 25) {
        return 'Overweight (possibly unhealthy weight)'
    }
    if(bmi < 18.5) {
        return 'Underweight (possibly unhealthy weight)'
    }
    return 'Normal (healthy weight)'
}

try {
    const { heigth, weight } = parseArguments(process.argv)
    console.log(calculateBmi(heigth, weight))
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
