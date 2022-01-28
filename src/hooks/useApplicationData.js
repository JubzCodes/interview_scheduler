import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
export function useApplicationData() {
  function bookInterview(id, interview) {
    const add = !state.appointments[id].interview;
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
    const add = !state.appointments[id].interview;
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


  // export function
  // const getSpotsForDay = function (day, appointments) {
  //   let spots = 0;
  //   for (const id of day.appointments) {
  //     const appointment = appointments[id];
  //     if (!appointment.interview) {
  //       spots++;
  //     }
  //   }
  //   return spots;
  // }; //iterate the days appointments id's

  // const updateSpots = function (state, appointments, id) {
  //   // Get day object
  //   const dayObj = state.days.find((day) => day.name === state.day);
  //   const spots = getSpotsForDay(dayObj, appointments);
  //   const day = { ...dayObj, spots };
  //   const newDays = state.days.map((d) => (d.name === state.day ? day : d));

  //   // return days array
  //   return newDays;
  // };

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
