import { useContext } from "react";
import getStrDate from "../../services/calculate-date";
import { ChatT } from "../../types/chat";
import { AppContext } from "../contexts/app-context";
import ProfilePhoto from "../profile-photo";

interface prp {
  data: ChatT;
}

export default function ChatItem({ data }: prp) {
  const { setChatDetails } = useContext(AppContext);
  return (
    <div
      className="flex gap-2 dark:bg-indigo-800 dark:text-white text-black bg-indigo-200 p-3 cursor-pointer"
      onClick={() => setChatDetails!(data)}
    >
      <ProfilePhoto is_online={data.is_online} />
      <div className="flex flex-col w-full gap-1">
        <div className="flex justify-between gap-4">
          <div>{data.title}</div>
          <div>{getStrDate(data.last_message?.created_at)}</div>
        </div>
        <div className="flex justify-between gap-1">
          <p className="dark:text-slate-300 text-slate-800 text">
            {data.last_message?.preview ?? "no message"}
          </p>
          <div className="flex flex-col justify-end">
            {data.last_message?.seen_users && data.last_message.sent_by_me && (
              <div className="bg-indigo-200 text-indigo-600 p-1 rounded-xl">
                Seen
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
