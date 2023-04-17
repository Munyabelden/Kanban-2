import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRockets } from "../redux/rockets/RocketSlice";

const Rockets = () => {
  const [isReserved, setIsReserved] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRockets());
  }, [dispatch]);

  const rockets = useSelector((state) => state.rockets.rockets);
  const status = useSelector((state) => state.rockets.status);
  const error = useSelector((state) => state.rockets.error);

  const handleReservation = () => {
    setIsReserved(!isReserved);
  };

  return (
    <div>
      {status === "loading" && <p>Loading rockets...</p>}
      {status === "failed" && <p>{error}</p>}
      {status === "succeeded" &&
        rockets.map((rocket) => (
          <div key={rocket.id}>
            <h3>{rocket.rocket_name}</h3>
            <p>{rocket.description}</p>
            <img src={rocket.flickr_images[0]} alt={rocket.rocket_name} />
            <button type="button" onClick={handleReservation}>
              {isReserved ? "Cancel Reservation" : "Reserve Rocket"}
            </button>
          </div>
        ))}
    </div>
  );
};

export default Rockets;
