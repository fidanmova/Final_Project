import useSWR from "swr";
import { fetcher } from "../fetcher";

export function CircleUser() {
  return useSWR("/api/circle/circle", fetcher);
}
