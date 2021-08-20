import React, { ChangeEvent, FormEvent, useState } from "react"
import { InputGroup, FormControl, Button, Form } from "react-bootstrap"
import { useAppDispatch } from "../redux/hooks"
import { fetchWeather, setChosenAddress } from "../redux/slices/weatherSlice"
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete"

const MainSearch = () => {
  const dispatch = useAppDispatch()

  const [address, setAddress] = useState("")

  const handleChange = (address: string) => {
    setAddress(address)
  }

  const handleSelect = async (address: string) => {
    const results = await geocodeByAddress(address)
    const latLng = await getLatLng(results[0])
    dispatch(fetchWeather({ lat: latLng.lat, lon: latLng.lng }))
    dispatch(setChosenAddress(results[0].formatted_address))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSelect(address)
  }

  return (
    <PlacesAutocomplete value={address} onChange={handleChange} onSelect={handleSelect}>
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <form onSubmit={handleSubmit}>
            <input
              {...getInputProps({
                placeholder: "Search Places ...",
                className: "location-search-input",
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item"
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" }
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}>
                    <span>{suggestion.description}</span>
                  </div>
                )
              })}
            </div>
            <button>Search</button>
          </form>
        </div>
      )}
    </PlacesAutocomplete>
  )
}

export default MainSearch
