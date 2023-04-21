import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Rockets from "../components/Rockets";
import { reserveRocket, cancelReservation } from "../redux/rockets/RocketSlice";

const mockStore = configureStore([]);

describe("Rockets component", () => {
  let store;
  const initialState = {
    rockets: {
      rockets: [
        {
          id: "rocket1",
          name: "Rocket 1",
          description: "Rocket 1 description",
          flickr_images: ["rocket1.jpg"],
          reserved: false,
        },
        {
          id: "rocket2",
          name: "Rocket 2",
          description: "Rocket 2 description",
          flickr_images: ["rocket2.jpg"],
          reserved: true,
        },
      ],
      status: "succeeded",
      error: null,
    },
  };

  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = jest.fn();
  });

  it("should render a list of rockets", () => {
    render(
      <Provider store={store}>
        <Rockets />
      </Provider>
    );

    const rocket1Name = screen.getByText("Rocket 1");
    const rocket1Description = screen.getByText("Rocket 1 description");
    const rocket1ReserveButton = screen.getByText("Reserve Rocket");
    const rocket2Name = screen.getByText("Rocket 2");
    const rocket2Description = screen.getByText("Rocket 2 description");
    const rocket2CancelButton = screen.getByText("Cancel Reservation");

    expect(rocket1Name).toBeInTheDocument();
    expect(rocket1Description).toBeInTheDocument();
    expect(rocket1ReserveButton).toBeInTheDocument();
    expect(rocket2Name).toBeInTheDocument();
    expect(rocket2Description).toBeInTheDocument();
    expect(rocket2CancelButton).toBeInTheDocument();
  });

  it("should dispatch reserveRocket action when Reserve Rocket button is clicked", () => {
    render(
      <Provider store={store}>
        <Rockets />
      </Provider>
    );

    const rocket1ReserveButton = screen.getByText("Reserve Rocket");
    fireEvent.click(rocket1ReserveButton);

    expect(store.dispatch).toHaveBeenCalledWith(
      reserveRocket("rocket1")
    );
  });

  it("should dispatch cancelReservation action when Cancel Reservation button is clicked", () => {
    render(
      <Provider store={store}>
        <Rockets />
      </Provider>
    );

    const rocket2CancelButton = screen.getByText("Cancel Reservation");
    fireEvent.click(rocket2CancelButton);

    expect(store.dispatch).toHaveBeenCalledWith(
      cancelReservation("rocket2")
    );
  });

});
