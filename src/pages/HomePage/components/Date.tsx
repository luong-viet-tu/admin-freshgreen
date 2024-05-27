import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

interface DateProps {
  setDate: (date: Dayjs | null) => void;
}

export const Date = (props: DateProps) => {
  const { setDate } = props;

  const handleChange = (e: any) => {
    setDate(e);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar onChange={handleChange} />
    </LocalizationProvider>
  );
};

export default Date;
