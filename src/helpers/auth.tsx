import ApiService from "../services/base-api";
import BaseHelper from "./base";

interface prp<T> {
  fields: T;
  url: `/${string}`;
}

export function AuthUser<T>({ fields, url }: prp<T>) {
  const { data, error, loading, setData, setError, setLoading } = BaseHelper();

  async function handleFetch() {
    setLoading(true);
    setData(undefined);
    setError(undefined);
    try {
      const api = new ApiService();
      const raw_data = await api.fetchApi<T>("POST", url, fields, false);
      setData(raw_data);
    } catch (e: any) {
      setError(e);
    }
    setLoading(false);
  }

  return { data, error, loading, handleFetch };
}
