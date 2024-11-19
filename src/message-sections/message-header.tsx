import { useContext } from "react";
import { AppContext } from "../components/contexts/app-context";
import ProfilePhoto from "../components/profile-photo";
import TextBtn from "../components/element/button/text-btn";
import { generateChatTitle } from "../services/auth";
import { MessageContext } from "../components/contexts/message-contexts";
import ErrorBox from "../components/boxes/error-box";
import TypingStatus from "../components/loaders/typing";

export default function MessageHeader() {
  const { chatDetails, setChatDetails } = useContext(AppContext);
  const { connStatus } = useContext(MessageContext);
  return (
    <div className="flex flex-col">
      <div className="flex gap-4 py-3 px-5 justify-between items-center dark:bg-indigo-700 bg-indigo-400 text-white">
        <div className="flex gap-4">
          <div className="flex items-center">
            <TextBtn
              value="X"
              handler={() => setChatDetails!(undefined)}
              className="text-indigo-900 font-bold text-lg bg-indigo-300 px-2"
            />
          </div>
          <ProfilePhoto is_online={chatDetails?.is_online} size="md" />
          <div className="flex flex-col">
            <div className="text-lg">
              {generateChatTitle(chatDetails?.title)}
            </div>
            <div className="">
              <TypingStatus isTyping={chatDetails?.is_typing}>
                {chatDetails?.is_group ? (
                  <>{chatDetails.members} members</>
                ) : chatDetails?.is_online ? (
                  <>online</>
                ) : (
                  <>last seen recently</>
                )}
              </TypingStatus>
            </div>
          </div>
        </div>
        <div>options</div>
      </div>
      {connStatus && (
        <ErrorBox
          error={{ status: [connStatus] }}
          className="dark:bg-blue-600 bg-blue-500 flex justify-center rounded-none"
        />
      )}
    </div>
  );
}
