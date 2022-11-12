import { fetcher } from "../fetcher";
import useSWRInfinite from "swr/infinite";

export function useMessagePages({ chatId, limit = 10 } = {}) {
  const { data, error, size, ...props } = useSWRInfinite(
    () => {
      if (!chatId) {
        return null;
      } else {
        return `/api/singleChat/${chatId}/`;
      }
    },
    fetcher,
    {
      refreshInterval: 100,
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
