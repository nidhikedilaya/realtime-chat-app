// pages/api/messages.js

let chatHistory = global.chatHistory || { messages: [] };
if (process.env.NODE_ENV !== "production") global.chatHistory = chatHistory;

export default function handler(req, res) {
  if (req.method === "POST") {
    res.status(200).json({ ...chatHistory, status: "success" });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
