import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  //initialize the states
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  //function for setting the day state
  const setDay = (day) => setState({ ...state, day });

  //useEffect to populate the days, appointments, and interviewers states
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  //function to cancel an interview (set the appointment interview state to null)
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    //axios delete of appoinetment, then setState for appointments and update the spots remaining
    return axios.delete(`/api/appointments/${id}`).then((res) => {
      setState((prev) => ({
        ...prev,
        appointments,
        days: updateSpots(id, 1),
      }));
      return res;
    });
  }
  //book an interview (add it to state)
  function bookInterview(id, interview, mode) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    //if this is a new appointment, remove one available spot from the day
    const updateDays = mode === "CREATE" ? { days: updateSpots(id, -1) } : {};

    //sends the updated interview to the appropriate appointment state and updates spots (if required)
    return axios
      .put(`/api/appointments/${id}`, { interview: interview })
      .then((res) => {
        setState({
          ...state,
          appointments,
          ...updateDays,
        });
        return res;
      });
  }

  //update the spots remaining function
  const updateSpots = function (id, sign) {
    //find the current day from the id
    const day = Math.ceil(id / 5);

    //find the day obj
    const dayObj = state.days.find((item) => item.id === day);

    //modified day obj with updated spots remaining
    const modifiedObj = {
      ...dayObj,
      spots: dayObj.spots + sign,
    };

    //copy of current days state
    const daysArray = [...state.days];

    //update the copy with modified day object
    daysArray[day - 1] = modifiedObj;

    return daysArray;
  };

  return { cancelInterview, bookInterview, setDay, state };
}
