import React from 'react';
import { DayPicker } from 'react-day-picker';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CalendarProps {
  selected?: Date | null;
  onSelect?: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
}

export const Calendar: React.FC<CalendarProps> = ({
  selected,
  onSelect,
  minDate,
  maxDate,
  className,
}) => {
  return (
    <DayPicker
      mode="single"
      selected={selected}
      onSelect={onSelect}
      fromDate={minDate}
      toDate={maxDate}
      className={cn("p-3", className)}
      showOutsideDays={true}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium text-gray-900",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-gray-500 rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-gray-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          "h-9 w-9 p-0 font-normal text-gray-900 aria-selected:opacity-100",
          "hover:bg-gray-100 hover:text-gray-900 rounded-md transition-colors"
        ),
        day_selected: cn(
          "bg-gradient-to-r from-[#00C2CB] to-[#2940D3] text-white hover:bg-none hover:from-[#00C2CB] hover:to-[#2940D3] hover:text-white focus:bg-primary focus:text-white"
        ),
        day_today: "bg-gray-100 text-gray-900",
        day_outside: "text-gray-500",
        day_disabled: "text-gray-400 opacity-50 cursor-not-allowed",
        day_range_middle: "aria-selected:bg-gray-100 aria-selected:text-gray-900",
        day_hidden: "invisible",
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-4 w-4 text-gray-600" />,
        IconRight: () => <ChevronRight className="h-4 w-4 text-gray-600" />,
      }}
    />
  );
};