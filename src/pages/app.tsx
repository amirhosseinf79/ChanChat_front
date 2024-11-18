import { useState } from "react";
import ChatList from "../components/partitions/chat-list";
import ChatMessage from "../components/partitions/chat-message";
import { ChatT } from "../types/chat";
import { AppContext } from "../components/contexts/app-context";

export default function MainApp() {
  const [chatDetails, setChatDetails] = useState<ChatT>();
  return (
    <AppContext.Provider value={{ chatDetails, setChatDetails }}>
      <div className="flex flex-col md:h-[88vh] h-[92vh]">
        <ChatList />
        {chatDetails && <ChatMessage />}
      </div>
    </AppContext.Provider>
  );
}
