import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { search } from "./icons/search";
import Spin from "antd/es/spin";
import "antd/lib/spin/style/index.css";

const AddForecast = ({ pending }) => {
  const dispatch = useDispatch();
  const [city, setCity] = useState("");
  const [noCity, setNoCity] = useState(false);

  const handleChange = (e) => {
    setNoCity(false);

    dispatch({
      type: "CLEAR_ERROR",
    });

    setCity(e.target.value);
  };

  const addForecast = (e) => {
    e.preventDefault();

    if (!city) return setNoCity(true);

    dispatch({
      type: "SET_PENDING",
      payload: true,
    });

    dispatch({
      type: "REQUEST_DATA",
      payload: city,
    });
  };

  return (
    <form onSubmit={addForecast} className="mt-4">
      <div className="flex">
        <input
          onChange={(e) => handleChange(e)}
          name="city"
          placeholder={"Location.."}
          className="form-control rounded-element p-4 mx-4 shadow-sm input"
        />
        <button
          type="submit"
          className="form-control rounded-element p-4 shadow-sm submit"
          name="city"
          disabled={pending}
        >
          {search}
        </button>
      </div>
      <div className="pending">{pending && <Spin />} </div>
      {noCity && (
        <h5
          className="mb-4 alert alert-primary font-weight-normal"
          key="no-city"
        >
          Please enter a location
        </h5>
      )}
    </form>
  );
};

export default AddForecast;
