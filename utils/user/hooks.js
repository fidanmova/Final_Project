import useSWR from "swr";
import { fetcher } from "../fetcher";

export function useCurrentUser() {
  return useSWR("/api/user", fetcher);
}

export function useUser(id) {
  return useSWR(`/api/users/${id}`, fetcher);
}

// export function useUser(username) {
//   return useSWR(`/api/users/${username}`, fetcher);
// }
