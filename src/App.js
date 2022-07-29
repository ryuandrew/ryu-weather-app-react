import React, { useState } from "react";
const api = {
    key: "1ba93ee591e8244059fe71a8970006b7",
    base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
    const [query, setQuery] = useState("");
    const [weather, setWeather] = useState({});

    const search = (e) => {
        if (e.key === "Enter") {
            //GET request
            fetch(
                `${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`
            )
                // fetch(`api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}`)
                .then((res) => res.json()) //return the body as Promise and convert JSON to JavaScript object (i.e. object, array, string, number, etc.)
                .then((result) => {
                    setWeather(result);
                    setQuery("");
                    console.log(result);
                });
        }
    };
    const dateBuilder = (d) => {
        let months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];
        let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        let day = days[d.getDay()]; //number between 0 and 6
        let date = d.getDate(); //number between 1 and 31
        let month = months[d.getMonth()]; //number between 0 and 11
        let year = d.getFullYear(); //i.e. 2022

        return `${day} ${month} ${date} ${year}`;
    };
    return (
        <div
            className={
                typeof weather.main != "undefined"
                    ? weather.main.temp > 60
                        ? "app clouds"
                        : "app cool"
                    : "app"
            }
        >
            <main>
                <div className="searchBox">
                    <input
                        type="text"
                        className="searchBar"
                        placeholder="Search..."
                        onChange={(e) => setQuery(e.target.value)}
                        value={query}
                        onKeyPress={search}
                    />
                </div>
                {typeof weather.main != "undefined" ? (
                    <div className="body">
                        <div className="locationBox">
                            <div className="location">
                                {weather.name}, {weather.sys.country}{" "}
                            </div>
                            <div className="date">
                                {dateBuilder(new Date())}
                            </div>
                        </div>
                        <div className="weatherBox">
                            <div className="temp">
                                {Math.round(weather.main.temp)}°F
                            </div>
                            <div className="weather">
                                {weather.weather[0].main}
                                <div className="max-min">
                                    Max: {Math.round(weather.main.temp_max)}°F
                                </div>
                                <div className="max-min">
                                    Min: {Math.round(weather.main.temp_min)}°F
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    ""
                )}
            </main>
        </div>
    );
}

export default App;

//Clouds, Clear,
