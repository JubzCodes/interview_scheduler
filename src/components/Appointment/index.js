import React from "react";
import useVisualMode from "hooks/useVisualMode";
import { Fragment } from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import "./styles.scss";
import InterviewerListItem from "components/InterviewerListItem";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE="ERROR_SAVE";
const ERROR_DELETE="ERROR_DELETE";

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

  function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer,
    };
    bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch(() =>  {
      return transition(ERROR_SAVE, true)
      })

  }

  const deleteAppointment = () => {
    transition(DELETING, true);
    cancelInterview(id, interview)
      .then(() => transition(EMPTY))
      .catch(() => {
      return transition(ERROR_DELETE, true)
      })

  };

  console.log("app props ", interview);
  return (
    <article className="appointment">
      <Header time={time} />
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer.name}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CONFIRM && (
        <Confirm
          message="ARE YOU SURE YOU WANT TO DELETE"
          onConfirm={deleteAppointment}
          onCancel={() => back()}
        />
      )}
      {mode === SAVING && <Status message="SAVING" />}
      {mode === DELETING && <Status message="DELETING" />}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === EDIT && (
        <Form
          student={interview.student}
          interviewers={interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message="Could not save appointment" onClose={() => back()} />
      )}
      {mode === ERROR_DELETE && (
        <Error message="Could not cancel appointment" onClose={() => back()} />
      )}
    </article>
  );
}
