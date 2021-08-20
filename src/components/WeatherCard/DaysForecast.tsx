import React from "react"
import { Col, Row } from "react-bootstrap"
import { useAppSelector } from "../../redux/hooks"
import { selectDaysWeather } from "../../redux/slices/weatherSlice"
import { Daily } from "../../types/Weather"
import Moment from "react-moment"

const DaysForecast = () => {
  const data = useAppSelector(selectDaysWeather)

  return (
    <div>
      <Row className="g-0">
        {data && data.map((d, i) => <DayCard key={i} data={d} />)}
      </Row>
    </div>
  )
}

export default DaysForecast

interface Props {
  data: Daily
}

const DayCard = ({ data }: Props) => {
  return (
    <Col className="mt-5">
      <div className="text-center">
        <p>
          <Moment format="ddd" unix>
            {data.dt}
          </Moment>
        </p>
        <img
          src={`http://openweathermap.org/img/wn/${data.weather[0]?.icon}@2x.png`}
          alt=""
        />
        <div className="d-flex justify-content-center">
          <span className="me-2">{Math.round(data.temp.max)}°</span>
          <span>{Math.round(data.temp.min)}°</span>
        </div>
        <div>
          <span className="iconify" data-icon="wi:sunrise"></span>
          <Moment format=" h:mm A" unix>
            {data.sunrise}
          </Moment>
        </div>
        <div>
          <span className="iconify" data-icon="wi:sunset"></span>
          <span>
            <Moment format=" h:mm A" unix>
              {data.sunset}
            </Moment>
          </span>
        </div>
      </div>
    </Col>
  )
}
