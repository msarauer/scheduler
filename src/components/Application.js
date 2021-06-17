import React from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewsForDay,
} from "../helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
  //destructure the exports from the useApplicationData custom hook
  const { state, setDay, bookInterview, cancelInterview } =
    useApplicationData();

  //gets the daily appointments and interviewers to pass to the appointments array
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewsForDay(state, state.day);
  const appointmentArray = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    //sets up each daily appointment
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentArray}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
