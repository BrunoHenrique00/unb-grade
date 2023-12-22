const regexClassSchedules = /^([2-7]{1,6})([M|T|N])([1-7]{1,7})$/;

const mapPeriods = {
  M: [
    { start: '08:00', end: '08:50' },
    { start: '09:00', end: '09:50' },
    { start: '10:00', end: '10:50' },
    { start: '11:00', end: '11:50' },
    { start: '12:00', end: '13:00' },
  ],
  T: [
    { start: '13:00', end: '13:50' },
    { start: '14:00', end: '14:50' },
    { start: '15:00', end: '15:50' },
    { start: '16:00', end: '16:50' },
    { start: '17:00', end: '17:50' },
    { start: '18:00', end: '18:50' },
    { start: '19:00', end: '19:50' },
  ],
  N: [
    { start: '19:00', end: '19:50' },
    { start: '20:00', end: '20:40' },
    { start: '20:50', end: '21:40' },
    { start: '21:50', end: '22:30' },
  ],
};

function getStartAndEndTimeFromSchedule(period: string, hourCode: string) {
  // @ts-ignore
  const periodArray = mapPeriods[period];
  const startHourIndex = parseInt(hourCode[0]) - 1;
  const endHourIndex = parseInt(hourCode[hourCode.length - 1]) - 1;
  const startTime = periodArray[startHourIndex].start;
  const endTime = periodArray[endHourIndex].end;

  const startDate = new Date();
  startDate.setHours(parseInt(startTime.split(':')[0]));
  startDate.setMinutes(0);
  startDate.setMilliseconds(0);

  const endDate = new Date();
  endDate.setHours(parseInt(endTime.split(':')[0]));
  // Caso especial pra meio dia
  endDate.setMinutes(parseInt(hourCode === '5' ? 50 : endTime.split(':')[1]));
  endDate.setMilliseconds(0);

  return { startTime: startDate, endTime: endDate };
}

export default function parseTimeCode(code: string) {
  const [dayCode, timeCode, hourCode] = code
    .split(regexClassSchedules)
    .filter(item => item !== '');

  const { startTime, endTime } = getStartAndEndTimeFromSchedule(
    timeCode,
    hourCode,
  );

  return {
    dayCode,
    startTime,
    endTime,
  };
}
