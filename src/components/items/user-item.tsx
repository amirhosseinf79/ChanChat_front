import getStrDate from "../../services/calculate-date";
import { userT } from "../../types/user";
import ProfilePhoto from "../profile-photo";

interface prp {
  data: userT;
}

export default function UserItem({ data }: prp) {
  return (
    <div className="flex gap-2 dark:bg-indigo-800 dark:text-white text-black bg-indigo-200 p-3">
      <ProfilePhoto is_online={data.is_online} />
      <div className="flex flex-col w-full gap-1">
        <div className="flex justify-between gap-4">
          <div>
            {data.first_name} {data.last_name}
          </div>
          <div>{getStrDate(data.last_online)}</div>
        </div>
        <div className="flex justify-between gap-1">
          <p className="dark:text-slate-300 text-slate-800 text">
            {data.username}
          </p>
        </div>
      </div>
    </div>
  );
}
