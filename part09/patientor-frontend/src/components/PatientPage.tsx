import { useEffect, useState } from 'react';
import { Diagnosis, EntryWithoutId, Patient } from '../types';
import { useParams } from 'react-router-dom';
import patientService from '../services/patients';
import diagnosisService from '../services/diagnoses';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import MaleIcon from '@mui/icons-material/Male';
import EntryComponent from './EntryComponent';
import HealthCheckForm from './healthforms/HealthCheckForm';
import axios from 'axios';
import { Alert } from '@mui/material';

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const id = useParams().id;
  const [error, setError] = useState('');

  useEffect(() => {
    if (typeof id === 'string') {
      patientService.getOne(id).then((data) => {
        setPatient(data);
      });
    }
  }, [id]);

  useEffect(() => {
    diagnosisService.getAll().then((data) => {
      setDiagnoses(data);
    });
  }, []);

  if (!patient) {
    return <div></div>;
  }

  const submitForm = (entry: EntryWithoutId) => {
    patientService
      .addEntry(patient.id, entry)
      .then((returnedData) => {
        setPatient(returnedData);
      })
      .catch((e: unknown) => {
        if (axios.isAxiosError(e)) {
          if (e?.response?.data && typeof e?.response?.data === 'string') {
            const message = e.response.data.replace(
              'Something went wrong. Error: ',
              ''
            );
            console.error(message);
            setError(message);
          } else {
            setError('Unrecognized axios error');
          }
        } else {
          console.error('Unknown error', e);
          setError('Unknown error');
        }
        setTimeout(() => {
          setError('');
        }, 5000);
      });
  };

  return (
    <div>
      <h2>
        {patient.name}
        {
          {
            female: <FemaleIcon />,
            male: <MaleIcon />,
            other: <TransgenderIcon />,
          }[patient.gender]
        }
      </h2>
      <p>
        ssn: {patient.ssn}
        <br />
        occupation: {patient.occupation}
      </p>
      {error && <Alert severity="error">{error}</Alert>}
      <HealthCheckForm onSubmit={submitForm} />
      <h3>entries</h3>
      <div>
        {patient.entries.map((e) => (
          <EntryComponent key={e.id} entry={e} diagnoses={diagnoses} />
        ))}
      </div>
    </div>
  );
};

export default PatientPage;
