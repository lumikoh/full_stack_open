import { useState, useEffect } from "react";
import Filter from "./components/Filter"
import CountryList from "./components/CountryList"
import CountryService from "./components/CountryService"

const App = () => {

  const [filter, setFilter] = useState("")
  const [countries, setCountries] = useState(null)

  useEffect( () => {
    if(!countries) {
      CountryService.getAll().then( data => {
        setCountries(data)
      })
    }
  }, [])


  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>

      <Filter value={filter} change={handleFilterChange}/>

      <CountryList countries={countries} filter={filter}/>

    </div>
  )

}

export default App;
