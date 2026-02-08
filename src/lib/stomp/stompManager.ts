import { Client, IMessage, StompSubscription } from "@stomp/stompjs";

let client: Client | null = null;
const subscriptions = new Map<string, StompSubscription>();
type MessageType = "TEXT" | "IMAGE";
// STOMP 연결
export const connectStomp = (accessToken: string) => {
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
    // 구독은 subscribeRoom에서 처리
  };

  client.onStompError = (frame) => {
    console.error("❌ STOMP error", frame);
  };

  client.activate();
};

// STOMP 연결 해제
export const disconnectStomp = () => {
  subscriptions.forEach((sub) => sub.unsubscribe());
  subscriptions.clear();

  client?.deactivate();
  client = null;
};

// 채팅방 구독
export const subscribeRoom = (
  chatRoomId: string,
  callback: (message: any) => void
) => {
  if (!client || !client.connected) return;

  // 이미 구독 중이면 기존 구독 해제
  if (subscriptions.has(chatRoomId)) {
    subscriptions.get(chatRoomId)?.unsubscribe();
    subscriptions.delete(chatRoomId);
  }

  // 새 구독 생성
  const subscription = client.subscribe(
    `/sub/chat/room/${chatRoomId}`,
    (message: IMessage) => {
      try {
        const parsed = JSON.parse(message.body);
        console.info(parsed)
        callback(parsed);
      } catch (e) {
        console.error("Failed to parse STOMP message", e);
      }
    }
  );

  subscriptions.set(chatRoomId, subscription);

  // 구독 해제 함수 반환
  return () => {
    subscription.unsubscribe();
    subscriptions.delete(chatRoomId);
  };
};

// 메시지 발송
export const sendMessage = (payload: {
  chatRoomId: number;
  messageType: MessageType;
  content: string;
  messageUuid: string;
}) => {
  if (!client || !client.connected) return;

  client.publish({
    destination: "/pub/chat/message",
    body: JSON.stringify({
      chatRoomId: String(payload.chatRoomId),
      messageType: payload.messageType,
      content: payload.content,
      messageUuid: payload.messageUuid
    }),
  });
};
