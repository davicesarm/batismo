"use client";

import { FaCalendar } from "react-icons/fa";
import {
  Button,
  DateRangePicker,
  Dialog,
  Group,
  Popover,
  DateValue,
} from "react-aria-components";

import type { RangeValue } from "@react-types/shared";

import { cn } from "@/lib/utils";
import { RangeCalendar } from "./calendar-rac";
import { DateInput, dateInputStyle } from "./datefield-rac";

interface DateRangePickerCompProps {
  onChange?: (value: RangeValue<DateValue> | null) => void;
}

export default function DateRangePickerComp({
  onChange,
}: DateRangePickerCompProps) {
  return (
    <DateRangePicker className="*:not-first:mt-2" onChange={onChange}>
      <div className="flex">
        <Group className={cn(dateInputStyle, "pe-9")}>
          <DateInput slot="start" unstyled />
          <span aria-hidden="true" className="text-muted-foreground/70 px-2">
            -
          </span>
          <DateInput slot="end" unstyled />
        </Group>
        <Button className="cursor-pointer text-muted-foreground hover:text-foreground data-focus-visible:border-ring data-focus-visible:ring-ring/50 z-10 -ms-9 -me-px flex w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none data-focus-visible:ring-[3px]">
          <FaCalendar size={12} />
        </Button>
      </div>
      <Popover
        className="bg-background text-popover-foreground data-entering:animate-in data-exiting:animate-out data-[entering]:fade-in-0 data-[exiting]:fade-out-0 data-[entering]:zoom-in-95 data-[exiting]:zoom-out-95 data-[placement=bottom]:slide-in-from-top-2 data-[placement=left]:slide-in-from-right-2 data-[placement=right]:slide-in-from-left-2 data-[placement=top]:slide-in-from-bottom-2 z-50 rounded-md border shadow-lg outline-hidden"
        offset={4}>
        <Dialog className="max-h-[inherit] overflow-auto p-2">
          <RangeCalendar />
        </Dialog>
      </Popover>
    </DateRangePicker>
  );
}
