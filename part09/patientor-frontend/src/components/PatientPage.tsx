import { useEffect, useState } from "react"
import { Diagnosis, Patient } from "../types"
import { useParams } from "react-router-dom"
import patientService from "../services/patients"
import diagnosisService from "../services/diagnoses"
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import MaleIcon from '@mui/icons-material/Male';
import EntryComponent from "./EntryComponent";

const PatientPage = () => {
    const [patient, setPatient] = useState<Patient>()
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([])
    const id = useParams().id

    useEffect(() => {
        if(typeof id === 'string') {
            patientService.getOne(id).then( data => {
                setPatient(data)
            })
        }
    }, [id])

    useEffect(() => {
        diagnosisService.getAll().then( data => {
            setDiagnoses(data)
        })
    }, [])

    if(!patient) {
        return <div></div>
    }

    return <div>
        <h2>{patient.name}{{
            'female': <FemaleIcon />,
            'male': <MaleIcon />,
            'other': <TransgenderIcon />
        }[patient.gender]}</h2>
        <p>
            ssn: {patient.ssn}
            <br />
            occupation: {patient.occupation}
        </p>
        <h3>entries</h3>
        <div>
            {patient.entries.map( e => (
                <EntryComponent key={e.id} entry={e} diagnoses={diagnoses} />
            ))}
        </div>
    </div>
}

export default PatientPage