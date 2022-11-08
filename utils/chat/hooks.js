import { fetcher } from "../fetcher";
import useSWRInfinite from "swr/infinite";
import useSWR from "swr";

export function useAllChats() {
  return useSWR("/api/chats", fetcher);
}

export function useChat(id) {
  return useSWR(`/api/chats/${id}`, fetcher);
}

export function useUsersChats() {
  return useSWR(`/api/chats/getUsersChats`, fetcher);
}

export function useChatPages({ currentUser, limit = 10 } = {}) {
  const { data, error, size, ...props } = useSWRInfinite(
    (index, previousPageData) => {
      // reached the end
      if (previousPageData && previousPageData.posts.length === 0) return null;

      const searchParams = new URLSearchParams();
      searchParams.set("limit", limit);

      if (currentUser) searchParams.set("by", currentUser);

      if (index !== 0) {
        // using oldest posts createdAt date as cursor
        // We want to fetch posts which has a date that is
        // before (hence the .getTime()) the last post's createdAt
        const before = new Date(
          new Date(
            previousPageData.chats[previousPageData.chats.length - 1].createdAt
          ).getTime()
        );

        searchParams.set("before", before.toJSON());
      }

      return `/api/chats/getUsersChats?${searchParams.toString()}`;
      // return `/api/chats/getUsersChats`;
    },
    fetcher,
    { refreshInterval: 10000, revalidateAll: false }
  );

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.chats?.length < limit);

  return {
    data,
    error,
    size,
    isLoadingMore,
    isReachingEnd,
    ...props,
  };
}
