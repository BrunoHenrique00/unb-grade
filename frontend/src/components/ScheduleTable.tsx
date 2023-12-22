// @ts-nocheck

import TimeTable from 'react-timetable-events';
import { Events } from 'react-timetable-events/dist/types';

export default function ScheduleTable({ events }: { events: Events }) {
  return (
    <div className="table-schedules">
      <TimeTable
        id="table"
        events={events}
        timeLabel="Sua Grade"
        style={{
          height: '500px',
          marginTop: 30,
        }}
        renderEvent={({ event, classNames, defaultAttributes }) => {
          return (
            <div
              {...defaultAttributes}
              title={event.name}
              key={event.id}
              style={{
                ...defaultAttributes.style,
                background: '#' + event.bgColor,
              }}
            >
              <span className={classNames.event_info}>{event.name}</span>
              <span className={classNames.event_info}>
                {`${event.startTime.getHours()}:${event.startTime.getMinutes()}`}{' '}
                - {`${event.endTime.getHours()}:${event.endTime.getMinutes()}`}
              </span>
              <span className={classNames.event_info}>{event.place}</span>
            </div>
          );
        }}
      />
    </div>
  );
}
