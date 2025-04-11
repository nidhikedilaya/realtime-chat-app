// pages/api/message.js
import Pusher from "pusher";
import Sentiment from "sentiment";

const sentiment = new Sentiment();

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  useTLS: true,
});

// Top of both files
if (!global.chatHistory) {
  global.chatHistory = { messages: [] };
}
const chatHistory = global.chatHistory;

//let chatHistory = global.chatHistory || { messages: [] };
if (process.env.NODE_ENV !== "production") global.chatHistory = chatHistory;

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { user = null, message = "", timestamp = +new Date() } = req.body;
    const sentimentScore = sentiment.analyze(message).score;

    const chat = { user, message, timestamp, sentiment: sentimentScore };

    chatHistory.messages.push(chat);

    await pusher.trigger("chat-room", "new-message", { chat });

    res.status(200).json({ status: "success" });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
