import axios from 'axios'

const appid = 'e9d0cffd17aac8c182c002c610e07afe'
const units = 'metric'

export type WeatherInfo = {
  clouds: number,
  dew_point: number,
  dt: number,
  humidity: number,
  pressure: number,
  sunrise: number,
  sunset: number,
  uvi: number,
  visibility: number,
  wind_deg: number,
  wind_speed: number,
  weather: {
    description: string,
    icon: string,
    id: number,
    main: string
  }[]
}

export type WeatherInfoCurrent = WeatherInfo & {
  feels_like: number,
  temp: number
}

export type WeatherInfoDaily = WeatherInfo & {
  feels_like: {
    day: number,
    night: number,
    eve: number,
    morn: number
  },
  temp: {
    day: number,
    eve: number,
    max: number,
    min: number,
    morn: number,
    night: number
  },
  // moon_phase: number,
  // moonrise: number,
  // moonset: number,
  // pop: number
}

export type WeatherResponse = {
  current: WeatherInfoCurrent,
  daily: WeatherInfoDaily[],
  hourly: WeatherInfoCurrent[],
  lat: number,
  lon: number,
  minutely: {
    dt: number,
    precipation: number
  }[],
  timezone: string,
  timezone_offset: number
}

async function getWeather (lat: number, lon: number): Promise<WeatherResponse> {
  const { data } = await axios.get<WeatherResponse>('https://api.openweathermap.org/data/2.5/onecall', {
    params: {
      lat,
      lon,
      appid,
      units
    }
  })

  return data
}

export function useWeather () {
  return {
    getWeather
  }
}
