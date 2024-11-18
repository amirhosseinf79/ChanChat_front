import { useContext } from "react";
import { sentByMe } from "../../services/auth";
import { getStrDateWithClock } from "../../services/calculate-date";
import { AuthorT } from "../../types/chat";
import { messageT, Reply } from "../../types/message";
import ProfilePhoto from "../profile-photo";
import { MessageActionContext } from "../contexts/message-contexts";

function HeaderContainer({ data }: { data: messageT }) {
  const { setFields, setReplyObj } = useContext(MessageActionContext);
  const headerJustify = sentByMe(data.author.id)
    ? "flex-row"
    : "flex-row-reverse justify-between";

  const userInfo = !sentByMe(data.author.id) && (
    <p className="text-white">
      {data.author.first_name} {data.author.last_name}
    </p>
  );

  function addReply() {
    if (!setFields || !setReplyObj) return;
    setFields({ reply_id: data.id });
    setReplyObj({
      author: data.author.first_name,
      preview: data.text || data.caption || (data.type as string),
      message_id: data.id,
    });
  }

  function editMsg() {
    if (!setFields || !setReplyObj) return;
    setFields({ message_id: data.id, text: data.text, caption: data.caption });
    setReplyObj({
      author: data.author.first_name,
      preview: data.text || data.caption || (data.type as string),
      message_id: data.id,
    });
  }

  return (
    <div className={`flex gap-2 ${headerJustify} text-xs text-indigo-100`}>
      <button onClick={addReply}>Reply</button>
      {userInfo || <button onClick={editMsg}>Edit</button>}
    </div>
  );
}

function ImageContainer({ url }: { url?: string }) {
  return (
    <div className="w-full overflow-hidden rounded-md flex bg-black">
      <img src={url} className="w-full h-auto" alt="Image" />
    </div>
  );
}

function ReplyContainer({
  data,
  sentByMe,
}: {
  data: Reply | null;
  sentByMe?: boolean;
}) {
  const bgColor = sentByMe
    ? "bg-indigo-400 border-indigo-900"
    : "bg-violet-400 border-violet-900";

  return data ? (
    <div className={`p-1 px-2 rounded-md border-l-4 text-sm ${bgColor}`}>
      <a href={`#msg_${data.message_id}`}>
        <div className="font-bold">{data.author}</div>
        <div>{data.preview}</div>
      </a>
    </div>
  ) : (
    <></>
  );
}

interface prp {
  data: messageT;
  prevAuthor?: AuthorT;
}

export default function MsgItem({ data, prevAuthor }: prp) {
  const bgColor = sentByMe(data.author.id) ? "bg-indigo-500" : "bg-violet-500";

  return (
    <div
      className={`flex items-end gap-1 ${
        sentByMe(data.author.id) ? "flex-row-reverse" : ""
      }`}
    >
      {!sentByMe(data.author.id) && (
        <ProfilePhoto size="sm" hidden={prevAuthor?.id == data.author.id} />
      )}
      <div
        id={`msg_${data.id}`}
        className={`p-1 max-w-72 min-w-40 flex flex-col rounded-lg gap-1 text-white text-wrap overflow-hidden ${bgColor}`}
      >
        <HeaderContainer data={data} />
        <ReplyContainer data={data.reply} sentByMe={sentByMe(data.author.id)} />
        {data.type == "photo" && <ImageContainer url={data.image} />}
        <div className="px-1 text-wrap" dir="auto">
          {data.type == "message" ? data.text : data.caption}
        </div>
        <div className="flex flex-row-reverse justify-between gap-4 items-center">
          <p className="text-xs mt-1">{getStrDateWithClock(data.created_at)}</p>
          {data.seen_by.length > 0 && (
            <p className="tracking-[-0.5rem] px-1">&#10004;&#10004;</p>
          )}
        </div>
      </div>
    </div>
  );
}
