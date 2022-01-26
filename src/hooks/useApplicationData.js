import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
export function useApplicationData() {
  
function bookInterview(id, interview) {
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
        setState({
          ...state,
          appointments,
        });
      }
    })
    .catch((err) => {
      console.log(err);
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
    .then((res) => {
      setState((prev) => ({
        ...prev,
        appointments,
      }));
      return res.status;
    })
    .catch((err) => {
      console.log(err);
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

return {state, setDay, bookInterview, cancelInterview}
}

