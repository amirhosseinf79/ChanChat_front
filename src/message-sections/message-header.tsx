import { useContext } from "react";
import { AppContext } from "../components/contexts/app-context";
import ProfilePhoto from "../components/profile-photo";

export default function MessageHeader() {
  const { chatDetails } = useContext(AppContext);
  return (
    <div className="flex gap-4 py-3 px-5 justify-between items-center dark:bg-indigo-700 bg-indigo-400 text-white">
      <div className="flex gap-4">
        <ProfilePhoto is_online={chatDetails?.is_online} size="md" />
        <div className="flex flex-col">
          <div className="text-lg">{chatDetails?.title}</div>
          <div className="">
            {chatDetails?.is_group ? (
              <>{chatDetails.members} members</>
            ) : chatDetails?.is_online ? (
              <>online</>
            ) : (
              <>last seen recently</>
            )}
          </div>
        </div>
      </div>
      <div>options</div>
    </div>
  );
}
