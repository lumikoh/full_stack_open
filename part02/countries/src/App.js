import { useState, useEffect } from "react";
import Filter from "./components/Filter"
import CountryList from "./components/CountryList"
import CountryService from "./components/CountryService"
import WeatherService from "./components/WeatherService";


const App = () => {
  const [filter, setFilter] = useState("")
  const [countries, setCountries] = useState(null)
  const [selected, setSelected] = useState(null)
  const [current, setCurrent] = useState("")
  const [weatherData, setWeatherData] = useState(null)

  useEffect( () => {
    if(!countries) {
      CountryService.getAll().then( data => {
        setCountries(data)
      })
    }
  }, [])


  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setSelected(null)
  }

  const buttonPressed = (event) => {
    setSelected(event.target.id)

    for (const entry of countries) {
      if(entry.cca3 === event.target.id) {
        changeWeather(entry.capital)
      }
    }
  }

  const changeWeather = (name) => {
    if( name === current) {
      return
    }
    setCurrent(name)
    setWeatherData(null)
    WeatherService.getAll(name).then( data => {
      setWeatherData(data)
      console.log(data)
    }).catch( error => {
      console.log(error)
    })


  }

  return (
    <div>

      <Filter value={filter} change={handleFilterChange}/>

      <CountryList countries={countries} filter={filter} onPress={buttonPressed} selected={selected} changeWeather={changeWeather} weatherData={weatherData}/>

    </div>
  )

}

export default App;
