import { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/app-context";
import useWebSocket from "../websocket";
import useAppBase from "./base";
import {
  initMessageFilter,
  messageCreateFields,
  messageFilterT,
  messageListT,
  messageT,
  wsMessageInput,
} from "../../types/message";
import MessageHeader from "../../message-sections/message-header";
import MessageBody from "../../message-sections/message-body";
import { MessageContext } from "../contexts/message-contexts";
import { PostFetch } from "../../helpers/post-fetch";

export default function ChatMessage() {
  const { chatDetails, setChatDetails } = useContext(AppContext);
  const {
    handleNextPage,
    hasNext,
    loading,
    raw_data,
    raw_error,
    setData,
    setFields,
  } = useAppBase<messageListT, messageFilterT>(
    initMessageFilter,
    `/chat/${chatDetails!.id}/getMessages`,
    "No Message Found :(\nTry Send a new Message."
  );
  const { message, sendMessage } = useWebSocket(chatDetails!.id);
  const [isRead, setIsRead] = useState(false);

  const { data: readData, handleFetch: markRead } =
    PostFetch<messageCreateFields>({
      url: `/chat/${chatDetails!.id}/markRead`,
      fields: {
        type: raw_data?.results.length ? raw_data?.results[0].type : undefined,
        message_id: raw_data?.results.length
          ? raw_data?.results[0].id
          : undefined,
      },
    });

  useEffect(() => {
    const tmp_data: wsMessageInput = {
      action: "mark_read",
    };
    if (readData) sendMessage(tmp_data);
  }, [readData]);

  useEffect(() => {
    if (raw_data?.results.length && !isRead) {
      markRead();
      setIsRead(true);
    }
  }, [raw_data, isRead]);

  useEffect(() => {
    if (message && raw_data) {
      // console.log(message);
      if (message.action == "message_create") {
        if (message.message) {
          const tmp_data = raw_data.results.filter(
            (i) => i.id != message.message!.id
          );
          const tmp_list = tmp_data
            ? [message.message, ...tmp_data]
            : [message.message];
          // console.log(tmp_data, tmp_list);
          const newData = {
            ...raw_data,
            total: raw_data.total,
            limit: tmp_list.length,
            results: tmp_list,
          };
          setData(newData);
          // console.log(1, newData);
          setFields({ limit: tmp_list.length });
          setIsRead(false);
        }
      } else if (message.action == "online_status") {
        setChatDetails!({ ...chatDetails!, is_online: message.user_status });
      } else if (message.action == "message_edit") {
        if (!message.message) return;
        const tmp_list = raw_data.results.map((i) =>
          i.id == message.message!.id
            ? {
                ...i,
                text: message.message?.text,
                caption: message.message?.caption,
              }
            : i
        );
        setData({ ...raw_data, results: tmp_list });
      } else if (message.action == "mark_read") {
        const tmp_list: messageT[] = raw_data.results.map((i: messageT) => {
          return {
            ...i,
            seen_by: [message.updated_chat.last_message!.author],
          };
        });
        setData({ ...raw_data, results: tmp_list });
      }
    }
  }, [message]);

  return (
    <MessageContext.Provider
      value={{
        messageList: raw_data,
        messageError: raw_error,
        handleNextPage,
        sendMessage,
        hasNext,
        loading,
        message,
      }}
    >
      <div className="flex flex-col h-full dark:bg-indigo-950 bg-indigo-200 relative">
        <MessageHeader />
        <MessageBody />
      </div>
    </MessageContext.Provider>
  );
}
