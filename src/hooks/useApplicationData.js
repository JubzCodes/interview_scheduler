import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

export function useApplicationData() {

  function updateSpots(add, cancel) {
    // update spots remaining
    const dayUpdate = state.days.find((day) => day.name === state.day);
    const days = [...state.days];
    if (cancel) {
      //if true, add spot
      dayUpdate.spots++;
    } else if (add) {
      //if true appointment, reduce spots
      dayUpdate.spots--;
    }
    days[dayUpdate.id - 1] = dayUpdate; //apply to change to object (not state yet)
    return days;
  }
  
  function bookInterview(id, interview) {
    const add = !state.appointments[id].interview;
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`api/appointments/${id}`, appointment)
      .then((res) => {
        if (res) {
          setState({ ...state, appointments, days: updateSpots(add) });
        }
        console.log("state", state);
      })
      .catch((err) => {
        console.log("err", err);
        throw err;
      });
  }

  function cancelInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .delete(`api/appointments/${id}`, appointment)
      .then(() => {
        setState((prev) => ({
          ...prev,
          appointments,
          days: updateSpots(null, true),
        }));
      })
      .catch((err) => {
        console.log("err", err);
        throw err;
      });
  }

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("api/appointments"),
      axios.get("api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  const setDay = (day) => setState({ ...state, day });

  return { state, setDay, bookInterview, cancelInterview };
}
