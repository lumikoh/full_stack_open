import { OccupationalHealthcareEntry, Diagnosis } from '../../types';
import DiagnosisListPart from './DiagnosisListPart';
import WorkIcon from '@mui/icons-material/Work';

const OccupationalHealthcareComponent: React.FC<{
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}> = ({ entry, diagnoses }) => {
  return (
    <div
      style={{
        border: 'solid 2px grey',
        borderRadius: '5px',
        margin: '4px',
        padding: '2px',
      }}
    >
      <p>
        {entry.date}
        <WorkIcon />
        <b>{entry.employerName}</b>
      </p>{' '}
      <em>{entry.description}</em>
      <p>diagnosis by {entry.specialist}</p>
      <ul>
        {entry.diagnosisCodes &&
          entry.diagnosisCodes.map((d) => (
            <DiagnosisListPart key={d} value={d} diagnoses={diagnoses} />
          ))}
      </ul>
    </div>
  );
};

export default OccupationalHealthcareComponent;
