import { useContext, useEffect, useReducer, useRef, useState } from "react";
import {
  MessageActionContext,
  MessageContext,
} from "../components/contexts/message-contexts";
import AutoDataLoader from "../components/auto-loader";
import MsgItem from "../components/items/mesage-item";
import MessageTextInput from "./message-input";
import {
  initMessageFields,
  messageCreateFields,
  Reply,
} from "../types/message";
import { formReducer } from "../components/contexts/form-reducer";

export default function MessageBody() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { loading, hasNext, handleNextPage, messageList, messageError } =
    useContext(MessageContext);

  const [replyObj, setReplyObj] = useState<Reply>();
  const [fields, setFields] = useReducer(
    formReducer<messageCreateFields>,
    initMessageFields
  );

  useEffect(() => {
    // targetRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    if (targetRef.current) {
      targetRef.current.scrollTop = targetRef.current.scrollHeight;
    }
  }, [messageList]);

  return (
    <MessageActionContext.Provider
      value={{ replyObj, setReplyObj, fields, setFields }}
    >
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
              />
            ))}
          </div>
        </div>
        <div className="fixed">
          <MessageTextInput />
        </div>
      </div>
    </MessageActionContext.Provider>
  );
}
