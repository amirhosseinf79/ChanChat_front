import { useState } from "react";
import ChatList from "../components/partitions/chat-list";
import ChatMessage from "../components/partitions/chat-message";
import { ChatT } from "../types/chat";
import { AppContext } from "../components/contexts/app-context";

export default function MainApp() {
  const [chatDetails, setChatDetails] = useState<ChatT | undefined>();
  return (
    <AppContext.Provider value={{ chatDetails, setChatDetails }}>
      <div className="md:flex flex-row gap-1 hidden h-screen w-full">
        <div className="w-1/4 h-full overflow-auto">
          <ChatList />
        </div>
        <div className="w-3/4 h-full">{chatDetails && <ChatMessage />}</div>
      </div>
      <div className="md:hidden flex flex-col gap-1">
        <ChatList />
        {chatDetails && (
          <div className="fixed top-0 left-0 w-screen h-screen overflow-auto">
            <ChatMessage />
          </div>
        )}
      </div>
    </AppContext.Provider>
  );
}
