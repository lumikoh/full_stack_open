import { Diagnosis, Entry } from "../types"
import HospitalEntry from "./entries/HospitalEntry";
import HealthCheckEntry from "./entries/HealthCheckComponent";
import OccupationalHealthcareEntry from "./entries/OccupationalHealthcareEntry";
import {assertNever} from "assert-never";

const EntryComponent: React.FC<{entry: Entry, diagnoses: Diagnosis[]}> = ({ entry, diagnoses }) => {
    switch (entry.type) {
        case "Hospital":
            return <HospitalEntry entry={entry} diagnoses={diagnoses} />
        case "HealthCheck":
            return <HealthCheckEntry entry={entry} diagnoses={diagnoses} />
        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntry entry={entry} diagnoses={diagnoses} />
        default:
            return assertNever(entry);
    }
}

export default EntryComponent