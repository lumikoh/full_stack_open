import { useEffect, useState } from "react"
import { Patient } from "../types"
import { useParams } from "react-router-dom"
import patientService from "../services/patients"
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import MaleIcon from '@mui/icons-material/Male';

const PatientPage = () => {
    const [patient, setPatient] = useState<Patient>()
    const id = useParams().id

    useEffect(() => {
        if(typeof id === 'string') {
            patientService.getOne(id).then( data => {
                setPatient(data)
            })
        }
    }, [id])

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
    </div>
}

export default PatientPage