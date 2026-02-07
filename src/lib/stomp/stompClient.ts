import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export const createStompClient = () => {
  return new Client({
    webSocketFactory: () =>
      new SockJS("http://localhost:3306/stomp"),

    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    debug: () => {},
  });
};
