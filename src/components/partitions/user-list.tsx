import { useEffect, useState } from "react";
import { GetFetch } from "../../helpers/get-fetch";
import DataLoader from "../loaders/data-loader";
import { userFilterT, userListT } from "../../types/user";
import UserItem from "../items/user-item";
import errorType from "../../types/error";

interface prp {
  title: string;
}

export default function UserList({ title }: prp) {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [raw_data, setData] = useState<userListT>();
  const [raw_error, setError] = useState<errorType>();
  const { data, error, handleFetch, loading } = GetFetch<userFilterT>({
    url: "/user/getList",
    fields: { q: title, limit, offset },
  });

  useEffect(() => {
    setLimit(10);
    setOffset(0);
    handleFetch();
  }, [title]);

  useEffect(() => {
    setError(undefined);
    if (data) setData(data.data);
    if (error) {
      setData(undefined);
      setError(error);
    }
    if (data && data.data.total == 0) {
      const err: errorType = {
        status: 404,
        details: "No chat found!",
      };
      setError(err);
    }
  }, [data, error]);

  return (
    raw_data &&
    raw_data.results.length > 0 && (
      <div className="flex flex-col gap-2">
        <div className="pb-1 border-b text-xl font-bold">Users:</div>
        <div className="flex flex-col gap-1">
          <DataLoader loading={loading} error={raw_error}>
            {raw_data?.results.map((i) => (
              <UserItem key={i.id} data={i} />
            ))}
          </DataLoader>
        </div>
      </div>
    )
  );
}
