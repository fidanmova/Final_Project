import useSWR from "swr";
import { fetcher } from "../fetcher";

export function useAllChats() {
  return useSWR("/api/chats", fetcher);
}

export function useChat(id) {
  return useSWR(`/api/chats/${id}`, fetcher);
}
