import React, {useState } from "react";
import Button from "../Button"
import InterviewerList from '../InterviewerList';

export default function Form(props) {
  
  

  const [name, setName] = useState("");
  const [interviewer, setInterviewer] = useState(null);
  
  return (
    <div>
      <main className="appointment__card appointment__card--create">
        <section className="appointment__card-left">
          <form autoComplete="off">
            <input
              className="appointment__create-input text--semi-bold"
              name="name"
              type="text"
              value={props.name}
              placeholder="Enter Student Name"
              /*
          This must be a controlled component
        */
            />
          </form>
          <InterviewerList
            interviewers={props.interviewers}
            value={interviewer}
            onChange={setInterviewer}
          />
        </section>
        <section className="appointment__card-right">
          <section className="appointment__actions">
            <Button danger onCancel={props.onCancel}>Cancel</Button>
            <Button confirm onSave={props.onSave}>Save</Button>
          </section>
        </section>
      </main>
    </div>
  );
}


// As part of our Edit story, the Form component should take the following props:

// name:String
// interviewers:Array
// interviewer:Number
// onSave:Function
// onCancel:Function
// As part of our Create story, the Form component should take the following props:

// interviewers:Array
// onSave:Function
// onCancel:Function
