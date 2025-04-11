// pages/api/messages.js

// Top of both files
if (!global.chatHistory) {
  global.chatHistory = { messages: [] };
}
const chatHistory = global.chatHistory;

//let chatHistory = global.chatHistory || { messages: [] };
if (process.env.NODE_ENV !== "production") global.chatHistory = chatHistory;

export default function handler(req, res) {
  if (req.method === "POST") {
    res.status(200).json({ ...chatHistory, status: "success" });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
