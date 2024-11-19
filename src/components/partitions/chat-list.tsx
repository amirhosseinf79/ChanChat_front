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
import {
  appendItemToFirst,
  updateNewChat,
  updateChatList,
} from "../../services/wsProccessor";

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
    if (raw_data && chatDetails) {
      const tmp_list = raw_data.results.map((i) =>
        i.id == chatDetails?.id ? { ...i, unread_messages: 0 } : i
      );

      setData({ ...raw_data, results: tmp_list });
    }
  }, [chatDetails, raw_data]);

  useEffect(() => {
    if (message && raw_data) {
      console.log(message);
      if (
        message.action == "chat_create" ||
        message.action == "message_create"
      ) {
        const current_chat = updateNewChat(raw_data.results, message);
        const tmp_list = appendItemToFirst(raw_data.results, current_chat);

        setData({
          ...raw_data,
          limit: tmp_list.length,
          results: tmp_list,
        });
        setFields({ limit: tmp_list.length });
      } else {
        const { newData, newList } = updateChatList(raw_data.results, message);
        setData({ ...raw_data, results: newList });
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
