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
  const [isScrolled, setScrolled] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);
  const {
    loading,
    hasNext,
    handleNextPage,
    messageList,
    messageError,
    message,
  } = useContext(MessageContext);

  const [replyObj, setReplyObj] = useState<Reply>();
  const [fields, setFields] = useReducer(
    formReducer<messageCreateFields>,
    initMessageFields
  );

  useEffect(() => {
    setScrolled(false);
  }, [message]);

  useEffect(() => {
    // targetRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    if (targetRef.current && !isScrolled) {
      targetRef.current.scrollTop = targetRef.current.scrollHeight;
      if (messageList?.results && messageList.results.length > 0)
        setScrolled(true);
    }
  }, [messageList, isScrolled]);

  return (
    <MessageActionContext.Provider
      value={{ replyObj, setReplyObj, fields, setFields }}
    >
      <div className="flex flex-col h-full overflow-auto pb-14" ref={targetRef}>
        <div className="flex flex-col gap-1 p-2">
          <div className="flex flex-col-reverse gap-2">
            {messageList?.results.map((v, i) => (
              <MsgItem
                key={v.id}
                data={v}
                prevAuthor={messageList.results[i - 1]?.author}
              />
            ))}
            <AutoDataLoader
              error={messageError}
              handleLoader={handleNextPage}
              loading={loading}
              showCondition={hasNext()}
            />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full">
          <MessageTextInput />
        </div>
      </div>
    </MessageActionContext.Provider>
  );
}
