// import OpenAI from "openai";
// import { OpenAIStream, StreamingTextResponse } from "ai";
// import { NextResponse } from "next/server";

// // Create an OpenAI API client (that's edge friendly!)
// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// });

// // Set the runtime to edge for best performance
// export const runtime = "edge";

// export async function POST(req: Request) {
//     console.log("int")
//     // return ""
//     try {
//         const prompt =
//             "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

//         const response = await openai.completions.create({
//             model: "gpt-3.5-turbo-0301", // Corrected model ID
//             max_tokens: 400,
//             stream: true,
//             prompt,
//         });
//         const stream = OpenAIStream(response);
//         return new StreamingTextResponse(stream);
//     } catch (error) {
//         if (error instanceof OpenAI.APIError) {
//             // OpenAI API error handling
//             const { name, status, headers, message } = error;
//             return NextResponse.json(
//                 { name, status, headers, message },
//                 { status }
//             );
//         }
//         // General error handling
//         console.error("An unexpected error occurred:", error);
//         throw error;
//     }
// }

// import { NextResponse } from "next/server";
// import { createGoogleGenerativeAI } from "@ai-sdk/google";
// import { StreamingTextResponse } from "ai";
// import {GoogleGenerativeAI} from "@google/generative-ai"

// // Create a Google Generative AI client

// const api_key=process.env.GEN_AI_API_KEY || "";
// const generationConfig = {
//     maxOutputTokens: 400,
//  };
// const genAI = new GoogleGenerativeAI(api_key);

// // Set the runtime to edge for best performance
// export const runtime = "edge";

// export async function POST(req: Request) {
//     try {
//         const prompt = `
//             Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.
//         `;
//         const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash",generationConfig});

//         const response = await model.generateContentStream(prompt);
//         console.log(response.stream)
//         return "";
//         const stream = new StreamingTextResponse(response.stream);
//         return stream;
//     } catch (error:any) {
//         if (error.name === 'APIError') {
//             // Handle Google API errors
//             const { name, status, headers, message } = error;
//             return NextResponse.json(
//                 { name, status, headers, message },
//                 { status }
//             );
//         }
//         // General error handling
//         console.error("An unexpected error occurred:", error);
//         throw error;
//         // return "reeoe"
//     }
// }

import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
// import { StreamingTextResponse } from "ai";

const api_key = process.env.GEN_AI_API_KEY || "";
// const generationConfig = {
//     maxOutputTokens: 400,
// };
// const genAI = new GoogleGenerativeAI(api_key);

// export const runtime = "edge";

// export async function POST(req: Request) {
//     console.log("in")
//     try {
//         const prompt = `
//             Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.
//         `;

//         const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig });
//         const response = await model.generateContentStream(prompt);

//         const stream = new StreamingTextResponse(response.stream);
//         return stream;
//     } catch (error: any) {
//         if (error.name === 'APIError') {
//             const { name, status, headers, message } = error;
//             return NextResponse.json(
//                 { name, status, headers, message },
//                 { status }
//             );
//         }
//         console.error("An unexpected error occurred:", error);
//         throw error;
//     }
// }

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
