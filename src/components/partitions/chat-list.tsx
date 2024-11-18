import { useEffect } from "react";
import ChatItem from "../items/chat-item";
import DefaultInput from "../element/text-input/input";
import UserList from "./user-list";
import AutoDataLoader from "../auto-loader";
import useWebSocket from "../websocket";
import useAppBase from "./base";
import { chatFilterT, ChatListT } from "../../types/chat";
import { LocalWsContext } from "../contexts/local-ws-ctx";

export default function ChatList() {
  const { message, sendMessage } = useWebSocket();
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
          total: raw_data.total + 1,
          limit: tmp_list.length,
          results: tmp_list,
        });
        setFields({ limit: tmp_list.length });
      } else if (message.action == "online_status") {
        const tmp_list = raw_data.results.map((i) =>
          i.id == message.updated_chat.id
            ? {
                ...i,
                is_online: message.user_status,
              }
            : i
        );
        setData({ ...raw_data, results: tmp_list });
      }
    }
  }, [message]);

  return (
    <div className="flex flex-col gap-2">
      <div>
        <DefaultInput onChange={handleFilter} placeholder="Search chats" />
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