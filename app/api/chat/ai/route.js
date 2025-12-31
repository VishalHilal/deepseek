export const maxDuration = 60;

import Chat from "@/models/Chat";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { userId } = getAuth(req);
    const { chatId, prompt } = await req.json();

    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "User not authenticated",
      });
    }

    await connectDB();

    const chat = await Chat.findOne({ userId, _id: chatId });
    if (!chat) {
      return NextResponse.json({
        success: false,
        message: "Chat not found",
      });
    }

    // Save user message
    const userMessage = {
      role: "user",
      content: prompt,
      timestamp: Date.now(),
    };

    chat.messages.push(userMessage);

    // Gemini model
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash", // fast & cheap
    });

    // Generate response
    const result = await model.generateContent(prompt);
    const response = result.response.text();

    const assistantMessage = {
      role: "assistant",
      content: response,
      timestamp: Date.now(),
    };

    chat.messages.push(assistantMessage);
    await chat.save();

    return NextResponse.json({
      success: true,
      data: assistantMessage,
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}

