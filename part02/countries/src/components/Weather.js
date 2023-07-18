
const Weather = ({data, capital}) => {
    if(!data) {
        return <></>
    }
    if(data.name.toLowerCase() !== capital.toLowerCase()) {
        return <></>
    }

    return (
        <div>
            <h2>Weather in {capital}</h2>
            temperature {(data.main.temp-273.15).toFixed(2)} Celsius
            <br></br>
            <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`} alt="Weather icon"></img>
            <br></br>
            wind {data.wind.speed} m/s
        </div>
    )
}

export default Weather