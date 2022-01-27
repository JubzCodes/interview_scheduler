export function getAppointmentsForDay(state, day) {
  const answer = [];
  const apptDay = state.days.filter((appt) => appt.name === day);
  if (apptDay[0] === undefined) {
    return answer;
  }
  const appts = apptDay[0]["appointments"];
  for (let i = 0; i < appts.length; i++) {
    answer.push(state["appointments"][appts[i]]);
  }
  return answer;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  let obj = { student: interview.student, interviewer: {} };
  const picker = interview["interviewer"].toString();
  for (const ints in state.interviewers) {
    const add = state.interviewers[picker];
    obj.interviewer = add;
    return obj;
  }
}

export function getInterviewersForDay(state, day) {
  const answer = [];
  const apptDay = state.days.filter((appt) => appt.name === day);
  if (apptDay[0] === undefined) {
    return answer;
  }
  const appts = apptDay[0].interviewers;
  for (let i = 0; i < appts.length; i++) {
    answer.push(state.interviewers[appts[i]]);
  }
  return answer;
}

// export function getSpotsForDay(day, appointments) {
//   let spots = 0;
//   //iterate the days appointments id's
//   for (const id of dayObj.appointments) {
//     const appointment = appointments[id];
//     if (!appointment.interview) {
//       spots++;
//     }
//   }
//   return spots;
// };

// export function updateSpots (state, appointments, id) {
//     // Get day object
//     const dayObj = state.days.find((day) => day.name === state.day);
//     const spots = getSpotsForDay(dayObj, appointments);
//     const day = { ...dayObj, spots };
//     const newDays = newDays.map((d) => (d.name === state.day ? day : d));

//     // return days array
//     return newDays;
//   };
  