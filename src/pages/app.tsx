import { useState } from "react";
import ChatList from "../components/partitions/chat-list";
import ChatMessage from "../components/partitions/chat-message";
import { ChatT } from "../types/chat";
import { AppContext } from "../components/contexts/app-context";

export default function MainApp() {
  const [chatDetails, setChatDetails] = useState<ChatT>();
  return (
    <AppContext.Provider value={{ chatDetails, setChatDetails }}>
      <ChatList />
      {chatDetails && <ChatMessage />}
    </AppContext.Provider>
  );
}
