// import { createChatRoom } from "@/apis/chat";
// import { fetchProductDetail } from "@/apis/product";
// import { auth } from "@/auth";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   const { productId } = await req.json();

//   const session = await auth();
//   if (!session?.accessToken) {
//     return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
//   }

//   const product = (
//     await fetchProductDetail(productId, session.accessToken)
//   ).data;

//   const chatRoom = await createChatRoom(
//     productId,
//     session.accessToken
//   );
//   console.info(product)
//   console.info(chatRoom)

//   return NextResponse.json({
//     chatRoomId: chatRoom.chatRoomId,
//     product,
//   });
// }
