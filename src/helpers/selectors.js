export function getAppointmentsForDay(selector, day) {
  //find specific day in days selector
  const dayObj = selector.days.filter((item) => day === item.name);

  if (dayObj[0]) {
    //create an array of the days appointments
    const appointmentArray = dayObj[0].appointments;
    const result = appointmentArray.map((item) => {
      return selector.appointments[item];
    });
    return result;
  }
  return [];
}

export function getInterview(state, interview) {
  //returns an object with specific interview information, if an interview exists
  if (!interview) return null;
  const interviewerId = interview.interviewer;
  const interviewObj = state.interviewers[interviewerId];
  return { ...interview, interviewer: interviewObj };
}

export function getInterviewsForDay(selector, day) {
  //find specific day in days selector
  const dayObj = selector.days.filter((item) => day === item.name);
  if (dayObj[0]) {
    //create an array of the days interviews
    const interviewerArray = dayObj[0].interviewers;
    const result = interviewerArray.map((item) => {
      return selector.interviewers[item];
    });
    return result;
  }
  return [];
}
