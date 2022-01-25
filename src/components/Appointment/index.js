import React from "react";
import useVisualMode from "hooks/useVisualMode";
import { Fragment } from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import "./styles.scss";
import InterviewerListItem from "components/InterviewerListItem";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";

export default function Appointment(props) {
  const {
    id,
    interviewer,
    time,
    interview,
    interviewers,
    bookInterview,
    cancelInterview,
  } = props;
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);
  const message = "SAVING";
  
  function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer,
    };
    bookInterview(id, interview).then(() => transition(SHOW));
  }
  console.log("app props ", interview);
  return (
    <article className="appointment">
      <Header time={time} />
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer.name}
        />
      )}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message={message} />}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={() => back(EMPTY)}
          bookInterview={bookInterview}
          onSave={save}
        />
      )}
    </article>
  );
}
