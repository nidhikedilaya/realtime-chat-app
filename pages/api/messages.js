import { supabase } from "../../lib/supabase";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("timestamp", { ascending: true });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ messages: data, status: "success" });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
