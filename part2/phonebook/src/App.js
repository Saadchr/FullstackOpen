import { useEffect, useState } from "react";
import personService from "./services/notes";

const Filter = ({ value, onChange }) => (
  <label>
    Filter by name: <input type="text" value={value} onChange={onChange} />
  </label>
);

const PersonForm = ({
  onSubmit,
  name,
  onNameChange,
  number,
  onNumberChange,
}) => (
  <form onSubmit={onSubmit}>
    <div>
      name: <input value={name} onChange={onNameChange} />
    </div>
    <div>
      number: <input value={number} onChange={onNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

const Persons = ({ onClick, persons }) => (
  <ul>
    {persons.map((person) => (
      <li key={person.name} style={{ display: "flex", alignItems: "center" }}>
        {person.name}: {person.number}
        <button
          onClick={() => onClick(person.id)}
          style={{ marginLeft: "10px", cursor: "pointer" }}
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
);

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="notification">{message}</div>;
};

const ErrorMessage = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notifMessage, setNotifMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  console.log(persons);
  useEffect(() => {
    console.log("effect");
    personService.getAll().then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);

  const handleDelete = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    if (window.confirm("Are you sure you want to delete this person?")) {
      personService
        .erase(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setNotifMessage(
            `Note: ${personToDelete.name} has been deleted from the server`
          );
          setTimeout(() => {
            setNotifMessage(null);
          }, 5000);
        })
        .catch((error) => {
          alert(`${error}: An error occurred while deleting the person`);
          setErrorMessage(
            `Note: ${personToDelete.name}  has already been deleted from the server`
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
  };

  const handleChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleUpdate = (id, newName) => {
    personService.update(id, newName).then((response) => {
      console.log(response);
      const updatedPersons = persons.map((person) =>
        person.id !== id ? person : response.data
      );
      setPersons(updatedPersons);
      setNewName("");
      setNewNumber("");
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let isPresent = persons.some(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    let personToUpdate = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    let idToUpdate;
    if (personToUpdate) {
      idToUpdate = personToUpdate.id;
    }

    if (isPresent) {
      setNewName("");
      const newPerson = { name: newName, number: newNumber };
      // alert(`${newName} is already added to the phonebook`);
      if (
        window.confirm(
          `${newName} is already added to the phonebook. Replace the new number by the new one?`
        )
      ) {
        handleUpdate(idToUpdate, newPerson);
      }
    } else {
      const newPerson = { name: newName, number: newNumber };
      personService.create(newPerson).then((response) => {
        setPersons([
          ...persons.filter((person) => person.id !== response.data.id),
          response.data,
        ]);
        setNotifMessage(`Note: ${newPerson.name} has been created`);
        setTimeout(() => {
          setNotifMessage(null);
        }, 5000);

        setNewName("");
        setNewNumber("");
      });
    }
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const filteredpersons = persons.filter((person) =>
    person.name.toLowerCase().startsWith(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notifMessage} />
      <ErrorMessage message={errorMessage} />
      <Filter value={filter} onChange={handleFilter} />

      <h3>Add a new</h3>

      <PersonForm
        onSubmit={handleSubmit}
        name={newName}
        onNameChange={handleChange}
        number={newNumber}
        onNumberChange={handleNumber}
      />

      <h3>Numbers</h3>

      <Persons onClick={handleDelete} persons={filteredpersons} />
    </div>
  );
};

export default App;
