interface Weather {
  lat: number
  lon: number
  timezone: string
  timezone_offset: number
  current: Current
  minutely: Minutely[]
  hourly: Hourly[]
  daily: Daily[]
  alerts: Alert[]
}

export default Weather

interface Current {
  dt: number
  sunrise: number
  sunset: number
  temp: number
  feels_like: number
  pressure: number
  humidity: number
  dew_point: number
  uvi: number
  clouds: number
  visibility: number
  wind_speed: number
  wind_gust?: number
  wind_deg: number
  weather: CurrentWeather[]
  rain?: {
    "1h": number
  }
  snow?: {
    "1h": number
  }
}

interface CurrentWeather {
  id: number
  main: string
  description: string
  icon: string
}

interface Minutely {
  dt: number
  precipitation: number
}

export interface Hourly {
  dt: number
  temp: number
  feels_like: number
  pressure: number
  humidity: number
  dew_point: number
  uvi: number
  clouds: number
  visibility: number
  wind_speed: number
  wind_deg: number
  wind_gust?: number
  weather: CurrentWeather[]
  pop: number
  rain?: {
    "1h": number
  }
  snow?: {
    "1h": number
  }
}

export interface Daily {
  dt: number
  sunrise: number
  sunset: number
  moonrise: number
  moonset: number
  moon_phase: number
  temp: {
    day: number
    min: number
    max: number
    night: number
    eve: number
    morn: number
  }
  feels_like: {
    day: number
    night: number
    eve: number
    morn: number
  }
  pressure: number
  humidity: number
  dew_point: number
  wind_speed: number
  wind_deg: number
  wind_gust?: number
  weather: CurrentWeather[]
  clouds: number
  pop: number
  rain?: number
  snow?: number
  uvi: number
}

interface Alert {
  sender_name: string
  event: string
  start: number
  end: number
  description: string
  tags: string[]
}
