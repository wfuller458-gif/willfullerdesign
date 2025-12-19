import React, { useState, useEffect } from 'react';
import { FormButton } from './form-button';

export interface DatePickerProps {
  selectedDate?: Date;
  onSelectDate?: (date: Date) => void;
}

const getDaySuffix = (day: number): string => {
  if (day >= 11 && day <= 13) return 'th';
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
};

const formatDate = (date: Date) => {
  const day = date.toLocaleDateString('en-GB', { weekday: 'short' });
  const dayNum = date.getDate();
  const suffix = getDaySuffix(dayNum);
  const month = date.toLocaleDateString('en-GB', { month: 'short' });

  return {
    day,
    date: `${dayNum}${suffix}`,
    month
  };
};

const getWeekDates = (startDate: Date): Date[] => {
  const weekDates: Date[] = [];
  for (let i = 0; i < 6; i++) { // Mon-Sat = 6 days
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    weekDates.push(date);
  }
  return weekDates;
};

const getMondayOfWeek = (date: Date): Date => {
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day; // If Sunday, go back 6 days; otherwise go to Monday
  const monday = new Date(date);
  monday.setDate(date.getDate() + diff);
  monday.setHours(0, 0, 0, 0);
  return monday;
};

const isPastDate = (date: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const compareDate = new Date(date);
  compareDate.setHours(0, 0, 0, 0);
  return compareDate < today;
};

const isSameDay = (date1: Date, date2: Date): boolean => {
  return date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();
};

export const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onSelectDate
}) => {
  const [currentMonday, setCurrentMonday] = useState<Date>(getMondayOfWeek(new Date()));
  const [weekDates, setWeekDates] = useState<Date[]>([]);

  useEffect(() => {
    setWeekDates(getWeekDates(currentMonday));
  }, [currentMonday]);

  const handlePrevWeek = () => {
    const newMonday = new Date(currentMonday);
    newMonday.setDate(currentMonday.getDate() - 7);
    setCurrentMonday(newMonday);
  };

  const handleNextWeek = () => {
    const newMonday = new Date(currentMonday);
    newMonday.setDate(currentMonday.getDate() + 7);
    setCurrentMonday(newMonday);
  };

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
        Upcoming availability
      </p>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          alignItems: 'flex-end'
        }}
      >
        {/* Date buttons row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            gap: '5px'
          }}
        >
          {weekDates.map((date, index) => {
            const { day, date: dateStr, month } = formatDate(date);
            const isPast = isPastDate(date);
            const isSelected = selectedDate && isSameDay(date, selectedDate);

            return (
              <FormButton
                key={index}
                variant="date"
                selected={isSelected}
                disabled={isPast}
                onClick={() => !isPast && onSelectDate?.(date)}
              >
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 300,
                    fontSize: '12px',
                    lineHeight: '140%',
                    margin: 0,
                    letterSpacing: 0
                  }}
                >
                  {day}
                </p>
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '140%',
                    margin: 0,
                    letterSpacing: 0
                  }}
                >
                  {dateStr}
                </p>
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 300,
                    fontSize: '12px',
                    lineHeight: '140%',
                    margin: 0,
                    letterSpacing: 0
                  }}
                >
                  {month}
                </p>
              </FormButton>
            );
          })}
        </div>

        {/* Navigation buttons */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            height: '32px'
          }}
        >
          <button
            onClick={handlePrevWeek}
            style={{
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '2px',
              padding: '4px',
              background: 'transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="var(--brand-white)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={handleNextWeek}
            style={{
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '2px',
              padding: '4px',
              background: 'transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="var(--brand-white)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
