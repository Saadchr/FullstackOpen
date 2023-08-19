import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [inputCountry, setInputCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(null);
  const [message, setMessage] = useState(null);

  const handleInput = (event) => {
    event.preventDefault();
    setInputCountry(event.target.value);
  };

  useEffect(() => {
    if (inputCountry) {
      fetchCountries(inputCountry);
    } else {
      setMessage(null);
      setCountries([]);
      setCountry(null);
    }
  }, [inputCountry]);

  const fetchCountries = (input) => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        const filteredCountries = response.data.filter((country) =>
          country.name.common.toLowerCase().startsWith(input.toLowerCase())
        );

        if (filteredCountries.length > 10) {
          setMessage(
            "Please refine your search. There are more than 10 countries matching your search."
          );
          setCountries([]);
          setCountry(null);
        } else if (
          filteredCountries.length > 1 &&
          filteredCountries.length < 10
        ) {
          setCountries(filteredCountries);
          setCountry(null);
          setMessage(null);
        } else if (filteredCountries.length === 1) {
          setCountry(filteredCountries[0]);
          setCountries([]);
          setMessage(null);
        } else {
          setMessage("No country matches your request.");
          setCountries([]);
          setCountry(null);
        }
      });
  };

  return (
    <>
      <label htmlFor="username">Filter your country</label>
      <input
        type="text"
        id="username"
        value={inputCountry}
        onChange={handleInput}
      />
      {message && <div className="error">{message}</div>}
      {countries.map((c, index) => (
        <Country key={index} country={c} />
      ))}
      {country && <Detail country={country} />}
    </>
  );
}

const Country = ({ country }) => <li>{country.name.common}</li>;

const Detail = ({ country }) => (
  <>
    <h1> {country.name.common}</h1>
    <p>capital:{country.capital[0]}</p>
    <p>area: {country.area}</p>

    {Object.values(country.languages).map((language, index) => (
      <li key={index}> {language} </li>
    ))}
    <img src={country.flags.png} alt="" />
  </>
);

export default App;
