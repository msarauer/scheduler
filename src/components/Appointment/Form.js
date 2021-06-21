import React, { useState } from "react";
import Button from "../Button";
import InterviewerList from "../InterviewerList";

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.value || null);
  const [error, setError] = useState("");

  //reset the name and interviewer to blank
  const reset = () => {
    setName("");
    setInterviewer(null);
  };

  //cancel an appointment function
  const cancel = () => {
    reset();
    props.onCancel();
  };

  //ensures a name and interviewer is entered and then saves the appointment
  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    } else if (!interviewer) {
      setError("You must select an interviewer");
      return;
    }

    setError("");
    props.onSave(name, interviewer);
  }

  return (
    <div>
      <main className="appointment__card appointment__card--create">
        <section className="appointment__card-left">
          <form autoComplete="off">
            <input
              className="appointment__create-input text--semi-bold"
              name="name"
              type="text"
              value={name}
              placeholder="Enter Student Name"
              onChange={(event) => setName(event.target.value)}
              data-testid="student-name-input"
            />
          </form>
          <section className="appointment__validation">{error}</section>
          <InterviewerList
            interviewers={props.interviewers}
            value={interviewer}
            onChange={(event) => setInterviewer(event)}
          />
        </section>
        <section className="appointment__card-right">
          <section className="appointment__actions">
            <Button danger onClick={cancel}>
              Cancel
            </Button>
            <Button
              confirm
              onSubmit={(event) => event.preventDefault()}
              onClick={(event) => validate()}
            >
              Save
            </Button>
          </section>
        </section>
      </main>
    </div>
  );
}
