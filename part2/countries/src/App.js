import { useEffect, useState } from "react";
import axios from "axios";
const apiKey = process.env.REACT_APP_API_KEY;

function App() {
  const [inputCountry, setInputCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(null);
  const [message, setMessage] = useState(null);
  const [weather, setWeather] = useState([]);
  const [iconWeather, setIconWeather] = useState(null);

  const handleShowClick = (selectedCountry) => {
    setCountries([]);
    setCountry(selectedCountry);
  };

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
          console.log(filteredCountries[0].capitalInfo.latlng); // Return an array of 2 elements
          const [lat, lon] = filteredCountries[0].capitalInfo.latlng; // This gives an error main.903e3382d33d5ddb17f9.hot-update.js:67 Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'latlng')
          console.log(apiKey);

          axios
            .get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
            )
            .then((response) => {
              console.log(response.data);
              setIconWeather(response.data.weather[0].icon);
              setWeather(response.data.main);
            });
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
        <div key={index} style={{ display: "flex", alignItems: "center" }}>
          <Country country={c} />
          <button onClick={() => handleShowClick(c)}>Show</button>
        </div>
      ))}
      {country && (
        <Detail country={country} weather={weather} iconWeather={iconWeather} />
      )}
    </>
  );
}

const Country = ({ country }) => <li>{country.name.common}</li>;

const Detail = ({ country, weather, iconWeather }) => (
  <>
    <h1> {country.name.common}</h1>
    <p>capital:{country.capital[0]}</p>
    <p>area: {country.area}</p>

    {Object.values(country.languages).map((language, index) => (
      <li key={index}> {language} </li>
    ))}
    <img src={country.flags.png} alt="" />
    <h1>Weather in {country.capital[0]}</h1>
    <p>Temperature felt like: {weather.feels_like}°c</p>
    <img
      src={`https://openweathermap.org/img/wn/${iconWeather}@2x.png`}
      alt=""
    />
  </>
);

export default App;
