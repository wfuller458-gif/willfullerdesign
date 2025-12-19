import React from 'react';
import { FormButton } from './form-button';

export interface TimePickerProps {
  selectedTime?: string;
  onSelectTime?: (time: string) => void;
  bookedTimes?: string[];
}

const TIMESLOTS = [
  '7:30am',
  '8:00am',
  '5:00pm',
  '5:30pm',
  '6:00pm',
  '6:30pm',
  '7:00pm',
  '7:30pm'
];

export const TimePicker: React.FC<TimePickerProps> = ({
  selectedTime,
  onSelectTime,
  bookedTimes = []
}) => {
  // Split timeslots into two rows of 4
  const row1 = TIMESLOTS.slice(0, 4);
  const row2 = TIMESLOTS.slice(4, 8);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '100%',
        maxWidth: '467px'
      }}
    >
      <p
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400,
          fontSize: '14px',
          lineHeight: '140%',
          color: 'var(--brand-white)',
          margin: 0,
          letterSpacing: 0
        }}
      >
        Timeslot
      </p>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '6px'
        }}
      >
        {/* First row */}
        <div
          style={{
            display: 'flex',
            gap: '6px'
          }}
        >
          {row1.map((time) => {
            const isSelected = selectedTime === time;
            const isBooked = bookedTimes.includes(time);

            return (
              <FormButton
                key={time}
                variant="time"
                selected={isSelected}
                disabled={isBooked}
                onClick={() => !isBooked && onSelectTime?.(time)}
              >
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '140%',
                    margin: 0,
                    letterSpacing: 0,
                    whiteSpace: 'nowrap'
                  }}
                >
                  {time}
                </p>
              </FormButton>
            );
          })}
        </div>

        {/* Second row */}
        <div
          style={{
            display: 'flex',
            gap: '6px'
          }}
        >
          {row2.map((time) => {
            const isSelected = selectedTime === time;
            const isBooked = bookedTimes.includes(time);

            return (
              <FormButton
                key={time}
                variant="time"
                selected={isSelected}
                disabled={isBooked}
                onClick={() => !isBooked && onSelectTime?.(time)}
              >
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '140%',
                    margin: 0,
                    letterSpacing: 0,
                    whiteSpace: 'nowrap'
                  }}
                >
                  {time}
                </p>
              </FormButton>
            );
          })}
        </div>
      </div>
    </div>
  );
};
