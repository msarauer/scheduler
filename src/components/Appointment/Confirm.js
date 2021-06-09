import React from "react";
import Button from '../Button';

export default function Confirm(props) {
  
  const { message, onConfirm, onCancel } = props;
  
  return (
    <div>
      <main className="appointment__card appointment__card--confirm">
        <h1 className="text--semi-bold">{message}</h1>
        <section className="appointment__actions">
          <Button danger onClick={onCancel}>Cancel</Button>
          <Button danger onClick={onConfirm}>Confirm</Button>
        </section>
      </main>
    </div>
  );
}



// props ----------------------
// message:String eg. "Delete the appointment?"
// onConfirm:Function to be called when the user clicks the Confirm button
// onCancel:Function to be called when the user clicks the Cancel button