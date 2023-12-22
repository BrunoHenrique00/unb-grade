// @ts-nocheck

import { MultiValue } from 'react-select';
import turmas from '../../data/turmas.json';
import parseTimeCode from './parseTimeCode';

export interface ClassProps {
  id: string;
  name: string;
  link: string;
  teacher: string;
  schedule: {
    dayCode: string;
    startTime: Date;
    endTime: Date;
  };
  startTime: Date;
  endTime: Date;
  time: string;
  timeCode: string;
  place: string;
  workload: string;
  classSize: string;
}

export interface Events {
  [k: string]: ClassProps[];
}

export function parseClasses(
  classes: MultiValue<{ value: string; label: string }>,
) {
  const classesParsed: ClassProps[] = classes.map(element => {
    const result = turmas.find(item => item.id === element.value);

    const timeParsed = parseTimeCode(result?.timeCode || '');

    if (result) return { ...result, schedule: timeParsed };
  });

  return classesParsed;
}

export function parseClassesToEvents(classes: ClassProps[]) {
  const events: Events = {
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
  };

  const colorBgDict = {};

  classes.forEach(item => {
    const days = item.schedule.dayCode.split('');

    if (!colorBgDict[item.id]) {
      // Create random color
      colorBgDict[item.id] = Math.floor(Math.random() * 16777215).toString(16);
    }

    days.forEach(day => {
      const { endTime, startTime } = parseTimeCode(item.timeCode);

      if (events[day].find(event => event.id === item.id)) return;

      events[day] = [
        ...events[day],
        {
          ...item,
          startTime,
          endTime,
          bgColor: colorBgDict[item.id],
        },
      ];
    });
  });

  return events;
}
