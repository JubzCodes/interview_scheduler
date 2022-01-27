import React from "react";
import { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  const { student, interviewer, interviewers, onSave, onCancel } = props;

  const [studentName, setStudent] = useState(student || "");
  const [interviewerID, setInterviewer] = useState(interviewer || null);
  const [error, setError] = useState("");

  const reset = () => {
    setStudent("");
    setInterviewer(null);
  };

  const cancel = () => {
    reset();
    onCancel()
  };

  function validate () {
    if (!studentName) {
    setError("Cant do that!")
    return;
    }
  
    if (!interviewerID) {
      setError("gweh!")
      return;
    }
    setError("");
    onSave(studentName, interviewerID);
  }
  


  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={studentName}
            onChange={(event) => setStudent(event.target.value)}
          />
        </form>
        <section className="appointment__validation">
          {error}
        </section>
        <InterviewerList
          interviewers={interviewers}
          selected={interviewerID}
          value={interviewerID}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={validate}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
