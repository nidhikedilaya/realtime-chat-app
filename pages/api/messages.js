import { supabase } from "../../lib/supabase";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("timestamp", { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    return res.status(200).json({ messages: data, status: "success" });
  } catch (err) {
    return res.status(500).json({ error: err.message || "Internal server error" });
  }
}
