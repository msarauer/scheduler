import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";


import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = 'DELETE';
  const CONFIRM = 'CONFIRM';
  const EDIT = 'EDIT';
  const ERROR_SAVE = 'ERROR_SAVE';
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props.bookInterview(props.id, interview, mode)
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true));
  }

  function deleteApp() {
    if(mode === CONFIRM) {
      transition(DELETE, true);
      props.cancelInterview(props.id)
        .then(() => transition(EMPTY))
        .catch((error) => transition(ERROR_DELETE, true));
    } else transition(CONFIRM);
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={deleteApp}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={() => {back()}}/>}
      {mode === SAVING && <Status message="Saving..."/>}
      {mode === DELETE && <Status message="Deleting..."/>}
      {mode === CONFIRM && <Confirm message='Are you sure you would like to delete this appointment?' onConfirm={deleteApp} onCancel={back}/>}
      {mode === EDIT && <Form name={props.interview.student} value={props.interview.interviewer.id} interviewers={props.interviewers} onSave={save} onCancel={() => {back()}}/>}
      {mode === ERROR_SAVE && <Error message="Something went wrong. Save could not be completed." onClose={back}/>}
      {mode === ERROR_DELETE && <Error message="Something went wrong. Delete could not be completed." onClose={back}/>}
    </article>
  );
}

// name:String
// interviewers:Array
// interviewer:Number
// onSave:Function
// onCancel:Function
