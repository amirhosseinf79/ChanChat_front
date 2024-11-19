import { useContext, useEffect } from "react";
import ChatItem from "../items/chat-item";
import DefaultInput from "../element/text-input/input";
import UserList from "./user-list";
import AutoDataLoader from "../auto-loader";
import useWebSocket from "../websocket";
import useAppBase from "./base";
import { chatFilterT, ChatListT } from "../../types/chat";
import { LocalWsContext } from "../contexts/local-ws-ctx";
import ErrorBox from "../boxes/error-box";
import { AppContext } from "../contexts/app-context";
import { sentByMe } from "../../services/auth";

export default function ChatList() {
  const { chatDetails, setChatDetails } = useContext(AppContext);
  const { message, sendMessage, connStatus } = useWebSocket();
  const {
    fields,
    handleNextPage,
    hasNext,
    loading,
    raw_data,
    raw_error,
    setData,
    setFields,
    setFetch,
  } = useAppBase<ChatListT, chatFilterT>(
    { limit: 10, offset: 0, title: "" },
    `/chat/getList`,
    "No Chat Found:(\ntry make a new chat."
  );

  function handleFilter(value: string) {
    setFields({ limit: 10, offset: 0, title: value });
    setFetch((c) => !c);
  }

  useEffect(() => {
    if (message && raw_data) {
      // console.log(message);
      if (
        message.action == "chat_create" ||
        message.action == "message_create"
      ) {
        const tmp_data = raw_data.results.filter(
          (i) => i.id != message.updated_chat.id
        );
        const tmp_list = tmp_data
          ? [message.updated_chat, ...tmp_data]
          : [message.updated_chat];
        setData({
          ...raw_data,
          limit: tmp_list.length,
          results: tmp_list,
        });
        setFields({ limit: tmp_list.length });
      } else {
        let newData = {};
        if (message.action == "online_status")
          newData = { is_online: message.user_status };
        else if (message.message && !sentByMe(message.message.id)) {
          if (message.action == "typing_start") newData = { is_typing: true };
          if (message.action == "typing_end") newData = { is_typing: false };
          if (
            message.action == "mark_read" &&
            message.updated_chat.last_message
          ) {
            newData = {
              last_message: {
                ...message.updated_chat.last_message,
                seen_users: message.updated_chat.last_message.seen_users,
              },
            };
          }
        }

        const tmp_list = raw_data.results.map((i) =>
          i.id == message.updated_chat.id
            ? {
                ...i,
                ...newData,
              }
            : i
        );
        setData({ ...raw_data, results: tmp_list });
        if (chatDetails && setChatDetails)
          setChatDetails({ ...chatDetails, ...newData });
      }
    }
  }, [message]);

  return (
    <div className="flex flex-col gap-2">
      <div className="">
        <DefaultInput
          onChange={handleFilter}
          placeholder="Search chats"
          className="rounded-none"
          value={fields.title}
        />
        {connStatus && (
          <ErrorBox
            error={{ status: [connStatus] }}
            className="dark:bg-blue-600 bg-blue-500 flex justify-center rounded-none"
          />
        )}
      </div>
      {fields.title && (
        <LocalWsContext.Provider value={{ sendMessage }}>
          <UserList title={fields.title} />
        </LocalWsContext.Provider>
      )}
      {fields.title && (
        <div className="pb-1 border-b text-xl font-bold">Chats:</div>
      )}
      <div className="flex flex-col gap-1">
        {raw_data?.results.map((i) => (
          <ChatItem key={i.id} data={i} />
        ))}
        <AutoDataLoader
          error={raw_error}
          handleLoader={handleNextPage}
          loading={loading}
          showCondition={hasNext()}
        />
      </div>
    </div>
  );
}
