import { useEffect, useState } from "react";
import { wsMessage, wsMessageInput } from "../types/message";
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

    websocket.onopen = () => {
      console.log("Websocket connected!");
    };

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
  const sendMessage = (message: wsMessageInput) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      const data = JSON.stringify(message);
      // console.log(data);
      ws.send(data);
    } else {
      console.log("WebSocket is not open");
    }
  };

  return { ws, sendMessage, message, setMessage };
};

export default useWebSocket;
