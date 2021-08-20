import React from "react"
import { Row, Col, Container } from "react-bootstrap"
import { useAppSelector } from "../../redux/hooks"
import { selectWeather } from "../../redux/slices/weatherSlice"
import Moment from "react-moment"
import DaysForecast from "./DaysForecast"
import HourlyForecast from "./HourlyForecast"
import styles from "./weatherCard.module.css"

const WeatherCard = () => {
  const { address, data } = useAppSelector(selectWeather)

  return (
    <>
      {data && (
        <Container>
          <div className={styles.weatherContainer}>
            <Row>
              <Col>
                <h2 className={styles.weatherHeader}>
                  <strong>{address}</strong>
                </h2>
                <h2 className={styles.weatherHeader}>
                  <Moment format="dddd, MMMM D, YYYY | h:mm A">{new Date()}</Moment>
                </h2>
              </Col>
            </Row>
            <Row>
              <Col className="d-flex">
                <div className="text-center">
                  <img
                    className={styles.mainImage}
                    src={`http://openweathermap.org/img/wn/${data.current.weather[0]?.icon}@2x.png`}
                    alt=""
                  />
                  <p className={styles.weatherTypeNow}>{data.current.weather[0]?.main}</p>
                </div>
                <div
                  className={`${styles.temperatureNow} d-flex justify-content-center align-items-center ms-3`}>{`${Math.round(
                  data.current.temp
                )}°`}</div>
              </Col>
              <Col className="d-flex justify-content-center align-items-center">
                <div
                  className={`d-flex justify-content-center align-items-left flex-column ${styles.mainInfoBlock}`}>
                  <div>
                    <span>Humidity: </span>
                    <strong>{`${data.current.humidity} %`}</strong>
                  </div>
                  <div className="mt-2">
                    <span>Pressure: </span>
                    <strong>{`${data.current.pressure} hPa`}</strong>
                  </div>
                  <div className="mt-2">
                    <span>Wind: </span>
                    <strong>{`${Math.round(data.current.wind_speed)} kmph`}</strong>
                  </div>
                </div>
              </Col>
              <Col className="d-flex justify-content-center align-items-center">
                <div
                  className={`d-flex justify-content-center align-items-left flex-column ${styles.mainInfoBlock}`}>
                  <div>
                    <span>Feels like: </span>
                    <strong>{`${Math.round(data.current.feels_like)}°`}</strong>
                  </div>
                  <div className="mt-2">
                    <span>Sunrise:</span>
                    <strong>
                      <Moment format=" h:mm A" unix>
                        {data.current.sunrise}
                      </Moment>
                    </strong>
                  </div>
                  <div className="mt-2">
                    <span>Sunset:</span>
                    <strong>
                      <Moment format=" h:mm A" unix>
                        {data.current.sunset}
                      </Moment>
                    </strong>
                  </div>
                </div>
              </Col>
            </Row>
            <HourlyForecast />
            <DaysForecast />
          </div>
        </Container>
      )}
    </>
  )
}

export default WeatherCard
