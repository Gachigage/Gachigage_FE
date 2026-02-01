// lib/stomp/stompManager.ts
import { Client, IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";

let client: Client | null = null;
let subscription: any = null;

export const connectStomp = (onMessage?: (message: any) => void) => {
  if (client?.connected) return;

  client = new Client({
    webSocketFactory: () =>
      new SockJS("http://localhost:3306/stomp"),
    reconnectDelay: 5000,
  });

  client.onConnect = () => {
    console.log("✅ STOMP connected");
  };

  client.activate();
};

export const disconnectStomp = () => {
  if (subscription) {
    subscription.unsubscribe();
    subscription = null;
  }
  client?.deactivate();
  client = null;
};

export const subscribeRoom = (
  roomId: string,
  callback: (message: any) => void
) => {
  if (!client || !client.connected) return;

  subscription = client.subscribe(
    `/sub/chat/room/${roomId}`,
    (message: IMessage) => {
      callback(JSON.parse(message.body));
    }
  );
};

export const sendMessage = (payload: {
  roomId: string;
  content: string;
}) => {
  if (!client || !client.connected) return;

  client.publish({
    destination: "/pub/chat/message",
    body: JSON.stringify(payload),
  });
};
