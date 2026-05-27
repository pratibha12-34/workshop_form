import { connect } from "../db.js";
import Register from "../models/Register.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await connect();

    const { Name, EmailID, Password, Phone } = req.body;
    if (!Name || !EmailID || !Password || !Phone) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await Register.findOne({ email: EmailID });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const newUser = await Register.create({
      name: Name,
      email: EmailID,
      password: Password,
      phone: Phone,
    });

    return res.status(200).json({ msg: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("API register error:", error);
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
}
