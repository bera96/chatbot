import { DateTime } from "luxon";

export const formatTime = (isoString: string) => {
  const dateTime = DateTime.fromISO(isoString).setZone("local");
  return dateTime.isValid ? dateTime.toFormat("HH:mm") : "";
};
