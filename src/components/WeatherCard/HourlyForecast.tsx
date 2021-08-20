import React from "react"
import { Col, Row } from "react-bootstrap"
import { useAppSelector } from "../../redux/hooks"
import { selectHourlyWeather } from "../../redux/slices/weatherSlice"
import { Hourly } from "../../types/Weather"
import Moment from "react-moment"
import Slider from "react-slick"

const HourlyForecast = () => {
  const data = useAppSelector(selectHourlyWeather)

  const settingsCarousel = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  }

  return (
    <div>
      <Slider {...settingsCarousel}>
        {data && data.map((d, i) => <HourCard key={i} data={d} />)}
      </Slider>
    </div>
  )
}

export default HourlyForecast

interface HourCardProps {
  data: Hourly
}

const HourCard = ({ data }: HourCardProps) => {
  return (
    <div className="text-center d-flex align-items-center flex-column">
      <img
        className="m-0"
        src={`http://openweathermap.org/img/wn/${data.weather[0]?.icon}@2x.png`}
        alt=""
      />
      <p className="m-0">{Math.round(data.temp)}°</p>
      <p className="m-0">{Math.round(data.feels_like)}°</p>
      <div>
        <Moment format=" h:mm A" unix>
          {data.dt}
        </Moment>
      </div>
    </div>
  )
}
