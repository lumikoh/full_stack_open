/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import PersonService from "./components/PersonService";
import PersonUtils from "./components/PersonUtils";

const App = () => {
    const [persons, setPersons] = useState([]);

    useEffect(() => {
        PersonService.getAll().then( data => 
            setPersons(persons.concat(data)))
        
    }, []);

    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [filter, setFilter] = useState("");

    function isNameKnown(person) {
        return person.name === newName;
    }

    const addNumber = (event) => {
        event.preventDefault();
        if (newName === "") return;

        if (persons.find(isNameKnown) !== undefined) {
            alert(`${newName} is already added to phonebook`);
            return;
        }

        const newPerson = {
            name: newName,
            number: newNumber,
            id: PersonUtils.findFreeId(persons),
        }

        PersonService.create(newPerson).then( () => {
            setPersons(persons.concat(newPerson))
            }
        )

        setNewName("");
        setNewNumber("");
    };

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    };

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const handleDeleteButton = (event) => {
        for (const entry of persons) {
            console.log(event.target.id)
            if (entry.id.toString() === event.target.id) {
                if(window.confirm(`Delete ${entry.name}?`)) {
                    PersonService.removeId(entry.id).then( () => {
                        setPersons(persons.toSpliced(persons.indexOf(entry),1))
                    })
                }
                break
            }
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>

            <Filter value={filter} change={handleFilterChange} />

            <h3>add a new</h3>

            <PersonForm
                onFormSubmit={addNumber}
                name={newName}
                onNameChange={handleNameChange}
                number={newNumber}
                onNumberChange={handleNumberChange}
            />

            <h3>Numbers</h3>

            <Persons persons={persons} filter={filter} onPress={handleDeleteButton} />
        </div>
    );
};

export default App;
