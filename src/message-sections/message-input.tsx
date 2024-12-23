import { useContext, useEffect, useState } from "react";
import {
  MessageActionContext,
  MessageContext,
} from "../components/contexts/message-contexts";
import DefaultInput from "../components/element/text-input/input";
import DefaultBtn from "../components/element/button/default-btn";
import { AppContext } from "../components/contexts/app-context";
import {
  initMessageFields,
  messageCreateFields,
  messageT,
  wsMessageInput,
} from "../types/message";
import { PostFetch } from "../helpers/post-fetch";
import ApiService from "../services/base-api";

interface previewPrp {
  author: string | any;
  preview: string | any;
}

function PreviewContainer({ author, preview }: previewPrp) {
  const { setReplyObj, setFields } = useContext(MessageActionContext);
  return (
    <div className="flex gap-2 dark:bg-indigo-200 bg-indigo-300 border-l-4 border-indigo-500 p-2 text-indigo-900 items-center rounded-lg">
      <div className="">
        <button
          className="px-2 text-red-500 bg-white rounded-full"
          onClick={() => {
            setFields!({ reply_id: undefined, message_id: undefined });
            setReplyObj!(undefined);
          }}
        >
          X
        </button>
      </div>
      <div className="">
        <p>{author}</p>
        <p>{preview}</p>
      </div>
    </div>
  );
}

function ReplyEditPreviewContainer() {
  const { replyObj } = useContext(MessageActionContext);
  return replyObj ? (
    <PreviewContainer author={replyObj.author} preview={replyObj.preview} />
  ) : (
    <></>
  );
}

export default function MessageTextInput() {
  const { sendMessage, connStatus } = useContext(MessageContext);
  const { chatDetails } = useContext(AppContext);
  const { fields, setFields, setReplyObj } = useContext(MessageActionContext);
  const [isTyping, setIsTyping] = useState(false);

  const {
    data,
    error,
    handleFetch,
    loading: sendLoading,
  } = PostFetch<messageCreateFields>({
    url: `/chat/${chatDetails?.id}/createMessage`,
    fields: fields!,
  });

  function clearFields() {
    if (setReplyObj) setReplyObj(undefined);
    if (setFields) setFields(initMessageFields);
  }

  useEffect(() => {
    const api = new ApiService();
    const message = { id: Number(api.getUser()) };
    if (isTyping) {
      const raw: wsMessageInput = {
        action: "typing_start",
        message,
      };
      sendMessage(raw);
      const to = setTimeout(() => setIsTyping(false), 1000);
      return () => clearTimeout(to);
    } else {
      const raw: wsMessageInput = {
        action: "typing_end",
        message,
      };
      sendMessage(raw);
    }
  }, [isTyping]);

  function handleSendMessage() {
    if (connStatus == "") handleFetch();
  }

  useEffect(() => {
    if (data) {
      const tmp_action = !fields?.message_id
        ? "message_create"
        : "message_edit";

      const ws_data: wsMessageInput = {
        action: tmp_action,
        message: data.data as messageT,
      };
      sendMessage(ws_data);
      clearFields();
    }
    console.log(error);
  }, [data, error]);

  return (
    <div className="flex flex-col gap-2 dark:bg-indigo-800 bg-indigo-200 text-white p-2 rounded-t-lg">
      <ReplyEditPreviewContainer />
      <div className="flex gap-2">
        <DefaultInput
          onChange={(text) => setFields!({ text })}
          value={fields!.text}
          placeholder="Type Message..."
          handleEnter={handleSendMessage}
          handleKeyDown={() => setIsTyping(true)}
          disabled={Boolean(connStatus)}
        />
        <DefaultBtn
          disabled={
            sendLoading ||
            !(fields?.text || fields?.caption) ||
            Boolean(connStatus)
          }
          loading={sendLoading}
          value="send"
          handler={handleSendMessage}
        />
      </div>
    </div>
  );
}
