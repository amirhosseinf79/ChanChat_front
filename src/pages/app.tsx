import { useEffect, useState } from "react";
import ChatList from "../components/partitions/chat-list";
import ChatMessage from "../components/partitions/chat-message";
import { ChatT } from "../types/chat";
import { AppContext } from "../components/contexts/app-context";

export default function MainApp() {
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [chatDetails, setChatDetails] = useState<ChatT | undefined>();
  return (
    <AppContext.Provider value={{ chatDetails, setChatDetails }}>
      <div
        className="md:flex flex-row gap-1 hidden w-full"
        style={{ height: `${height}px` }}
      >
        <div className="w-1/4 h-full overflow-auto">
          <ChatList />
        </div>
        <div className="w-3/4 h-full">{chatDetails && <ChatMessage />}</div>
      </div>
      <div className="md:hidden flex flex-col gap-1">
        <ChatList />
        {chatDetails && (
          <div
            className="fixed top-0 left-0 w-screen overflow-auto"
            style={{ height: `${height}px` }}
          >
            <ChatMessage />
          </div>
        )}
      </div>
    </AppContext.Provider>
  );
}
