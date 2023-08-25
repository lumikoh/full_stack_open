

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

console.log(calculateBmi(180, 74))