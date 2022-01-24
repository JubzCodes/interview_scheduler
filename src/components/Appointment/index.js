import React from "react";
import useVisualMode from "hooks/useVisualMode";
import { Fragment } from 'react'
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import "./styles.scss"
import InterviewerListItem from "components/InterviewerListItem";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE ="CREATE";


export default function Appointment(props) {
  
  const { student, interviewer, time, interview, interviewers } = props;
  const { mode, transition, back } = useVisualMode(
      interview ? SHOW : EMPTY
    );
    
  return (
    <article className="appointment">
      <Header time={time}/>
      {mode === SHOW && ( <Show student={student}
        interviewer={interviewer} />
        )}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}  
      {mode === CREATE && <Form interviewers={interviewers} onCancel={() => back(EMPTY)}/>}  
    </article> 
  )

}