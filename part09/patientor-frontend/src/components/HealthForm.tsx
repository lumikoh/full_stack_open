import {
  TextField,
  Grid,
  Button,
  Input,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
} from '@mui/material';
import { useState, SyntheticEvent } from 'react';
import { Diagnosis, EntryWithoutId, HealthCheckRating } from '../types';

interface Props {
  onSubmit: (values: EntryWithoutId) => void;
  type: string;
  onCancel: () => void;
  diagnoses: Diagnosis[];
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

const DateInput: React.FC<{
  value: string;
  label: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}> = ({ value, label, setValue }) => {
  return (
    <div
      style={{
        border: '1px solid lightgrey',
        borderRadius: '5px',
        padding: '6px 10px',
      }}
    >
      <InputLabel>{label}</InputLabel>
      <Input
        type="date"
        fullWidth
        value={value}
        onChange={({ target }) => setValue(target.value)}
      />
    </div>
  );
};

const DiagnosisSelect: React.FC<{
  diagnoses: Diagnosis[];
  addDiagnosis: (dg: string) => void;
  dgCodes: string;
}> = ({ diagnoses, addDiagnosis, dgCodes }) => {
  const [text, setText] = useState('');

  return (
    <>
      <FormControl fullWidth>
        <InputLabel>Select diagnoses...</InputLabel>
        <Select
          value={text}
          label="Select diagnoses..."
          onChange={({ target }) => {
            setText(target.value);
            addDiagnosis(target.value);
          }}
        >
          {diagnoses.map((d) => (
            <MenuItem key={d.code} value={d.code}>
              {d.code}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <InputLabel style={{ padding: '5px 0px' }}>
        Selected: {dgCodes}
      </InputLabel>
    </>
  );
};

const HealthCheckSelect: React.FC<{
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}> = ({ value, setValue }) => {
  return (
    <FormControl fullWidth>
      <InputLabel>Select health rating...</InputLabel>
      <Select
        value={value}
        label="Select health rating..."
        onChange={({ target }) => setValue(target.value)}
      >
        {Object.keys(HealthCheckRating).map(
          (h) =>
            h.length < 3 && (
              <MenuItem key={h} value={h}>
                {HealthCheckRating[Number(h)]}
              </MenuItem>
            )
        )}
      </Select>
    </FormControl>
  );
};

const HealthForm = ({ onSubmit, type, onCancel, diagnoses }: Props) => {
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

  const addDg = (dg: string) => {
    const separator = diagnosisCodes === '' ? '' : ', ';
    setDgCodes(diagnosisCodes + separator + dg);
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
      <h3>New {type} entry</h3>
      <form onSubmit={createEntry}>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <DateInput value={date} setValue={setDate} label="Date" />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        {type === 'HealthCheck' && (
          <HealthCheckSelect value={healthCheckRating} setValue={setRating} />
        )}
        {type === 'Hospital' && (
          <>
            <DateInput
              value={dischargeDate}
              setValue={setDischargeDate}
              label="Discharge date"
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
            <DateInput
              value={sickLeaveStart}
              setValue={setSickLeaveStart}
              label="Sick leave start date"
            />
            <DateInput
              value={sickLeaveEnd}
              setValue={setSickLeaveEnd}
              label="Sick leave end date"
            />
          </>
        )}
        <DiagnosisSelect
          diagnoses={diagnoses}
          addDiagnosis={addDg}
          dgCodes={diagnosisCodes}
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
