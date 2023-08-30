import { TextField, Grid, Button } from '@mui/material';
import { useState, SyntheticEvent } from 'react';
import { EntryWithoutId } from '../types';

interface Props {
  onSubmit: (values: EntryWithoutId) => void;
  type: string;
  onCancel: () => void;
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

const HealthForm = ({ onSubmit, type, onCancel }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setRating] = useState('');
  const [diagnosisCodes, setDgCodes] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStart, setSickLeaveStart] = useState('');
  const [sickLeaveEnd, setSickLeaveEnd] = useState('');

  const createEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    let entry: any = {
      type: type,
      description,
      date,
      specialist,
    };

    if (diagnosisCodes.replace(' ', '') !== '') {
      entry = {
        ...entry,
        diagnosisCodes: parseCodes(diagnosisCodes),
      };
    }
    if (type === 'HealthCheck') {
      entry = { ...entry, healthCheckRating: toNumber(healthCheckRating) };
    } else if (type === 'Hospital') {
      entry = {
        ...entry,
        discharge: { date: dischargeDate, criteria: dischargeCriteria },
      };
    } else if (type === 'OccupationalHealthcare') {
      entry = { ...entry, employerName };
      if (sickLeaveStart !== '' && sickLeaveEnd !== '') {
        entry = {
          ...entry,
          sickLeave: { startDate: sickLeaveStart, endDate: sickLeaveEnd },
        };
      }
    }

    const newEntry: EntryWithoutId = {
      ...entry,
    };

    onSubmit(newEntry);
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
        {type === 'HealthCheck' && (
          <TextField
            label="Healthcheck rating"
            fullWidth
            value={healthCheckRating}
            onChange={({ target }) => setRating(target.value)}
          />
        )}
        {type === 'Hospital' && (
          <>
            <TextField
              label="Discharge date"
              fullWidth
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
            />
            <TextField
              label="Discharge criteria"
              fullWidth
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
            />
          </>
        )}
        {type === 'OccupationalHealthcare' && (
          <>
            <TextField
              label="Employer name"
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <TextField
              label="Sick leave start date"
              fullWidth
              value={sickLeaveStart}
              onChange={({ target }) => setSickLeaveStart(target.value)}
            />
            <TextField
              label="Sick leave end date"
              fullWidth
              value={sickLeaveEnd}
              onChange={({ target }) => setSickLeaveEnd(target.value)}
            />
          </>
        )}

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
            onClick={onCancel}
          >
            Cancel
          </Button>
        </Grid>
      </form>
    </div>
  );
};

export default HealthForm;
