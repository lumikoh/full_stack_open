import { Entry, Diagnosis } from "../../types"
import DiagnosisListPart from "./DiagnosisListPart"
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const HospitalEntry: React.FC<{entry: Entry, diagnoses: Diagnosis[]}> = ({ entry, diagnoses }) => {
    return (
        <div style={{border: "solid 2px grey", borderRadius: "5px", margin: "4px"}}>
            <p>{entry.date}<LocalHospitalIcon /></p> <em>{entry.description}</em>
            <p>diagnosis by {entry.specialist} </p>
            <ul>{entry.diagnosisCodes && entry.diagnosisCodes.map(d => (
                <DiagnosisListPart key={d} value={d} diagnoses={diagnoses}/>
            ))

            }
            </ul>
        </div>

    )
}

export default HospitalEntry