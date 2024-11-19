import { useEffect, useReducer, useState } from "react";
import errorType from "../../types/error";
import { formReducer } from "../contexts/form-reducer";
import { messageFilterT, messageListT } from "../../types/message";
import { chatFilterT, ChatListT } from "../../types/chat";
import { GetFetch } from "../../helpers/get-fetch";

type t1 = messageListT | ChatListT;
type t2 = messageFilterT | chatFilterT;

export default function useAppBase<T1 extends t1, T2 extends t2>(
  initFilter: T2,
  appUrl: `/${string}`,
  notFoundMsg: string
) {
  const [canFetch, setFetch] = useState(true);
  const [raw_data, setData] = useState<T1>();
  const [raw_error, setError] = useState<errorType>();
  const [fields, setFields] = useReducer<(s: T2, a: T2) => T2>(
    formReducer<T2>,
    initFilter
  );
  const { data, error, handleFetch, loading } = GetFetch<T2>({
    url: appUrl,
    fields,
  });

  const hasNext = () => {
    return raw_data && fields.limit ? raw_data.total > fields.limit : false;
  };

  const handleNextPage = () => {
    if (hasNext() && raw_data) {
      const filter = { offset: raw_data.limit, limit: raw_data.limit! + 10 };
      setFields(filter as T2);
      setFetch((i) => !i);
    }
  };

  const processData = (data: T1) => {
    if (
      raw_data &&
      (raw_data.offset != data.offset || raw_data.limit != data.limit)
    ) {
      const new_data = {
        total: data.total,
        limit: data.limit,
        offset: data.offset,
        results: [...raw_data.results, ...data.results],
      };
      setData(new_data as T1);
    } else {
      setData(data);
    }
    setFields({ offset: data.offset, limit: data.limit } as T2);
  };

  useEffect(() => {
    handleFetch();
  }, [canFetch]);

  useEffect(() => {
    setError(undefined);
    if (data) processData(data.data);
    if (error) {
      setData(undefined);
      setError(error);
    }
    if (data && data.data.total == 0) {
      const err: errorType = {
        status: 404,
        details: notFoundMsg,
      };
      setError(err);
    }
  }, [data, error]);

  return {
    raw_data,
    raw_error,
    setData,
    loading,
    handleFetch,
    handleNextPage,
    hasNext,
    fields,
    setFields,
    setFetch,
  };
}
