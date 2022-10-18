import useSWR from "swr";
import { fetcher } from "../fetcher";

export function Events() {
  return useSWR("/api/events", fetcher);
}
