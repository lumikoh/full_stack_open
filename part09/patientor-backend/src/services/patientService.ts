import patientData from '../../data/patients';
import { NonSensitivePatient, Patient } from '../types';

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

const addPatient = () => {
  return null;
};

export default {
  getEntries,
  addPatient,
};
