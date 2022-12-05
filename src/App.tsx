import hotBg from "./assets/hot.jpg";
import coldBg from "./assets/cold.jpg";
import clouds from "./assets/clouds.jpg";
import clear from "./assets/clear.jpg";
import Rain from "./assets/rain.jpg";
import Drizzle from "./assets/drizzle.jpg";
import Haze from "./assets/haze.jpg";
import mist from "./assets/mist.jpg";
import Descriptions from "./components/Descriptions";
import React, { MouseEvent, SetStateAction, useEffect, useState } from "react";
import { getFormattedWeatherData } from "./weatherService";

interface w_data {
  description: string;
  iconURL: string;
  temp: number;
  feels_like: string;
  temp_min: number;
  temp_max: number;
  pressure: string;
  humidity: string;
  speed: string;
  country: string;
  name: string;
  mainx: string;
}

function App() {
  const [city, setCity] = useState("Brussels");
  const [weather, setWeather] = useState<w_data | null>(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(hotBg);

  const fetchWeatherData = async () => {
    const data: any = await getFormattedWeatherData(city, units);
    // console.log("data is => ", data);
    // console.log("sky is =>", data?.mainx);

    if (data === undefined) {
      setWeather(null);
    } else {
      setWeather(data);
    }

    //sky nature
    const sky = data?.mainx;
    switch (sky) {
      case "Clouds":
        setBg(clouds);
        break;
      case "Clear":
        setBg(clear);
        break;
      case "Snow":
        setBg(coldBg);
        break;
      case "Hist":
        setBg(coldBg);
        break;
      case "Rain":
        setBg(Rain);
        break;
      case "Drizzle":
        setBg(Drizzle);
        break;
      case "Haze":
        setBg(Haze);
        break;
      case "Mist":
        setBg(mist);
        break;
      default:
        setBg(hotBg);
        break;
    }

    // dynamic bg
    // const threshold = units === "metric" ? 20 : 60;
    // if (data?.temp <= threshold) setBg(coldBg);
    // else setBg(hotBg);
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const handleUnitsClick = (e: MouseEvent<HTMLButtonElement>): void => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? "metric" : "imperial");
  };

  const enterKeyPressed = (e: {
    keyCode: number;
    currentTarget: { value: React.SetStateAction<string>; blur: () => void };
  }) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
      fetchWeatherData();
    }
  };

  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {weather !== null ? (
          <div className="container">
            <div className="section section__inputs">
              <input
                onKeyDown={enterKeyPressed}
                type="text"
                name="city"
                placeholder="Enter City..."
                onChange={(e) => setCity(e.currentTarget.value)}
              />
              <button onClick={(e) => fetchWeatherData()}>Get Weather</button>
              <button onClick={(e) => handleUnitsClick(e)}>°F</button>
            </div>

            <div className="section section__temperature">
              <div className="icon">
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img src={weather.iconURL} alt="weatherIcon" />
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1>{`${weather.temp.toFixed()} °${
                  units === "metric" ? "C" : "F"
                }`}</h1>
              </div>
            </div>
            <Descriptions weather={weather} units={units} />
          </div>
        ) : (
          <div className="container">
            <div className="section section__inputs">
              <input
                onKeyDown={enterKeyPressed}
                type="text"
                name="city"
                placeholder="Enter City..."
                onChange={(e) => setCity(e.currentTarget.value)}
              />
              <button onClick={(e) => fetchWeatherData()}>Get Weather</button>
              <button onClick={(e) => handleUnitsClick(e)}>°F</button>
            </div>

            <div className="section section__temperature -mt-10">
              <div className="temperature">
                <h2>City not found. Please try again.</h2>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
