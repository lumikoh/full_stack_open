import { v1 as uuid } from 'uuid';

import patientData from '../../data/patients';
import { NewPatient, NonSensitivePatient, Patient } from '../types';

const patients: Patient[] = patientData;

const getEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): NonSensitivePatient => {
  const id = uuid();

  const newPatient = {
    id,
    ...patient,
  };

  patients.push(newPatient);
  return {
    id: newPatient.id,
    name: newPatient.name,
    gender: newPatient.gender,
    occupation: newPatient.occupation,
    dateOfBirth: newPatient.dateOfBirth,
  };
};

export default {
  getEntries,
  addPatient,
};
