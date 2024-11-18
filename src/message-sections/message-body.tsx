import { useContext, useEffect, useReducer, useRef, useState } from "react";
import { MessageContext } from "../components/contexts/message-contexts";
import AutoDataLoader from "../components/auto-loader";
import MsgItem from "../components/items/mesage-item";
import DefaultInput from "../components/element/text-input/input";
import DefaultBtn from "../components/element/button/default-btn";
import { PostFetch } from "../helpers/post-fetch";
import { AppContext } from "../components/contexts/app-context";
import {
  messageCreateFields,
  messageT,
  Reply,
  wsMessageInput,
} from "../types/message";
import { formReducer } from "../components/contexts/form-reducer";

export default function MessageBody() {
  const { sendMessage } = useContext(MessageContext);
  const { chatDetails } = useContext(AppContext);
  const [replyObj, setReplyObj] = useState<Reply>();
  const targetRef = useRef<HTMLDivElement>(null);
  const {
    loading,
    hasNext,
    handleNextPage,
    messageList,
    messageError,
    message,
  } = useContext(MessageContext);

  const [fields, setFields] = useReducer(formReducer<messageCreateFields>, {
    type: "message",
  });

  const {
    data,
    error,
    handleFetch,
    loading: sendLoading,
  } = PostFetch<messageCreateFields>({
    url: `/chat/${chatDetails?.id}/createMessage`,
    fields,
  });

  function handleSendMessage() {
    setReplyObj(undefined);
    setFields({ reply_id: undefined, caption: undefined, text: undefined });
    handleFetch();
  }

  useEffect(() => {
    if (data) {
      const ws_data: wsMessageInput = {
        action: "message_create",
        message: data.data as messageT,
      };
      sendMessage(ws_data);
    }
    console.log(error);
  }, [data, error]);

  useEffect(() => {
    // targetRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    if (targetRef.current) {
      targetRef.current.scrollTop = targetRef.current.scrollHeight;
    }
  }, [message]);

  return (
    <div className="flex flex-col h-full">
      <div
        className="flex flex-col gap-1 h-full p-2 overflow-auto"
        ref={targetRef}
      >
        <AutoDataLoader
          error={messageError}
          handleLoader={handleNextPage}
          loading={loading}
          showCondition={hasNext()}
        />
        <div className="flex flex-col-reverse gap-2">
          {messageList?.results.map((v, i) => (
            <MsgItem
              key={v.id}
              data={v}
              prevAuthor={messageList.results[i - 1]?.author}
              addReply={(obj) => {
                setFields({ reply_id: obj.message_id });
                setReplyObj(obj);
              }}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2 dark:bg-indigo-800 bg-indigo-200 text-white p-2 rounded-t-lg">
        {replyObj && (
          <div className="flex gap-2 dark:bg-indigo-200 bg-indigo-300 border-l-4 border-indigo-500 p-2 text-indigo-900 items-center rounded-lg">
            <div className="">
              <button
                className="px-2 text-red-500 bg-white rounded-full"
                onClick={() => {
                  setFields({ reply_id: undefined });
                  setReplyObj(undefined);
                }}
              >
                X
              </button>
            </div>
            <div className="">
              <p>
                {replyObj?.author} ({replyObj.message_id})
              </p>
              <p>{replyObj?.preview}</p>
            </div>
          </div>
        )}
        <div className="flex gap-2">
          <DefaultInput
            onChange={(text) => setFields({ text })}
            value={fields.text}
            placeholder="Type Message..."
            handleEnter={handleSendMessage}
          />
          <DefaultBtn
            loading={sendLoading}
            value="send"
            handler={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
}
