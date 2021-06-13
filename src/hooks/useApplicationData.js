import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

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
  
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null 
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`) 
    .then((res) => {
      setState(prev => ({
        ...prev,
        appointments,
        days: updateSpots(id, 1)
      }))
      return res;
    })
  }

  function bookInterview(id, interview, mode) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const updateDays = (mode === 'CREATE') ? ({days: updateSpots(id, -1)}) : {};
    
    return axios.put(`/api/appointments/${id}`, {interview: interview})
      .then((res) => {
        setState({
          ...state,
          appointments,
          ...updateDays
        })
        return res;
      })
  }
  const updateSpots = function(id, sign) {

    const day = Math.ceil(id / 5);
  
    const dayObj = state.days.find(item => item.id === day);
  
    const modifiedObj = {
      ...dayObj,
      spots: (dayObj.spots + sign)
    };
    
    const daysArray = [...state.days];
  
    daysArray[day - 1] = modifiedObj;
  
    return daysArray;
  
  };

  return { cancelInterview, bookInterview, setDay, state }
}