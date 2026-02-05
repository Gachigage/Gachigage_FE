import { Client, IMessage } from "@stomp/stompjs";

let client: Client | null = null;
let subscription: any = null;

export const connectStomp = (
  accessToken: string,
) => {
  if (client?.connected) return;

  client = new Client({
    brokerURL: "wss://gachigage.com/api/stomp",
    connectHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },
    reconnectDelay: 5000,
  });

  client.onConnect = () => {
    console.log("✅ STOMP connected");
  };

  client.onStompError = (frame) => {
    console.error("❌ STOMP error", frame);
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
  chatRoomId: string,
  callback: (message: any) => void
) => {
  if (!client || !client.connected) return;

  subscription = client.subscribe(
    `/sub/chat/room/${chatRoomId}`,
    (message: IMessage) => {
      callback(JSON.parse(message.body));
    }
  );
};

export const sendMessage = (payload: {
  chatRoomId: number;
  messageType: string;
  content: string;
}) => {
  console.info(payload)
  if (!client || !client.connected) return;

   client.publish({
    destination: "/pub/chat/message",
    body: JSON.stringify({
      chatRoomId: String(payload.chatRoomId),
      messageType: payload.messageType,
      content: payload.content,
    }),
  });
};
