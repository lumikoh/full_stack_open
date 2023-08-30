import { Diagnosis } from '../../types';

interface DiagnosisProps {
  value: string;
  diagnoses: Diagnosis[];
}

const DiagnosisListPart = ({ value, diagnoses }: DiagnosisProps) => {
  const dg = diagnoses.find((d) => d.code === value);

  return (
    <li>
      {value} {dg && dg.name}
    </li>
  );
};

export default DiagnosisListPart;
