export function getAppointmentsForDay(selector, day) {
  const dayObj = selector.days.filter(item => (day === item.name));
  if(dayObj[0]) {
    const appointmentArray = dayObj[0].appointments;
    const result = appointmentArray.map((item) => {
      return selector.appointments[item];
    })
    return result;
  }
  return [];
};

export function getInterview(state, interview) {
  if(!interview) return null;
  const interviewerId = interview.interviewer;
  const interviewObj = state.interviewers[interviewerId];
  return {...interview, interviewer: interviewObj};
};

export function getInterviewsForDay(selector, day) {
  const dayObj = selector.days.filter(item => (day === item.name));
  if(dayObj[0]) {
    const interviewerArray = dayObj[0].interviewers;
    const result = interviewerArray.map((item) => {
      return selector.interviewers[item];
    })
    return result;
  }
  return [];
};
