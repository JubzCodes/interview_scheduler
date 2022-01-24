import React from "react";
import { useState } from 'react';
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";


export default function Form(props) {
  
  const { student, interviewer, interviewers, onSave, onCancel } = props;

  const [studentName, setStudent] = useState(student || "");
  const [interviewerID, setInterviewer] = useState(interviewer || null);
  
  const reset= () => {
    setStudent("");
    setInterviewer("");
    onCancel();
  }

  const cancel =()=> {
    reset();
  }

  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        value={studentName}
        onChange={(event) =>setStudent(event.target.value)}
      />
    </form>
    <InterviewerList 
    interviewers={interviewers} 
    selected = {interviewerID}
    value={interviewerID}
    onChange={setInterviewer}
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={()=> cancel()}>Cancel</Button>
      <Button confirm onClick={()=> onSave}>Save</Button>
    </section>
  </section>
  </main>
  )

}