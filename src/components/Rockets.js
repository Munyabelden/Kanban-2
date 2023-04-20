import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchRockets,
  reserveRocket,
  cancelReservation,
} from "../redux/rockets/RocketSlice";
import "./styles/Rockets.css";

const Rockets = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRockets());
  }, [dispatch]);

  const rockets = useSelector((state) => state.rockets.rockets);
  const status = useSelector((state) => state.rockets.status);
  const error = useSelector((state) => state.rockets.error);

  const handleReservation = (rocketId) => {
    dispatch(reserveRocket(rocketId));
  };
  const cancelReservationHandler = (rocketId) => {
    dispatch(cancelReservation(rocketId));
  };
  return (
    <div className="container">
      {status === "loading" && <p>Loading rockets...</p>}
      {status === "failed" && <p>{error}</p>}
      {status === "succeeded" &&
        rockets.map((rocket) => (
          <div className="rocket" key={rocket.id}>
            <img
              className="rocket-img"
              src={rocket.flickr_images[0]}
              alt={rocket.name}
            />
            <div className="description">
              <h3 className="name">{rocket.name}</h3>
              {rocket.reserved ? (
                <p className="text">
                  <span className="badge">Reserved</span>
                  {rocket.description}
                </p>
              ) : (
                <p className="text">{rocket.description}</p>
              )}
              {rocket.reserved ? (
                <button
                  className="reserved"
                  type="button"
                  onClick={() => cancelReservationHandler(rocket.id)}
                >
                  Cancel Reservation
                </button>
              ) : (
                <button
                  className="canceled"
                  type="button"
                  onClick={() => handleReservation(rocket.id)}
                >
                  Reserve Rocket
                </button>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Rockets;
