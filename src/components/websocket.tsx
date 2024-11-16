import { useEffect, useState } from "react";
import { messageT, wsMessage } from "../types/message";
import ApiService from "../services/base-api";

const useWebSocket = (id?: number) => {
  const [message, setMessage] = useState<wsMessage>();
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    // Initialize the WebSocket connection
    const api = new ApiService();
    const url = id
      ? `ws://127.0.0.1:8000/ws/chat/${id}/`
      : `ws://127.0.0.1:8000/ws/chat/`;
    const websocket = new WebSocket(`${url}?token=${api.getToken()}`);

    // Handle incoming messages
    websocket.onmessage = (event) => {
      setMessage(JSON.parse(event.data));
    };

    // Handle WebSocket errors
    websocket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Handle WebSocket connection close
    websocket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    setWs(websocket);
  }, []);

  // Function to send a message
  const sendMessage = (message: messageT) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
    } else {
      console.log("WebSocket is not open");
    }
  };

  return { ws, sendMessage, message };
};

export default useWebSocket;
