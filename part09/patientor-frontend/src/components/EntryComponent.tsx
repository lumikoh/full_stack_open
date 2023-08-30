import { Entry } from "../types"

interface Props {
    entry: Entry
}

const EntryComponent = ({entry}: Props) => {
    return (
        <div>
            <p>{entry.date} <em>{entry.description}</em></p>
            <ul>{entry.diagnosisCodes && entry.diagnosisCodes.map(d => (
                <li key={d}>{d}</li>
            ))

            }
            </ul>
        </div>

    )
}

export default EntryComponent