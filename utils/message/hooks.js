import { fetcher } from "../fetcher";
import useSWRInfinite from "swr/infinite";

//! DOES NOT WORK: req.query CHATID needs to be accessed
export function useMessagePages({ chatId, limit = 10 } = {}) {
  const { data, error, size, ...props } = useSWRInfinite(
    (index, previousPageData) => {
      // reached the end
      if (previousPageData && previousPageData.messages.length === 0)
        return null;

      const searchParams = new URLSearchParams();
      searchParams.set("limit", limit);
      searchParams.set("chatId", req.query.chatId);

      if (chatId) searchParams.set("by", chatId);

      if (index !== 0) {
        const before = new Date(
          new Date(
            previousPageData.messages[
              previousPageData.messages.length - 1
            ].createdAt
          ).getTime()
        );

        searchParams.set("before", before.toJSON());
      }

      // static example:
      // return `/api/chats/6368c6c70bf7e5d7c69a1d47/messages`;
      return `/api/chats?${searchParams.toString()}/messages`;
    },
    fetcher,
    {
      refreshInterval: 10000,
      revalidateAll: false,
    }
  );

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.messages?.length < limit);
  return {
    data,
    error,
    size,
    isLoadingMore,
    isReachingEnd,
    ...props,
  };
}
