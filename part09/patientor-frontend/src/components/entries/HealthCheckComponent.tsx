import { HealthCheckEntry, Diagnosis, HealthCheckRating } from '../../types';
import DiagnosisListPart from './DiagnosisListPart';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';

const HealthIcon: React.FC<{ rating: HealthCheckRating }> = ({ rating }) => {
  switch (rating) {
    case HealthCheckRating.Healthy:
      return <FavoriteIcon sx={{ color: 'green' }} />;
    case HealthCheckRating.LowRisk:
      return <FavoriteIcon sx={{ color: 'yellow' }} />;
    case HealthCheckRating.HighRisk:
      return <FavoriteIcon sx={{ color: 'red' }} />;
    case HealthCheckRating.CriticalRisk:
      return <HeartBrokenIcon sx={{ color: 'red' }} />;
    default:
      return <></>;
  }
};

const HealthCheckComponent: React.FC<{
  entry: HealthCheckEntry;
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
        <MedicalServicesIcon />
      </p>{' '}
      <em>{entry.description}</em>
      <br />
      <HealthIcon rating={entry.healthCheckRating} />
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

export default HealthCheckComponent;
