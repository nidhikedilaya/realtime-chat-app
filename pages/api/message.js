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
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { user, message, timestamp } = req.body;
    if (!user || !message || !timestamp) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Analyze sentiment
    const sentimentScore = sentiment.analyze(message).score;

    const chat = { user, message, timestamp, sentiment: sentimentScore };

    // Insert into Supabase
    const { error } = await supabase.from("messages").insert([chat]);
    if (error) {
      throw new Error(error.message);
    }

    // Trigger Pusher event
    await pusher.trigger("chat-room", "new-message", { chat });

    return res.status(200).json({ status: "success", chat });
  } catch (err) {
    return res.status(500).json({ error: err.message || "Internal server error" });
  }
}
