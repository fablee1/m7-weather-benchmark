import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { WEATHER_API_KEY } from "../../env"
import Weather from "../../types/Weather"
import { RootState } from "../store"

export interface WeatherState {
  address: string
  data: Weather | null
  status: "idle" | "loading" | "failed"
}

const initialState: WeatherState = {
  address: "",
  data: null,
  status: "idle",
}

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (coord: { lat: number; lon: number }) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&appid=${WEATHER_API_KEY}&units=metric`
    )
    if (response.ok) {
      const data = (await response.json()) as Weather
      return data
    } else {
      console.log("error")
    }
  }
)

export const counterSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setChosenAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload
    },
    // increment: (state) => {
    //   state.value += 1
    // },
    // decrement: (state) => {
    //   state.value -= 1
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = "idle"
        state.data = action.payload as Weather
      })
  },
})

export const { setChosenAddress } = counterSlice.actions

export const selectWeather = (state: RootState) => state.weather
export const selectDaysWeather = (state: RootState) => state.weather.data?.daily
export const selectHourlyWeather = (state: RootState) => state.weather.data?.hourly

export default counterSlice.reducer
