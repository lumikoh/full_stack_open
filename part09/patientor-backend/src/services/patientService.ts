import { v1 as uuid } from 'uuid';

import patientData from '../../data/patients';
import {
  Entry,
  EntryWithoutId,
  NewPatient,
  NonSensitivePatient,
  Patient,
} from '../types';

let patients: Patient[] = patientData;

const getEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatient = (id: string): Patient => {
  const patient = patients.find((p) => p.id === id);
  if (patient) {
    return patient;
  }
  throw new Error('Patient with the given id not found');
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

const updatePatient = (entry: EntryWithoutId, pid: string): Patient => {
  const id = uuid();
  const newEntry: Entry = {
    ...entry,
    id,
  };
  const patient = getPatient(pid);

  const updatedPatient: Patient = {
    ...patient,
    entries: patient.entries.concat(newEntry),
  };

  patients = patients.map((p) => (p.id === pid ? updatedPatient : p));

  return updatedPatient;
};

export default {
  getEntries,
  addPatient,
  getPatient,
  updatePatient,
};
