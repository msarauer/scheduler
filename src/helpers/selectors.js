export default function getAppointmentsForDay(selector, day) {
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

