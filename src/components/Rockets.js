import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRockets, reserveRocket } from "../redux/rockets/RocketSlice";
import "./styles/Rockets.css";

const Rockets = () => {
  const [reservedRocketId, setReservedRocketId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRockets());
  }, [dispatch]);

  const rockets = useSelector((state) => state.rockets.rockets);
  const status = useSelector((state) => state.rockets.status);
  const error = useSelector((state) => state.rockets.error);

  const handleReservation = (rocketId) => {
    if (reservedRocketId === rocketId) {
      dispatch(reserveRocket(null));
      setReservedRocketId(null);
    } else {
      dispatch(reserveRocket(rocketId));
      setReservedRocketId(rocketId);
    }
  };

  return (
    <div className="container">
      {status === "loading" && <p>Loading rockets...</p>}
      {status === "failed" && <p>{error}</p>}
      {status === "succeeded" &&
        rockets.map((rocket) => (
          <div className="rocket" key={rocket.id}>
            <img src={rocket.flickr_images[0]} alt={rocket.name} />
            <h3>{rocket.name}</h3>
            <div className="description">
              {reservedRocketId === rocket.id ? (
                <p>Reserved {rocket.description}</p>
              ) : (
                <p>{rocket.description}</p>
              )}
              <button type="button" onClick={() => handleReservation(rocket.id)}>
                {reservedRocketId === rocket.id ? "Cancel Reservation" : "Reserve Rocket"}
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Rockets;
