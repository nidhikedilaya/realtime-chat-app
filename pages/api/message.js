import { supabase } from "../../lib/supabase";
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

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { user, message, timestamp } = req.body;
    const sentimentScore = sentiment.analyze(message).score;

    const chat = { user, message, timestamp, sentiment: sentimentScore };

    // Store in Supabase
    await supabase.from("messages").insert([chat]);

    // Trigger Pusher
    await pusher.trigger("chat-room", "new-message", { chat });

    res.status(200).json({ status: "success" });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
