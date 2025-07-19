"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export interface CalendarProps {
  className?: string;
  classNames?: Record<string, string>;
  showOutsideDays?: boolean;
  selected?: Date | Date[];
  onSelect?: (date: Date | Date[] | null) => void;
  mode?: "single" | "multiple" | "range";
  disabled?: (date: Date) => boolean;
  [key: string]: any;
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  selected,
  onSelect,
  mode = "single",
  disabled,
  ...props
}: CalendarProps) {
  const handleDateChange = (date: Date | Date[] | null) => {
    if (onSelect) {
      onSelect(date);
    }
  };

  const customInput = React.forwardRef<HTMLDivElement>((props, ref) => (
    <div
      ref={ref}
      className={cn(
        "w-full border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-md cursor-pointer",
        className
      )}
      {...props}
    />
  ));

  const datePickerProps: any = {
    selected: Array.isArray(selected) ? selected[0] : selected,
    onChange: handleDateChange,
    filterDate: disabled ? (date: Date) => !disabled(date) : undefined,
    customInput: customInput,
    calendarClassName: cn(
      "border border-border bg-background p-3 shadow-md rounded-md",
      classNames?.calendar
    ),
    dayClassName: (date: Date) =>
      cn(
        "h-9 w-9 p-0 font-normal text-sm rounded-md hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        date.toDateString() === new Date().toDateString() &&
          "bg-accent text-accent-foreground",
        Array.isArray(selected)
          ? selected.some((d) => d?.toDateString() === date.toDateString()) &&
              "bg-primary text-primary-foreground"
          : selected?.toDateString() === date.toDateString() &&
              "bg-primary text-primary-foreground"
      ),
    ...props,
  };

  if (mode === "range") {
    return (
      <DatePicker
        {...datePickerProps}
        selectsRange
        startDate={Array.isArray(selected) ? selected[0] : undefined}
        endDate={Array.isArray(selected) ? selected[1] : undefined}
      />
    );
  }

  if (mode === "multiple") {
    return (
      <DatePicker
        {...datePickerProps}
        multiple
        selectedDates={
          Array.isArray(selected) ? selected : selected ? [selected] : []
        }
      />
    );
  }

  return <DatePicker {...datePickerProps} />;
}

Calendar.displayName = "Calendar";

export { Calendar };
