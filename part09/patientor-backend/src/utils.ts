import {
  NewPatient,
  Gender,
  Diagnosis,
  EntryWithoutId,
  Discharge,
  SickLeave,
  HealthCheckRating,
} from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isNumber = (num: unknown): num is number => {
  return typeof num === 'number' || num instanceof Number;
};

const parseStringV = (field: unknown, name: string): string => {
  if (!isString(field)) {
    throw new Error(`Incorrect ${name}: ` + field);
  }
  return field;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect name: ' + name);
  }

  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDateV = (dateOfBirth: unknown, name: string): string => {
  if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error(`Incorrect ${name}: ` + dateOfBirth);
  }

  return dateOfBirth;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect gender: ' + gender);
  }

  return gender;
};

const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object
  ) {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDateV(object.dateOfBirth, 'date of birth'),
      ssn: parseStringV(object.ssn, 'ssn'),
      gender: parseGender(object.gender),
      occupation: parseStringV(object.occupation, 'occupation'),
      entries: [],
    };

    return newPatient;
  }

  throw new Error('Incorrect data: a field is missing');
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || typeof discharge !== 'object') {
    throw new Error('Incorrect or missing data in discharge');
  }
  if ('date' in discharge && 'criteria' in discharge) {
    const newDischarge: Discharge = {
      date: parseStringV(discharge.date, 'date'),
      criteria: parseStringV(discharge.criteria, 'criteria'),
    };
    return newDischarge;
  }
  throw new Error('Incorrect data: a field is missing');
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave || typeof sickLeave !== 'object') {
    throw new Error('Incorrect or missing data in sick leave');
  }
  if ('startDate' in sickLeave && 'endDate' in sickLeave) {
    const newSickLeave: SickLeave = {
      startDate: parseStringV(sickLeave.startDate, 'date'),
      endDate: parseStringV(sickLeave.endDate, 'criteria'),
    };
    return newSickLeave;
  }
  throw new Error('Incorrect data: a field is missing');
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!isNumber(rating) || !isHealthCheckRating(rating)) {
    throw new Error('Incorrect health check rating: ' + rating);
  }

  return rating;
};

const toNewDiagnosis = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    !(
      'description' in object &&
      'date' in object &&
      'specialist' in object &&
      'type' in object
    )
  ) {
    throw new Error('Incorrect data: a field is missing');
  }

  const newDiagnosis = {
    description: parseStringV(object.description, 'description'),
    date: parseDateV(object.date, 'date'),
    specialist: parseStringV(object.specialist, 'specialist'),
    diagnosisCodes: [] as Array<Diagnosis['code']>,
  };

  if ('diagnosisCodes' in object) {
    newDiagnosis.diagnosisCodes = parseDiagnosisCodes(object);
  }

  switch (object.type) {
    case 'Hospital':
      if ('discharge' in object) {
        const hospitalDiagnosis: EntryWithoutId = {
          ...newDiagnosis,
          type: 'Hospital',
          discharge: parseDischarge(object.discharge),
        };
        return hospitalDiagnosis;
      }
      throw new Error('Incorrect data: a field is missing');

    case 'OccupationalHealthcare':
      if ('employerName' in object) {
        let occupationalDiagnosis: EntryWithoutId = {
          ...newDiagnosis,
          type: 'OccupationalHealthcare',
          employerName: parseStringV(object.employerName, 'employer name'),
        };
        if ('sickLeave' in object) {
          occupationalDiagnosis = {
            ...occupationalDiagnosis,
            sickLeave: parseSickLeave(object.sickLeave),
          };
        }

        return occupationalDiagnosis;
      }
      throw new Error('Incorrect data: a field is missing');

    case 'HealthCheck':
      if ('healthCheckRating' in object) {
        const healthDiagnosis: EntryWithoutId = {
          ...newDiagnosis,
          type: 'HealthCheck',
          healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        };
        return healthDiagnosis;
      }
      throw new Error('Incorrect data: a field is missing');

    default:
      throw new Error('Incorrect type: ' + object.type);
  }
};

export default { toNewPatient, toNewDiagnosis };
