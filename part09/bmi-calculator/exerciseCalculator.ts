import { containsNumbers } from "./utils"

interface exerciseValues {
    dayArray: number[],
    target: number
}


interface Result { 
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number }

const parseArguments = (args: string[]): exerciseValues => {
    if (args.length < 4) throw new Error('Not enough arguments')

    if(containsNumbers(args.slice(2))) {
        return {
            dayArray: args.slice(3).map( n => Number(n)),
            target: Number(args[2])
        }
    } else {
        throw new Error('Provided values were not numbers!')
    }
}

const calculateExercises = (dayArray: number[], target: number): Result => {
    const trainingDays = dayArray.reduce((totalDays, value) => {
        return value > 0 ? totalDays+1 : totalDays
    }, 0)

    const average = dayArray.reduce((sum, hours ) => {
        return sum + hours
    }, 0) / dayArray.length

    let rating = 3
    let ratingDescription =  'good job'
    let success = true

    if(average < target*0.8) {
        rating = 1
        ratingDescription = 'not nearly enough time'
        success = false
    }
    else if(average < target) {
        rating = 2
        ratingDescription = 'could be better'
        success = false
    }


    return {
        periodLength: dayArray.length,
        trainingDays,
        success: true,
        rating,
        ratingDescription,
        target,
        average
    }

}


try {
    const { dayArray, target } = parseArguments(process.argv)
    console.log(calculateExercises(dayArray, target))
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}