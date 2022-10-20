import nc from "next-connect";
import { validateBody, auths } from "../../../middlewares";
import { ValidateProps } from "../../../models/schema";
import { dbConnect } from "../../../utils/mongo/mongodb";
import { ncOpts } from "../../../utils/nc";

const handler = nc(ncOpts);

// GET ALL MESSAGES FROM SPECIFIC CHAT WITH CHATID
handler.get(
  validateBody({
    type: "object",
    properties: {
      chatName: ValidateProps.chats.chatName,
      isGroupChat: ValidateProps.chats.isGroupChat,
      users: ValidateProps.chats.users,
      messages: ValidateProps.chats.messages,
      lastMessage: chat.messages[chat.messages.length - 1].content,
    },
    required: ["chatName", "sender", "receiver"],
    additionalProperties: true,
  }),

  async (req, res) => {
    try {
      const db = await dbConnect();

      // const { userId } = req;
      const { chatId } = req;
      // let { city, email, password, language, OTP } = req.body;

      const chat = await ChatModel.findOne({ chat: chatId }).populate(
        "chats.users"
      );

      let chatsToBeSent = [];

      if (chat.chats.length > 0) {
        chatsToBeSent = await chat.chats.map((chat) => ({
          users: chat.users._id,
          // name: chat.users.name,
          // profilePicUrl: chat.users.profilePicUrl,
          lastMessage: chat.messages[chat.messages.length - 1].content,
          date: chat.messages[chat.messages.length - 1].date,
        }));
      }

      return res.json(chatsToBeSent);
    } catch (error) {
      console.error(error);
      return res.status(500).send("Server Error");
    }
  }
);

// GET ALL CHATS

// router.get("/", authMiddleware, async (req, res) => {
//   try {
//     const { userId } = req;

//     const user = await ChatModel.findOne({ user: userId }).populate(
//       "chats.messagesWith"
//     );

//     let chatsToBeSent = [];

//     if (user.chats.length > 0) {
//       chatsToBeSent = await user.chats.map((chat) => ({
//         messagesWith: chat.messagesWith._id,
//         name: chat.messagesWith.name,
//         profilePicUrl: chat.messagesWith.profilePicUrl,
//         lastMessage: chat.messages[chat.messages.length - 1].msg,
//         date: chat.messages[chat.messages.length - 1].date,
//       }));
//     }

//     return res.json(chatsToBeSent);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send("Server Error");
//   }
// });

export default handler;
