import { useContext } from "react";
import getStrDate from "../../services/calculate-date";
import { ChatT } from "../../types/chat";
import { AppContext } from "../contexts/app-context";
import ProfilePhoto from "../profile-photo";
import { generateChatTitle, sentByMe } from "../../services/auth";
import TypingStatus from "../loaders/typing";

interface prp {
  data: ChatT;
}

export default function ChatItem({ data }: prp) {
  const { setChatDetails, chatDetails } = useContext(AppContext);

  function handleSelect() {
    setChatDetails!(chatDetails ? undefined : data);
  }

  return (
    <div
      className="flex gap-2 dark:bg-indigo-800 dark:text-white text-black bg-indigo-200 p-3 cursor-pointer"
      onClick={handleSelect}
    >
      <ProfilePhoto is_online={data.is_online} size="lg" />
      <div className="flex flex-col w-full gap-1">
        <div className="flex justify-between gap-4">
          <div>{generateChatTitle(data.title)}</div>
          <div>{getStrDate(data.last_message?.created_at)}</div>
        </div>
        <div className="flex justify-between gap-1">
          <p className="dark:text-slate-300 text-slate-800 text">
            <TypingStatus isTyping={data.is_typing}>
              {data.last_message?.preview ?? <p>no message</p>}
            </TypingStatus>
          </p>
          <div className="flex flex-row gap-2 justify-end">
            {data.last_message?.seen_users &&
              data.last_message?.seen_users.length > 0 &&
              sentByMe(data.last_message.author.id) && (
                <div className="bg-indigo-200 text-indigo-600 p-1 pt-0 rounded-xl">
                  Seen
                </div>
              )}
            {data.unread_messages > 0 && data.id != chatDetails?.id && (
              <div className="bg-indigo-200 text-indigo-600 p-1 px-2 pt-0 rounded-xl">
                {data.unread_messages}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
