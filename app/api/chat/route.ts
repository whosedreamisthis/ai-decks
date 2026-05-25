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

    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is missing from environment variables");
      return NextResponse.json(
        {
          error: "AI Service Configuration Error",
          details: "API Key is missing",
        },
        { status: 500 },
      );
    }

    // MOCK RESPONSE ENGINE FOR LOCAL TESTING
    const result = {
      text: JSON.stringify([
        {
          question: "What is Next.js?",
          answer: "A React framework for the web.",
        },
        {
          question: "What is Gemini?",
          answer: "A family of multimodal AI models by Google.",
        },
      ]),
    } as any; // Cast as any prevents TypeScript compiler build errors on line 66

    // REAL LIVE GEMINI ENGINE
    // const result = await ai.models.generateContent({
    //   model: "gemini-2.5-flash",
    //   contents: message,
    //   config: {
    //     responseMimeType: "application/json",
    //     responseSchema: {
    //       type: Type.ARRAY,
    //       items: {
    //         type: Type.OBJECT,
    //         properties: {
    //           question: { type: Type.STRING },
    //           answer: { type: Type.STRING },
    //         },
    //         required: ["question", "answer"],
    //       },
    //     },
    //   },
    // });

    console.log("Gemini API Full Result:", JSON.stringify(result, null, 2));

    let cleanJson = "";
    if (result.text) {
      cleanJson = result.text;
    } else if (
      result.candidates &&
      result.candidates[0]?.content?.parts?.[0]?.text
    ) {
      cleanJson = result.candidates[0].content.parts[0].text;
    } else {
      console.error("Gemini response missing text:", result);
      throw new Error("No text content returned from Gemini");
    }

    if (cleanJson.includes("```")) {
      cleanJson = cleanJson.replace(/```json\n?|```/g, "").trim();
    }

    console.log("Gemini Cleaned Response:", cleanJson);

    return NextResponse.json({ jsonString: cleanJson });
  } catch (error: any) {
    console.error("Gemini Generation Error:", error);

    if (error.response) {
      console.error("Gemini Error Response:", error.response);
    }

    return NextResponse.json(
      {
        error: "Failed to generate deck structure",
        details: error.message || "Unknown error",
      },
      { status: 500 },
    );
  }
}
