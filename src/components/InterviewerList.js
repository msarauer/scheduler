import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from "prop-types";
import "components/InterviewerList.scss";

function InterviewerList(props) {
  const { interviewers, value, onChange } = props;
  //creates a list of interviewers
  const InterviewersList = interviewers.map((item) => {
    return (
      <InterviewerListItem
        key={item.id}
        name={item.name}
        avatar={item.avatar}
        selected={value === item.id}
        setInterviewer={(event) => onChange(item.id)}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{InterviewersList}</ul>
    </section>
  );
}
//ensures the prop type is an array
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};

export default InterviewerList;
