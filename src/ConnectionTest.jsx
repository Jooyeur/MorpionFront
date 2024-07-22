import { useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:4000");

const ConnectionTest = () => {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return <div>Check the console for connection status.</div>;
};

export default ConnectionTest;
