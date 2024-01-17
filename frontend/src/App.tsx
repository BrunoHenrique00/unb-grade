// @ts-nocheck

import { useState } from 'react';
import Select, { MultiValue } from 'react-select';
import './App.css';
import turmas from '../data/turmas.json';
import ScheduleTable from './components/ScheduleTable';
import parseTimeCode from './helpers/parseTimeCode';
import { isDatesEquals } from './helpers/compareDates';
import {
  ClassProps,
  parseClassesToEvents,
  parseClasses,
} from './helpers/parseClasses';
import Footer from './components/Footer';

const selectOptions = turmas.map(item => ({
  value: item.id,
  label: `${item.name} - ${item.teacher} (${item.time})`,
}));

// Check if mobile, desktop has better UX
const isMobile = window.innerWidth <= 768;

if (isMobile) {
  window.alert(
    'Parece que você está usando um telefone, para ter uma melhor experiencia usa um computador! :)',
  );
}

function App() {
  const [classes, setClasses] = useState<ClassProps[]>(
    JSON.parse(localStorage.getItem('classes') || '[]'),
  );

  function handleAddClass(
    newClasses: MultiValue<{ value: string; label: string }>,
  ) {
    const classesParsed = parseClasses(newClasses);
    const aux: ClassProps[] = [];

    classesParsed.forEach(element => {
      const timeParsed = parseTimeCode(element.timeCode);
      const days = timeParsed.dayCode.split('');

      let eventFound = undefined;

      days.forEach(day => {
        if (Object.keys(events).includes(day)) {
          eventFound = events[day].find(
            (event: ClassProps) =>
              isDatesEquals(event.schedule.startTime, timeParsed.startTime) &&
              event.id !== element.id,
          );
        }
      });

      if (eventFound !== undefined) {
        alert(`Choque de horário entre ${element.name} e ${eventFound.name}`);
        return null;
      }

      aux.push({
        ...element,
        schedule: timeParsed,
        startTime: timeParsed.startTime,
        endTime: timeParsed.endTime,
      });
    });

    localStorage.setItem('classes', JSON.stringify(aux));
    setClasses(aux);
  }

  const events = parseClassesToEvents(classes);

  const totalHours = classes.reduce((acc, current) => {
    return acc + parseInt(current.workload);
  }, 0);

  return (
    <>
      <div className="title-box">
        <h1>UNB: GRADE - FGA</h1>
        <div className="total-hours">
          <h2>Total de horas:</h2>
          <span>{totalHours}h</span>
          <a
            href="http://software.unb.br/images/ESW/grade_curricular.png"
            target="_blank"
          >
            Fluxograma - Software
          </a>
        </div>
      </div>

      <div style={{ zIndex: 3, position: 'relative' }}>
        <Select
          value={classes.map(item => ({
            value: item.id,
            label: `${item.name} - ${item.teacher} (${item.time})`,
          }))}
          options={selectOptions}
          isMulti
          onChange={props => handleAddClass(props)}
        />
      </div>

      <ScheduleTable events={events} />

      <Footer />
    </>
  );
}

export default App;
