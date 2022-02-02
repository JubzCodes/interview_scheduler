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
  const { interviewers } = state;

  if (interview) {
    const interviewer = interviewers[interview.interviewer];
    return { student: interview.student, interviewer };
  }

  return null;
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