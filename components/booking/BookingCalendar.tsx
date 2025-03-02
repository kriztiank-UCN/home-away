/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { DateRange } from "react-day-picker";
// Zustand
import { useProperty } from "@/utils/store";

import {
  generateDisabledDates,
  generateDateRange,
  defaultSelected,
  generateBlockedPeriods,
} from "@/utils/calendar";

function BookingCalendar() {
  const currentDate = new Date();
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);
  // Zustand
  const bookings = useProperty(state => state.bookings);
  const { toast } = useToast();
  // Blocked Periods/Dates
  const blockedPeriods = generateBlockedPeriods({
    bookings,
    today: currentDate,
  });
  // Unavailable Dates
  const unavailableDates = generateDisabledDates(blockedPeriods);
  console.log(unavailableDates);

  useEffect(() => {
    const selectedRange = generateDateRange(range);
    selectedRange.some(date => {
      if (unavailableDates[date]) {
        setRange(defaultSelected);
        toast({
          description: "Some dates are booked. Please select again.",
        });
        return true;
      }
      return false;
    });
    useProperty.setState({ range });
  }, [range]);

  return (
    <Calendar
      mode='range'
      defaultMonth={currentDate}
      selected={range}
      onSelect={setRange}
      className='mb-4'
      // add disabled
      disabled={blockedPeriods}
    />
  );
}
export default BookingCalendar;
