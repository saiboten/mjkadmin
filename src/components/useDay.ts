import useSWR from "swr";
import { DayResponse, getDayDetails } from "../api/adminApi";

export const useDay = (revealDateAsString: string) => {
  return useSWR<DayResponse, any>(`day/${revealDateAsString}`, getDayDetails);
};
