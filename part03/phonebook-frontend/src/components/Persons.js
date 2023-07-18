const Person = ({ name, number, onPress, id }) => (
    <tr>
        <td>{name}</td>
        <td>{number}</td>
        <td><button onClick={onPress} id={id}>delete</button></td>
    </tr>
);

const Persons = ({ persons, filter, onPress }) => (
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
                        onPress={onPress}
                        id={person.id}
                    />
                ))}
        </tbody>
    </table>
);

export default Persons;
