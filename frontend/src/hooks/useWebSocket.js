// hooks/useWebSocket.js

import { useState, useEffect, useCallback } from "react";

const useWebSocket = (url) => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState(null);
  const [connected, setConnected] = useState(false);

  // Fonction pour envoyer un message via WebSocket
  const sendMessage = useCallback(
    (msg) => {
      if (socket && connected) {
        console.log("Sending message:", msg);
        socket.send(msg);
      }
    },
    [socket, connected]
  );

  // Fonction pour établir la connexion
  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log("WebSocket connected");
      setConnected(true);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
      setConnected(false);
    };

    ws.onmessage = (event) => {
      console.log("Message received:", event.data);
      setMessage(event.data); // Met à jour le message reçu
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Sauvegarde la connexion WebSocket dans le state
    setSocket(ws);

    // Cleanup lors de la déconnexion du composant
    return () => {
      ws.close();
    };
  }, [url]);

  return { socket, message, connected, sendMessage };
};

export default useWebSocket;
