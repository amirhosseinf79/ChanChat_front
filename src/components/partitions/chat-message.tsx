import { useContext, useEffect } from "react";
import { AppContext } from "../contexts/app-context";
import useWebSocket from "../websocket";
import useAppBase from "./base";
import { messageFilterT, messageListT } from "../../types/message";

export default function ChatMessage() {
  const { chatDetails, setChatDetails } = useContext(AppContext);
  const {
    fields,
    handleFetch,
    handleNextPage,
    hasNext,
    loading,
    raw_data,
    setData,
    setFields,
  } = useAppBase<messageListT, messageFilterT>(
    { content: "", from_date: "", limit: 10, offset: 0, to_date: "" },
    `/chat/${chatDetails!.id}/getMessages`
  );
  const { message } = useWebSocket(chatDetails!.id);

  useEffect(() => {
    if (message && raw_data) {
      const tmp_data = raw_data.results.filter(
        (i) => i.id != message.message.id
      );
      setChatDetails!(message.updated_chat);
      const tmp_list = tmp_data
        ? [message.message, ...tmp_data]
        : [message.message];
      setData({ ...raw_data, results: tmp_list });
      setFields({ offset: fields.offset! + 1, limit: fields.limit! + 1 });
    } else {
      handleFetch();
    }
  }, [message]);

  return <>{chatDetails?.id}</>;
}
