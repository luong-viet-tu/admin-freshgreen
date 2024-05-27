import moment from "moment";

export const formatDateInput = (date: Date | string | undefined) => {
  return date ? moment(date).format("YYYY-MM-DD") : "";
};
