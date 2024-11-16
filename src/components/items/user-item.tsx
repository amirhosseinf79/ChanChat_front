import { useContext, useEffect } from "react";
import { PostFetch } from "../../helpers/post-fetch";
import getStrDate from "../../services/calculate-date";
import { createChatField } from "../../types/create-chat";
import { userT } from "../../types/user";
import ProfilePhoto from "../profile-photo";
import { AppContext } from "../contexts/app-context";
import { ChatT } from "../../types/chat";
import { LocalWsContext } from "../contexts/local-ws-ctx";
import { wsMessage } from "../../types/message";

interface prp {
  data: userT;
}

export default function UserItem({ data }: prp) {
  const { setChatDetails } = useContext(AppContext);
  const { setMessage } = useContext(LocalWsContext);
  const { data: cData, handleFetch } = PostFetch<createChatField>({
    url: "/chat/create",
    fields: { start_with: data.id },
  });

  useEffect(() => {
    if (cData) {
      setChatDetails!(cData.data as ChatT);
      const data: wsMessage = {
        updated_chat: cData.data as ChatT,
        message: undefined,
      };
      setMessage(data);
    }
  }, [cData]);

  return (
    <div
      className="flex gap-2 dark:bg-indigo-800 dark:text-white text-black bg-indigo-200 p-3 cursor-pointer"
      onClick={handleFetch}
    >
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
