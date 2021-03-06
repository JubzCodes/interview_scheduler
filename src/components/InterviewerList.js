import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  const { interviewers, onChange, value } = props;
  const ints = interviewers.map((int) => (
    <InterviewerListItem
      key={int.id}
      name={int.name}
      avatar={int.avatar}
      selected={int.id === value}
      setInterviewer={() => onChange(int.id)}
    />
  ));


  // };
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{ints}</ul>
    </section>
  );
}
