import { NextRequest, NextResponse } from "next/server";
import UserModel, { Message } from "@/model/User";
import dbConnect from "@/lib/dbConnect";

export async function POST(request: NextRequest) {
    await dbConnect();
    try {
        const { username, content } = await request.json();
        const user = await UserModel.findOne({ username });
        if (!user) {
            return NextResponse.json(
                { message: "User not found", success: false },
                { status: 404 }
            );
        }
        // Check if the user is accepting messages
        if (!user.isAcceptingMessages) {
            return NextResponse.json(
                { message: "User is not accepting messages", success: false },
                { status: 403 } // 403 Forbidden status
            );
        }

        const newMessage: any = { content, createdAt: new Date() };

        // Push the new message to the user's messages array
        user.messages.push(newMessage);
        await user.save();
        return NextResponse.json(
            { message: "Message sent successfully", success: true },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error adding message:", error);
        return NextResponse.json(
            { message: "Internal server error", success: false },
            { status: 500 }
        );
    }
}
