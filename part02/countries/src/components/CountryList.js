const Country = ({data}) => (
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
    </div>
)


const CountryList = ({countries, filter}) => {

    if(!countries) {
        return (
        <div>
            Fetching data...
        </div>
        )
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
        return <Country data={filtered[0]}/>
    }

    return (
        <div>
            {filtered.map( (country) => (
                <div key={country.cca3}>{country.name.common} </div>
            ))}
        </div>
    
    )

}


export default CountryList