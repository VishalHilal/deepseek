import Chat from "@/models/Chat";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
// import connectDB from "@/config/db";
import connectDB from "../../../../config/db";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { userId } = getAuth(req);
    const { chatId, prompt } = await req.json();

    if (!userId) {
      return NextResponse.json({ success: false, message: "Not authenticated" });
    }

    await connectDB();

    const chat = await Chat.findOne({ userId, _id: chatId });
    if (!chat) {
      return NextResponse.json({ success: false, message: "Chat not found" });
    }

    // Save user message
    chat.messages.push({
      role: "user",
      content: prompt,
      timestamp: Date.now(),
    });

    // ✅ Gemini API call
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const aiText = response.text();

    const assistantMessage = {
      role: "assistant",
      content: aiText,
      timestamp: Date.now(),
    };

    chat.messages.push(assistantMessage);
    await chat.save();

    return NextResponse.json({
      success: true,
      data: assistantMessage,
    });

  } catch (error) {
    console.error("Gemini Error:", error);
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
