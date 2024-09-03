
import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch");
    }
    return res.json();
  });

export const useConfessionSWR = (path: string, options = {}) => {
  const { data, error, mutate } = useSWR(path, fetcher, options);

  const isLoading = !error && !data;

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};


