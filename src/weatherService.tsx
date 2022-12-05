const API_KEY = "7eca2450e1bf0f32eecc39b31b26549c";

const makeIconURL = (iconId: any): any =>
  `https://openweathermap.org/img/wn/${iconId}@2x.png`;

const getFormattedWeatherData = async (city?: string, units = "metric") => {
  try {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;

    const data = await fetch(URL)
      .then((res) => res.json())
      .then((data) => data);

    if (data?.cod === "404" || data?.cod === "400") {
      throw data.message;
    } else {
      // console.log('data => ', data)
      const {
        weather,
        main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
        wind: { speed },
        sys: { country },
        name,
      } = data;

      const { description, icon } = weather[0];
      const mainx = weather[0].main

      // console.log('data.weather[0].main => ', mainx)

      return {
        description,
        mainx,
        iconURL: makeIconURL(icon),
        temp,
        feels_like,
        temp_min,
        temp_max,
        pressure,
        humidity,
        speed,
        country,
        name,
      };
    }
  } catch (error) {
    console.log("error => ", error);
  }
};

export { getFormattedWeatherData };
