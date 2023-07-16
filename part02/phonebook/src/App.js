/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import PersonService from "./components/PersonService";

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
            id: persons.length + 1,
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

            <Persons persons={persons} filter={filter} />
        </div>
    );
};

export default App;
