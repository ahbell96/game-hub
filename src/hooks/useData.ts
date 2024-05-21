import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { AxiosError, AxiosRequestConfig, CanceledError } from "axios";

interface FetchResponse<T> {
  count: number;
  results: T[];
}

const useData = <T>(
  endpoint: string,
  requestConfig?: AxiosRequestConfig,
  deps?: any[]
) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(
    () => {
      setIsLoading(true);
      const controller = new AbortController();

      const fetchGames = async () => {
        try {
          const response = await apiClient.get<FetchResponse<T>>(endpoint, {
            signal: controller.signal,
            ...requestConfig,
          });

          setData(response.data.results);
        } catch (err) {
          if (err instanceof CanceledError) return;
          setError((err as AxiosError).message);
        }

        setIsLoading(false);

        return () => controller.abort();
      };

      fetchGames();
    },
    deps ? [...deps] : []
  );

  return { data, error, isLoading };
};

export default useData;
