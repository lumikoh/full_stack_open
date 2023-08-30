import { Diagnosis, Entry } from '../types';
import HospitalComponent from './entries/HospitalComponent';
import HealthCheckEntry from './entries/HealthCheckComponent';
import OccupationalHealthcareComponent from './entries/OccupationalHealthcareComponent';
import { assertNever } from 'assert-never';

const EntryComponent: React.FC<{ entry: Entry; diagnoses: Diagnosis[] }> = ({
  entry,
  diagnoses,
}) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalComponent entry={entry} diagnoses={diagnoses} />;
    case 'HealthCheck':
      return <HealthCheckEntry entry={entry} diagnoses={diagnoses} />;
    case 'OccupationalHealthcare':
      return (
        <OccupationalHealthcareComponent entry={entry} diagnoses={diagnoses} />
      );
    default:
      return assertNever(entry);
  }
};

export default EntryComponent;
