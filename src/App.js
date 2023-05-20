import React, { useState, useEffect } from "react";

import logo from "./logo.svg";
import "./App.css";

function App() {
  const lanes = [
    {
      id: 1,
      text: "Lane 1",
      users: [
        {
          id: 1,
          name: "Jordan",
          items: 10,
          laneId: 1,
        },
        {
          id: 2,
          name: "Joe",
          items: 3,
        },
        {
          id: 3,
          name: "Brandon",
          items: 15,
        },
      ],
    },
    {
      id: 2,
      text: "Lane 2",
      users: [
        {
          id: 1,
          name: "Conor",
          items: 7,
          laneId: 2,
        },
        {
          id: 2,
          name: "Joe",
          items: 5,
          laneId: 2,
        },
        {
          id: 3,
          name: "Brandon",
          items: 1,
          laneId: 2,
        },
      ],
    },
    {
      id: 3,
      text: "Lane 3",
      users: [],
    },
    {
      id: 4,
      text: "Lane 4",
      users: [
        {
          id: 1,
          name: "Jordan",
          items: 6,
          laneId: 4,
        },
      ],
    },
    {
      id: 5,
      text: "Lane 5",
      users: [
        {
          id: 1,
          name: "Sam",
          items: 22,
          laneId: 5,
        },
      ],
    },
  ];

  const [checkoutLanes, setCheckoutLanes] = React.useState(lanes);

  const [value, setValue] = useState("");

  const getLaneItems = () => {
    return checkoutLanes.map((lane) => {
      const { id, text, users } = lane;

      return (
        <ul className="list-item-wrap" key={id}>
          <li className="list-item">{text}</li>
          {users.map((user) => {
            return (
              <li key={user.id} className="user-items">
                {user.items}
              </li>
            );
          })}
        </ul>
      );
    });
  };

  const handleOnChange = (val) => {
    setValue(val);
  };

  const onHandleClick = () => {
    const copyOfLanes = [...checkoutLanes];

    let emptyUsersLane = null;
    let shortestUsersLane = copyOfLanes[0];
    let leastItemsLane = copyOfLanes[0];

    for (const lane of copyOfLanes) {
      if (lane.users.length === 0) {
        emptyUsersLane = lane;
        break;
      }

      if (lane.users.length < shortestUsersLane.users.length) {
        shortestUsersLane = lane;
      }

      if (lane.users.length === shortestUsersLane.users.length) {
        const laneItems = lane.users.reduce(
          (total, user) => total + user.items,
          0
        );
        const shortestLaneItems = shortestUsersLane.users.reduce(
          (total, user) => total + user.items,
          0
        );
        if (laneItems < shortestLaneItems) {
          shortestUsersLane = lane;
        }
      }

      if (lane.users.length < leastItemsLane.users.length) {
        leastItemsLane = lane;
      }

      if (lane.users.length === leastItemsLane.users.length) {
        const laneItems = lane.users.reduce(
          (total, user) => total + user.items,
          0
        );
        const leastItemsLaneItems = leastItemsLane.users.reduce(
          (total, user) => total + user.items,
          0
        );
        if (laneItems < leastItemsLaneItems) {
          leastItemsLane = lane;
        }
      }
    }

    if (emptyUsersLane) {
      emptyUsersLane.users.push({ items: value });
    } else {
      shortestUsersLane.users.push({ items: value });
    }

    setCheckoutLanes(copyOfLanes);
    setValue("");
  };

  const handleDecrementItems = React.useCallback(() => {
    const copyOfLanes = [...checkoutLanes];

    copyOfLanes.map((lane) => {
      return lane.users.map((user, index) => {
        const isFirstUser = index === 0;
        if (isFirstUser && user.items === 0) {
          lane.users.splice(0, 1);
        }
        return isFirstUser && user.items > 0 ? user.items-- : "";
      });
    });
    setCheckoutLanes(copyOfLanes);
  }, [checkoutLanes]);

  useEffect(() => {
    const timer = setInterval(() => {
      handleDecrementItems();
    }, 500);

    return () => clearInterval(timer);
  }, [handleDecrementItems]);

  return (
    <div className="App">
      <div className="form">
        <input
          className="text-input"
          type="number"
          value={value}
          palceholder="Checkout"
          onChange={(e) => handleOnChange(e.target.value)}
        />
        <button
          disabled={!value}
          className="btn"
          type="button"
          aria-label="checkout-button"
          onClick={onHandleClick}
        >
          Checkout
        </button>
      </div>

      <div className="lane-items-wrap">{getLaneItems()}</div>
    </div>
  );
}

export default App;
