const Person = ({ name, number }) => (
    <tr>
        <td>{name}</td>
        <td>{number}</td>
    </tr>
);

const Persons = ({ persons, filter }) => (
    <table>
        <tbody>
            {persons
                .filter(
                    (person) =>
                        filter === "" ||
                        person.name.toLowerCase().includes(filter.toLowerCase())
                )
                .map((person) => (
                    <Person
                        key={person.id}
                        name={person.name}
                        number={person.number}
                    />
                ))}
        </tbody>
    </table>
);

export default Persons;
