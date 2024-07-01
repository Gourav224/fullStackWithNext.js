import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const api_key = process.env.GEN_AI_API_KEY || "";

export async function POST(req: Request) {

    const genAI = new GoogleGenerativeAI(api_key);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.`;

    try {
        const result = await model.generateContent(prompt);
        const response = result.response;
        return NextResponse.json({ text: response.text() }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { message: "Internal Server Error", error: error.message },
            { status: 500 }
        );
    }
}
