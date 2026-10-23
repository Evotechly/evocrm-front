import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { DayPicker, type DayPickerProps } from 'react-day-picker';
import { cn } from '../utils/cn';

export function Calendar({ className, ...props }: DayPickerProps) {
  return (
    <DayPicker
      className={cn('ev-calendar', className)}
      navLayout="around"
      components={{
        Chevron: ({ orientation }) =>
          orientation === 'left' ? <CaretLeft size={16} /> : <CaretRight size={16} />,
      }}
      {...props}
    />
  );
}
