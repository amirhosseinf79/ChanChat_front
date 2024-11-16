import ApiService from "../services/base-api";
import BaseHelper from "./base";

interface prp<T> {
  fields: T;
  url: `/${string}`;
}

export function GetFetch<T>({ fields, url }: prp<T>) {
  const { data, error, loading, setData, setError, setLoading } = BaseHelper();

  async function handleFetch() {
    setLoading(true);
    setData(undefined);
    setError(undefined);
    try {
      const api = new ApiService();
      const q_string_keys = Object.keys(fields as any);
      const q_string = q_string_keys
        .map((k: string) => `${k}=${(fields as any)[k]}`)
        .join("&");
      const raw_url: any = `${url}?${q_string}`;
      const raw_data = await api.fetchApi("GET", raw_url, undefined, true);
      setData(raw_data);
    } catch (e: any) {
      setError(e);
    }
    setLoading(false);
  }

  return { data, error, loading, handleFetch };
}
