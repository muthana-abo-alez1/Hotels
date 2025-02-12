import React from "react";
import { Popover } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Dayjs } from "dayjs";

interface DateCalendarPopoverProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  selectedDate: Dayjs | null;
  onDateChange: (date: Dayjs | null) => void;
}

const DateCalendarPopover: React.FC<DateCalendarPopoverProps> = ({
  open,
  anchorEl,
  onClose,
  selectedDate,
  onDateChange,
}) => {
  const shouldDisableDate = (date: Dayjs) => {
    return date.isBefore(new Date(), "day"); 
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={selectedDate}
          onChange={(newValue) => {
            onDateChange(newValue);
            onClose();
          }}
          shouldDisableDate={shouldDisableDate} 
        />
      </LocalizationProvider>
    </Popover>
  );
};

export default DateCalendarPopover;
