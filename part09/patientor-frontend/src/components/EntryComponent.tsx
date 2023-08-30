import { Diagnosis, Entry } from "../types"

interface Props {
    entry: Entry,
    diagnoses: Diagnosis[];
}

interface DiagnosisProps {
    value: string,
    diagnoses: Diagnosis[]
}

const DiagnosisListPart = ({value, diagnoses}: DiagnosisProps) => {

    const dg = diagnoses.find(d => d.code === value)

    return <li>{value} {dg && (dg.name)}</li>
}

const EntryComponent = ({entry, diagnoses}: Props) => {
    return (
        <div>
            <p>{entry.date} <em>{entry.description}</em></p>
            <ul>{entry.diagnosisCodes && entry.diagnosisCodes.map(d => (
                <DiagnosisListPart key={d} value={d} diagnoses={diagnoses}/>
            ))

            }
            </ul>
        </div>

    )
}

export default EntryComponent