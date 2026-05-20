// @/app/api/chat/route.ts
import { GoogleGenAI, Type } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({});

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 },
      );
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          description:
            "A list of flashcards generated for the user's requested topic.",
          items: {
            type: Type.OBJECT,
            properties: {
              // ALIGNED WITH YOUR TYPES
              question: {
                type: Type.STRING,
                description: "The core prompt or question for the card.",
              },
              answer: {
                type: Type.STRING,
                description: "The clear, accurate answer or explanation.",
              },
            },
            required: ["question", "answer"],
          },
        },
      },
    });

    return NextResponse.json({ jsonString: response.text });
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    return NextResponse.json(
      { error: "Failed to generate deck structure" },
      { status: 500 },
    );
  }
}
