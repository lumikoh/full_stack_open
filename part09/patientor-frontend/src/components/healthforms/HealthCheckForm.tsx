import { TextField, Grid, Button } from '@mui/material';
import { useState, SyntheticEvent } from 'react';
import { EntryWithoutId } from '../../types';

interface Props {
  onSubmit: (values: EntryWithoutId) => void;
}

const parseCodes = (codes: string): string[] => {
  return codes.replace(' ', '').split(',');
};

const toNumber = (rating: string): number => {
  try {
    return Number(rating);
  } catch (error) {
    console.log(error);
    return -1;
  }
};

const HealthCheckForm = ({ onSubmit }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setRating] = useState('');
  const [diagnosisCodes, setDgCodes] = useState('');

  const createEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    let newEntry: EntryWithoutId = {
      type: 'HealthCheck',
      description,
      date,
      specialist,
      healthCheckRating: toNumber(healthCheckRating),
    };

    if (diagnosisCodes.replace(' ', '') !== '') {
      newEntry = {
        ...newEntry,
        diagnosisCodes: parseCodes(diagnosisCodes),
      };
    }
    onSubmit(newEntry);

    setDescription('');
    setDate('');
    setSpecialist('');
    setRating('');
    setDgCodes('');
  };

  return (
    <div
      style={{
        border: 'dashed 2px grey',
        borderRadius: '5px',
        padding: '10px',
        margin: '20px 0px',
      }}
    >
      <h3>New HealthCheck entry</h3>
      <form onSubmit={createEntry}>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Date"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label="Healthcheck rating"
          fullWidth
          value={healthCheckRating}
          onChange={({ target }) => setRating(target.value)}
        />
        <TextField
          label="Diagnosis codes"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDgCodes(target.value)}
        />
        <Grid style={{ marginTop: '10px' }}>
          <Button type="submit" variant="contained">
            Add
          </Button>
          <Button
            color="secondary"
            variant="contained"
            type="button"
            style={{ marginLeft: '10px' }}
          >
            Cancel
          </Button>
        </Grid>
      </form>
    </div>
  );
};

export default HealthCheckForm;
