import { useEffect, useState } from "react";
import { wsMessage, wsMessageInput } from "../types/message";
import ApiService from "../services/base-api";

const useWebSocket = (id?: number) => {
  const [connStatus, setStatus] = useState("connecting...");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [message, setMessage] = useState<wsMessage>();
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (isConnected) return;

    // Initialize the WebSocket connection
    const api = new ApiService();
    const url = id ? `${api.ws_url}/ws/chat/${id}/` : `${api.ws_url}/ws/chat/`;
    const websocket = new WebSocket(`${url}?token=${api.getToken()}`);

    websocket.onopen = () => {
      console.log("Websocket connected!");
      setIsConnected(true);
      setStatus("");
    };

    // Handle incoming messages
    websocket.onmessage = (event) => {
      const raw: wsMessage = JSON.parse(event.data);
      setMessage(raw);
      setStatus("");
    };

    // Handle WebSocket errors
    websocket.onerror = (error) => {
      console.error("WebSocket error:", error);
      setStatus("connecting...");
      setIsConnected(false);
    };

    // Handle WebSocket connection close
    websocket.onclose = () => {
      console.log("WebSocket connection closed");
      setStatus("connecting...");
      setIsConnected(false);
    };

    setWs(websocket);
  }, [isConnected]);

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

  return { ws, sendMessage, message, setMessage, connStatus };
};

export default useWebSocket;
