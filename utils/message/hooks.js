import { fetcher } from "../fetcher";
import useSWRInfinite from "swr/infinite";

//! Works:
export function useMessagePages({ chatId, limit = 10 } = {}) {
  // console.log("chatID from Message Hook Top: ", chatId);
  const { data, error, size, ...props } = useSWRInfinite(
    () => {
      return `/api/singleChat/${chatId}/`;
    },
    fetcher,
    {
      refreshInterval: 1000,
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
