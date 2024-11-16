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
  const { message, setMessage } = useWebSocket();
  const {
    fields,
    handleFetch,
    handleNextPage,
    hasNext,
    loading,
    raw_data,
    raw_error,
    setData,
    setFields,
  } = useAppBase<ChatListT, chatFilterT>(
    { limit: 10, offset: 0, title: "" },
    `/chat/getList`
  );

  function handleFilter(value: string) {
    setFields({ limit: 10, offset: 10, title: value });
  }

  useEffect(() => {
    if (message && raw_data) {
      const tmp_data = raw_data.results.filter(
        (i) => i.id != message.updated_chat.id
      );
      const tmp_list = tmp_data
        ? [message.updated_chat, ...tmp_data]
        : [message.updated_chat];
      setData({ ...raw_data, results: tmp_list });
      setFields({ offset: fields.offset! + 1, limit: fields.limit! + 1 });
    } else {
      handleFetch();
    }
  }, [message]);

  return (
    <div className="flex flex-col gap-2">
      <div>
        <DefaultInput onChange={handleFilter} placeholder="Search chats" />
      </div>
      {fields.title && (
        <LocalWsContext.Provider value={{ setMessage }}>
          <UserList title={fields.title} />
        </LocalWsContext.Provider>
      )}
      {fields.title && (
        <div className="pb-1 border-b text-xl font-bold">Chats:</div>
      )}
      <div className="flex flex-col gap-1">
        {raw_data?.results.map((i) => (
          <ChatItem key={i.title} data={i} />
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
