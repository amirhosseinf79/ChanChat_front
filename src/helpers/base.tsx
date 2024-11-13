import { useState } from "react";
import responseType from "../types/response";

export default function BaseHelper() {
  const [data, setData] = useState<responseType>();
  const [error, setError] = useState<responseType>();
  const [loading, setLoading] = useState<boolean>(false);

  return { data, error, loading, setData, setError, setLoading };
}
