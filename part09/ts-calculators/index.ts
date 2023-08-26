import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import { containsNumbers } from './utils';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const weigth = Number(req.query.weigth);
  const height = Number(req.query.height);

  if (isNaN(weigth) || isNaN(height)) {
    return res.status(400).send({ error: 'malformatted parameters' });
  }
  try {
    return res.send({ ...req.query, bmi: calculateBmi(height, weigth) });
  } catch (error) {
    return res.status(400).send({ error: 'malformatted parameters' });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).send({ error: 'parameters missing' });
  }

  if (!Array.isArray(daily_exercises) || isNaN(Number(target))) {
    return res.status(400).send({ error: 'malformatted parameters' });
  }

  if (!containsNumbers(daily_exercises as string[])) {
    return res.status(400).send({ error: 'malformatted parameters' });
  }

  const result = calculateExercises(
    daily_exercises.map((n) => Number(n)),
    Number(target)
  );

  return res.send({ ...result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
