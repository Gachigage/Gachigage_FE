// import OrderSheetModal from "@/components/atoms/OrderSheetModal";
// import ChatTradeModal from "@/components/atoms/ChatTradeModal";

// import { useChatUIStore } from "@/store/chat/useChatUIStore";

// import ChatInput from "./ChatInput";
// import ChatTradeContent from "./ChatTradeContent";
// import ChatTradeInfo from "./ChatTradeInfo";

// export default function ChatRoom() {
//     const {isOpenOrderModal, isOpenChatTradeModal, closeTradeModal, closeOrderModal} = useChatUIStore();
    
//     return (
//         <div className="flex flex-col w-[402px] md:w-[964px] lg:w-[810px] h-full border border-gachigageGray1 bg-gachigageGray0 rounded-[8px]">
//             <ChatTradeInfo />
//             <ChatTradeContent />
//             <ChatInput />
//             {isOpenOrderModal &&
//                 <OrderSheetModal 
//                     isOpen={isOpenOrderModal}
//                     onClose={closeOrderModal}
//                 />
//             }
//             {isOpenChatTradeModal &&
//                 <ChatTradeModal
//                     isOpen={isOpenChatTradeModal}
//                     onClose={closeTradeModal}
//                 />
//             }
//         </div>
//     )
// }