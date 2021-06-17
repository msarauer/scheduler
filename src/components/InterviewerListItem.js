import React from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss";

const InterviewerListItem = (props) => {
  const { name, avatar, selected, setInterviewer } = props;
  //sets a specific class if interviewer is selected
  let InterviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected,
  });

  return (
    <li className={InterviewerClass} onClick={setInterviewer}>
      <img className="interviewers__item-image" src={avatar} alt={name} />
      {selected && name}
    </li>
  );
};

export default InterviewerListItem;
