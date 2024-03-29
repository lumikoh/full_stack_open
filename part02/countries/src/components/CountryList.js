import Weather from "./Weather"

const Country = ({data, weatherData}) => (
    <div>
        <h2>{data.name.common}</h2>
        <div>
            capital: {data.capital[0]}<br></br>
            area: {data.area}
        </div>
        <h3>languages:</h3>
        <ul>
            {Object.entries(data.languages).map( ([key, value]) => (<li key={key}>{value}</li>))}
        </ul>
        <div>
            <br></br>
            <img src={data.flags.png} alt={"Flag"}></img>
        </div>
        <Weather data={weatherData} capital={data.capital[0]} />
    </div>
)


const CountryList = ({countries, filter, onPress, selected, changeWeather, weatherData}) => {

    if(!countries) {
        return (
        <div>
            Fetching data...
        </div>
        )
    }

    if(selected) {
        for(const country of countries) {
            if(country.cca3 === selected) {
                return <Country data={country} weatherData={weatherData} />
            }
        }
    }

    const filtered = countries.filter(
                        (country) =>
                            filter === "" ||
                            country.name.common.toLowerCase().includes(filter.toLowerCase())
                        )
    if(filtered.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }

    if(filtered.length === 1) {
        changeWeather(filtered[0].capital[0])
        return <Country data={filtered[0]} weatherData={weatherData}/>
    }

    return (
        <div>
            {filtered.map( (country) => (
                <div key={country.cca3}>
                    {country.name.common} 
                    <button onClick={onPress} id={country.cca3}>show</button>
                </div>
            ))}
        </div>
    
    )

}


export default CountryList