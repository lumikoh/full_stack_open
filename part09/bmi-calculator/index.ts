import express from "express";
import { calculateBmi } from "./bmiCalculator";
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {

  const weigth = Number(req.query.weigth)
  const height = Number(req.query.height)
  if(isNaN(weigth) || isNaN(height)) {
    res.status(400).send({error: "malformatted parameters"})
  }
    try {
      res.send({...req.query, bmi: calculateBmi(height, weigth)
      })
    } catch (error) {
      res.status(400).send({error: "malformatted parameters"})
    }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});